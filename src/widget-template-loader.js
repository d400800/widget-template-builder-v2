const layoutData = require('./layout-data');
const {applyVisualSettings} = require('./apply-visual-settings');

function template (source) {
    const sourceParsed = applyVisualSettings(source, layoutData);

    return `export default ${JSON.stringify(sourceParsed)}`;
}

module.exports = template;