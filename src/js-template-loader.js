const {applyVisualSettings, parseSingleQuotedTemplateVariables} = require('./apply-visual-settings');

function template (source) {
    const {templateFolder} = this.getOptions();

    const layoutData = require(`./${templateFolder}/layout-data`);

    const sourceParsed = applyVisualSettings(parseSingleQuotedTemplateVariables(source), layoutData);

    return sourceParsed;
}

module.exports = template;