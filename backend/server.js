const express = require('express');
const multer = require('multer');
const fs = require('fs');
const uuid = require('uuid').v4;
const { imgCompute, vidCompute } = require('./openface');
const { imgAnnotate, vidAnnotate } = require('./csvModify');

const app = express();

function createImgDest(req, res, next) {
  const temp = uuid();
  req.temp = temp;
  const dir = __dirname + '/input/image/' + temp;
  fs.mkdirSync(dir);
  next();
}

const imgStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const temp = req.temp;
    cb(null, `backend/input/image/${temp}`);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const imgUpload = multer({ storage: imgStorage });

app.post('/image/upload', createImgDest, imgUpload.any('images'), (req, res) => {
  console.log(req.files);
  const temp = req.temp;
  const outputPath = __dirname + '/output/image/' + temp;
  fs.mkdirSync(outputPath);
  res.send(req.temp);
});

app.post('/image/process', express.json(), (req, res) => {
  const temp = req.body.temp;
  const names = req.body.name;
  const annotation = req.body.annotation;
  imgCompute(temp);
  imgAnnotate(temp, names, annotation)
    .then((message) => {
      if (message === 'done') {
        res.send('done');
      } else {
        const erroredFiles = message.map((i) => `${names[i].name}.${names[i].ext}`);
        res.send(erroredFiles);
      }
    })
    .catch((message) => {
      res.send('failed');
    });
});

app.post('/image/download', express.json(), (req, res) => {
  const temp = req.body.temp;
  const outputPath = __dirname + '/output/image/' + temp + '/' + 'annotated.csv';

  res.download(outputPath, (err) => {
    if (err) {
      console.log(err);
    } else if (res.headersSent) {
      fs.rmSync(__dirname + `/input/image/` + temp, { recursive: true, force: true });
      fs.rmSync(__dirname + `/output/image/` + temp, { recursive: true, force: true });
    }
  });
});

app.post('/image/cleanup', express.json(), (req, res) => {
  const temp = req.body.temp;
  fs.rmSync(__dirname + `/input/image/` + temp, { recursive: true, force: true });
  fs.rmSync(__dirname + `/output/image/` + temp, { recursive: true, force: true });
  res.send('clean');
});

function createVidDest(req, res, next) {
  const temp = uuid();
  req.temp = temp;
  const dir = __dirname + '/input/video/' + temp;
  fs.mkdirSync(dir);
  next();
}

const vidStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const temp = req.temp;
    cb(null, `backend/input/video/${temp}`);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const vidUpload = multer({ storage: vidStorage });

app.post('/video/upload', createVidDest, vidUpload.any('frames'), (req, res) => {
  const temp = req.temp;
  const outputPath = __dirname + '/output/video/' + temp;
  fs.mkdirSync(outputPath);
  res.send(req.temp);
});

app.post('/video/process', express.json(), (req, res) => {
  const temp = req.body.temp;
  const name = req.body.name;
  const annotation = req.body.annotation;
  vidCompute(temp, name);
  vidAnnotate(temp, name, annotation)
    .then((message) => {
      res.send('done');
    })
    .catch((message) => {
      console.log(message);
      res.send('failed');
    });
});

app.post('/video/download', express.json(), (req, res) => {
  const temp = req.body.temp;
  const csvFileName = req.body.name;
  const outputPath = __dirname + '/output/video/' + temp + '/' + csvFileName + '_annotated.csv';

  res.download(outputPath, (err) => {
    if (err) {
      console.log(err);
    } else if (res.headersSent) {
      fs.rmSync(__dirname + `/input/video/` + temp, { recursive: true, force: true });
      fs.rmSync(__dirname + `/output/video/` + temp, { recursive: true, force: true });
    }
  });
});

app.post('/video/cleanup', express.json(), (req, res) => {
  const temp = req.body.temp;
  fs.rmSync(__dirname + `/input/video/` + temp, { recursive: true, force: true });
  fs.rmSync(__dirname + `/output/video/` + temp, { recursive: true, force: true });
  res.send('clean');
});

app.listen(5000, console.log('Server running on port 5000.'));
