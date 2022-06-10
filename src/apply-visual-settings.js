const _ = require('underscore');

function applyVisualSettings(layoutPart, layoutData) {
    const productTemplateRegEx = new RegExp('{{#products}}(.*){{/products}}', 'g');

    let layoutTemplate = replaceLayoutData(layoutPart, layoutData);

    const layoutProducts = layoutData.products;

    const productTemplate = productTemplateRegEx.exec(layoutTemplate);

    if (productTemplate && !_.isEmpty(layoutProducts) && layoutData['products']) {
        const compiledProducts = compileProducts(productTemplate[1], layoutProducts);

        layoutTemplate = layoutTemplate.replace(productTemplateRegEx, compiledProducts);
    }

    return layoutTemplate;
}

function replaceLayoutData(layoutTemplate, layoutData, prefix = '') {
    for (const layoutDataKey in layoutData) {
        let layoutDataValue = layoutData[layoutDataKey];

        layoutTemplate = layoutTemplate.replace(new RegExp(`{{${prefix}${layoutDataKey}}}`, 'g'), layoutDataValue);
    }

    return layoutTemplate;
}

function compileFreeData(product, compiledProduct) {
    if (product.freeData) {
        for (const key in product.freeData) {
            const productDataValue = product.freeData[key];

            compiledProduct = compiledProduct.replace(new RegExp('{{freeData.' + key + '}}', 'g'), productDataValue);
        }
    }

    return compiledProduct;
}

function compileProducts(productTemplate, products) {
    let compiledProducts = '';

    for (const product of products) {
        let compiledProduct = productTemplate;

        for (const productDataKey in product) {
            if (productDataKey === 'freeData') {
                compiledProduct = compileFreeData(product, compiledProduct);
            }

            const productDataValue = product[productDataKey];

            compiledProduct = compiledProduct
                .replace(new RegExp('{{' + productDataKey + '}}', 'g'), productDataValue);
        }

        compiledProducts += compiledProduct;
    }


    return compiledProducts.replace(new RegExp('{{.+?}}', 'g'), '');
}

function parseSingleQuotedTemplateVariables(template) {
    return template.replace(/\'\{\{(.*)\}\}\'/g, `{{$1}}`);
}

module.exports = {
    applyVisualSettings,
    parseSingleQuotedTemplateVariables
};