const { exec } = require('child_process');
const fs = require('fs');
const chokidar = require('chokidar');

function createErrorPage(errorMsg) {
  const fileName = './build/index.html';

  fs.writeFile(fileName, errorMsg.replaceAll('\n', '<br />'), (err) => {
    if (err) {
      console.error('Error creating or writing to file:', err);
      return;
    }
    console.log(`Error page has been created.`);
  });
}

function runBashScript(scriptPath, args = []) {
  return new Promise((resolve, reject) => {
    const command = `${scriptPath} ${args.join(' ')}`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.log(stdout);
        reject({ shortMsg: `Error executing script: ${error.message}`, stdout, stderr });
        return;
      }
      if (stderr) {
        console.warn(`Script stderr: ${stderr}`);
      }
      resolve(stdout);
    });
  });
}

let buildRunning = false;
let scheduleRun = false;

function runBuild() {
  if (buildRunning) {
    scheduleRun = true;
    return;
  }
  buildRunning = true;

  runBashScript('./build.sh', ['arg1', 'arg2'])
    .then((output) => {
      console.log('Bash script output:');
      console.log(output);
      buildRunning = false;

      if (scheduleRun) {
        scheduleRun = false;
        runBuild();
      }
    })
    .catch((error) => {
      console.error('Error:', error.shortMsg);
      buildRunning = false;

      createErrorPage(error.stdout + '\n' + error.stderr);

      if (scheduleRun) {
        scheduleRun = false;
        runBuild();
      }
    });
}

function addEventHandlers(watcher) {
  watcher
    .on('add', function(path) {console.log('File', path, 'has been added'); runBuild();})
    .on('change', function(path) {console.log('File', path, 'has been changed'); runBuild();})
    .on('unlink', function(path) {console.log('File', path, 'has been removed'); runBuild();})
    .on('error', function(error) {console.error('Error happened', error);})
}

function createWatcher(path) {
  return chokidar.watch(path, {
    ignored: /^\./,
    persistent: true,
    awaitWriteFinish: true,
  });
}

['src/', 'public/', 'webpack.config.js', 'tsconfig.json', 'package.json', 'package-lock.json', 'build.sh'].forEach((path) => {
  const watcher = createWatcher(path);
  addEventHandlers(watcher);
});
