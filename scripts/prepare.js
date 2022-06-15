const processFile = require('./process-file');
const fs = require('fs');
const path = require('path');

const dir = 'dist';

function readDir(dir) {
    fs.readdir(dir, (error, fileNames) => {
        if (error) throw error;

        fileNames.forEach(filename => {
            const name = path.parse(filename).name;
            const filepath = path.resolve(dir, filename);

            fs.stat(filepath, function (error, stat) {
                if (error) throw error;

                const isFile = stat.isFile();

                const extensionAnalysis = ['index', 'd', 'controllers', 'helpers', 'models', 'plugins', 'routes', 'schemas'];

                if (isFile) {
                    const extensions = name.split('.');
                    const extension = extensions[extensions.length - 1];
                    if (extensionAnalysis.includes(extension)) processFile.process(filepath);
                } else {
                    const subDir = `${dir}/${filename}`;
                    readDir(subDir);
                }
            });
        });
    });
}

readDir(dir);