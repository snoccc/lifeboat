const fs = require('fs');
const path = require('path');
const mime = require('mime-types');
const yaml = require('js-yaml');

const YAML_CONFIG = yaml.load(fs.readFileSync(path.join(__dirname, 'config.yml'), 'utf8'))

function parse(file) {
    const scripts = new Set();
    const extension = path.extname(file);
    const mimetype = mime.lookup(file);

    if (extension && YAML_CONFIG['extensions'][extension]) {
        YAML_CONFIG['extensions'][extension].forEach(script => scripts.add(script))
    }

    if (mimetype) {
        const type = mimetype.split('/')[0];
        YAML_CONFIG['mime-types'][type].forEach(script => scripts.add(script))
    }

    return scripts;
}

console.log(parse("testdir/a.mp4"));