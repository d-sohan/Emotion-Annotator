const fs = require('fs');
const csv = require('csv-parser');

const imgAnnotate = (temp, name, annotation) => {
  return new Promise((resolve, reject) => {
    const records = [];
    const inputCsvPath = `${__dirname}/output/image/${temp}/${name}.csv`;
    const outputCsvPath = `${__dirname}/output/image/${temp}/${name}_annotated.csv`;
    if (fs.existsSync(inputCsvPath)) {
      fs.createReadStream(inputCsvPath)
        .pipe(csv())
        .on('data', function (row) {
          const record = {
            ...row,
            emotion: annotation,
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
