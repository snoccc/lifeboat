const fs = require('fs');
const path = require('path');
const mime = require('mime-types');
const yaml = require('js-yaml');

const YAML_CONFIG = yaml.load(fs.readFileSync(path.join(__dirname, 'config.yml'), 'utf8'))
exports.YAML_CONFIG = YAML_CONFIG;

exports.parse = function (file) {
    const scripts = new Set();
    const extension = path.extname(file.name);
    const mimetype = mime.lookup(file.name);

    if (extension && YAML_CONFIG['extensions'][extension]) {
        YAML_CONFIG['extensions'][extension].forEach(script => scripts.add(script))
    }

    if (mimetype) {
        const type = mimetype.split('/')[0];
        YAML_CONFIG['mime-types'][type]?.forEach(script => scripts.add(script))
    }

    // console.log(file.icon)
    return scripts;
}

// { name: "video.mp4", relativePath: "./video.mp4", "path": "/video.mp4" }