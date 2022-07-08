const fs = require('fs');
const csv = require('csv-parser');

const imgAnnotate = (temp, names, annotation) => {
  return new Promise((resolve, reject) => {
    const records = [];
    let okinputPaths = [];
    let erroredFiles = [];
    const outputCsvPath = `${__dirname}/output/image/${temp}/annotated.csv`;
    for (let i = 0; i < names.length; i++) {
      const inputCsvPath = `${__dirname}/output/image/${temp}/${names[i].name}-${names[i].id}.csv`;
      if (fs.existsSync(inputCsvPath)) {
        okinputPaths.push({ index: i, path: inputCsvPath });
      } else {
        erroredFiles.push(i);
      }
    }
    for (let i = 0; i < okinputPaths.length; i++) {
      const inputCsvPath = okinputPaths[i].path;
      fs.createReadStream(inputCsvPath)
        .pipe(csv())
        .on('data', function (row) {
          const record = {
            ...row,
            filename: `${names[okinputPaths[i].index].name}.${names[okinputPaths[i].index].ext}`,
            emotion: annotation.find((e) => e.id === names[okinputPaths[i].index].id).emotion,
          };
          records.push(record);
        })
        .on('end', function () {
          if (i === okinputPaths.length - 1) {
            fs.writeFileSync(outputCsvPath, extractAsCSV(records), (err) => {
              if (err) {
                erroredFiles.push(okinputPaths[i].index);
              }
            });
          }
        });
    }
    if (okinputPaths.length === 0) {
      reject('failed');
    } else if (erroredFiles.length === 0) {
      resolve('done');
    } else {
      resolve(erroredFiles);
    }
  });
};

const vidAnnotate = (temp, name, annotation) => {
  return new Promise((resolve, reject) => {
    const records = [];
    const inputCsvPath = `${__dirname}/output/video/${temp}/${name}.csv`;
    const outputCsvPath = `${__dirname}/output/video/${temp}/${name}_annotated.csv`;
    if (fs.existsSync(inputCsvPath)) {
      fs.createReadStream(inputCsvPath)
        .pipe(csv())
        .on('data', function (row) {
          const record = {
            ...row,
            emotion: annotation.find((element) => element.frame === row.frame).emotion,
          };
          records.push(record);
        })
        .on('end', function () {
          fs.writeFileSync(outputCsvPath, extractAsCSV(records), (err) => {
            if (err) {
              reject(err);
            }
          });
          resolve('done');
        });
    } else {
      reject('Processing Failed');
    }
  });
};

function extractAsCSV(records) {
  const keys = Object.keys(records[0]);
  const header = [keys.join()];
  const rows = records.map((record) => keys.map((key) => record[key]).join());
  return header.concat(rows).join('\n');
}

module.exports.imgAnnotate = imgAnnotate;

module.exports.vidAnnotate = vidAnnotate;
