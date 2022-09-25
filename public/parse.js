const fs = require('fs');
const path = require('path');
const mime = require('mime-types');
const yaml = require('js-yaml');

const YAML_CONFIG = yaml.load(fs.readFileSync(path.join(__dirname, 'config.yml'), 'utf8'))
exports.YAML_CONFIG = YAML_CONFIG;

const MIME_TYPES = YAML_CONFIG['mime-types'];
const EXTENSIONS = YAML_CONFIG['extensions'];

exports.parse = function (file) {
    const extension = path.extname(file.name);
    const mimetype = mime.lookup(file.name).toString();

    const extensionScripts = EXTENSIONS[extension]

    // maybe MIME_TYPES[filtered_entry]
    const validMimes = Object.entries(MIME_TYPES).filter(([key, value]) => mimetype.startsWith(key)).map(([mime, scripts]) => scripts);
    const mimeScripts = Object.assign({}, ...validMimes)

    const extra = parseAdvanced({ mimetype: mimetype, ...file });
    console.log({ ...YAML_CONFIG.all, ...extensionScripts, ...mimeScripts });

    return { ...YAML_CONFIG.all, ...extensionScripts, ...mimeScripts };
}

function parseAdvanced(file) {
    return file.mimetype;
}
