const fs = require('fs');
const countRelative = require('./count-relative');

const process = (filepath) => {
    const arr = [];
    const fileLines = fs.readFileSync(filepath).toString().split("\n");
    const fileRelative = filepath.split('\\')
    const fileIndexRelative = fileRelative.findIndex(x => x === 'dist');

    fileLines.forEach(line => {
        const regTest = new RegExp(/[\"'](controllers|helpers|models|plugins|routes|schemas)[\"']/);
        if (regTest.test(line)) {
            const testLine = regTest.exec(line);
            const pathKey = testLine[1];
            const pathRelative = countRelative.count(fileRelative.length - fileIndexRelative - 2, pathKey);
            arr.push(line.replace(testLine[0], `"${pathRelative}"`));
        } else {
            arr.push(line);
        }
    })

    // console.log("[FILE]", arr)

    fs.writeFileSync(filepath, arr.join('\n'));
}

module.exports = {
    process
}