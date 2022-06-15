const fs = require('fs');

const count = (count, concat) => {
    let relativeStr = '';

    for (let x = 0; x < count; x++) {
        relativeStr += '../';
    }

    return `${relativeStr}${concat}`;
}

module.exports = {
    count
}