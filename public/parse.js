const fs = require('fs');
const path = require('path');
const mime = require('mime-types');
const yaml = require('js-yaml');

const YAML_CONFIG = yaml.load(fs.readFileSync(path.join(__dirname, 'config.yml'), 'utf8'))
exports.YAML_CONFIG = YAML_CONFIG;

exports.parse = function (file) {
    const extension = path.extname(file.name);
    const mimetype = mime.lookup(file.name).toString().split('/')[0];

    const extensionScripts = YAML_CONFIG['extensions'][extension]
    const mimeScripts = YAML_CONFIG['mime-types'][mimetype];

    return { ...YAML_CONFIG.all, ...extensionScripts, ...mimeScripts };
}
