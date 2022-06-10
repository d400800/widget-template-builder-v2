const fs = require('fs');
const path = require('path');

const style = fs.readFileSync(path.resolve(__dirname + '/dist/main.css'), 'utf8');
const template = fs.readFileSync(path.resolve(__dirname + '/dist/index.html'), 'utf8');
const script = fs.readFileSync(path.resolve(__dirname + '/dist/main.js'), 'utf8');

try {
    const widgetLayoutTemplate = {
        html: `<style>${style}</style>${template}<script>${script}</script>`,
        $schema: {}
    };

    fs.writeFileSync(path.resolve(__dirname + '/dist/widget-layout-template.json'), JSON.stringify(widgetLayoutTemplate,null, 2));

    console.log("file written successfully");
} catch (err) {
    console.error(err);
}