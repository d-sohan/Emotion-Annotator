const cp = require('child_process');
const fs = require('fs');

function compute(type, temp, command) {
  const sourceFilePath = `${__dirname}/input/${type}/${temp}`;
  const docker_run = cp.spawnSync('docker', ['run', '-td', '--rm', '--name', 'openface', 'algebr/openface:latest']);
  const docker_cp_in = cp.spawnSync('docker', ['cp', `${sourceFilePath}`, 'openface:/home/openface-build']);
  const docker_exec = cp.spawnSync('docker', ['exec', 'openface', 'bash', '-c', `build/bin/${command} -fdir ${temp}`]);
  const docker_exec_csv = cp.spawnSync('docker', ['exec', 'openface', 'bash', '-c', `mkdir processed/csv`]);
  const docker_cp_csv = cp.spawnSync('docker', ['exec', 'openface', 'bash', '-c', `cp processed/*.csv processed/csv`]);
  const docker_cp_out = cp.spawnSync('docker', [
    'cp',
    `openface:/home/openface-build/processed/csv/.`,
    `${__dirname}/output/${type}/${temp}/`,
  ]);
  const docker_stop = cp.spawnSync('docker', ['container', 'stop', 'openface']);
}

module.exports.imgCompute = (temp) => {
  compute('image', temp, 'FaceLandmarkImg');
};

module.exports.vidCompute = (temp, name) => {
  compute('video', temp, 'FeatureExtraction');
  const inputCsvOldPath = `${__dirname}/output/video/${temp}/${temp}.csv`;
  const inputCsvNewPath = `${__dirname}/output/video/${temp}/${name}.csv`;
  if (fs.existsSync(inputCsvOldPath)) {
    fs.renameSync(inputCsvOldPath, inputCsvNewPath);
  }
};
