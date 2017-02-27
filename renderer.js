const { ipcRenderer } = require('electron');
const loader = require('monaco-loader');
const fs = require('fs'); //file system

window.onload =() => {
  loader().then((monaco) => {
    let editor = monaco.editor.create(document.getElementById('container'), {
      language: 'javascript',
      theme: 'vs-dark',
      automaticlayout:true
    });
    ipcRenderer.on('navigate', (e, url) => {
      url = url.slice(7);
      console.log(`Trying to read file on ${url}`);

      fs.readFile(url, 'utf8', (error, result) => {
        editor.setModel(monaco.editor.createModel(result, `javascript`));
      });
    });
  });
};
