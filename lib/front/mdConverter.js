//Markdown conversion init
const configuration = require('../back/configuration');
const MarkdownIt = require('markdown-it');

module.exports = new MarkdownIt({
        html: true,
        modifyToken: function (token, env) {
            // see API https://markdown-it.github.io/markdown-it/#Token 
            // token will also have an attrObj property added for convenience 
            // which allows easy get and set of attribute values. 
            // It is prepopulated with the current attr values. 
            // Values returned in token.attrObj will override existing attr values. 
            // env will contain any properties passed to markdown-it's render 
            // Token can be modified in place, no return is necessary 
            switch (token.type) {
            case 'image': // set all images to 200px width except for foo.gif 
              if (token.attrObj.src !== 'foo.gif') {
                token.attrObj.width = '200px';
              }
              break;
            case 'link_open':
              token.attrObj.target = '_blank'; // set all links to open in new window 
              break;
            }
        }
    })
    .use(require('markdown-it-container'), 'slide', {
        render: function (tokens, idx) {
            var attributes = tokens[idx].info
                .trim()
                .replace(/slide +/, '')
                .replace(/" /g, '"!')
                .split('!')
                .map(attr => {
                    let prefix = attr.match(/id="/)? '' : 'data-';
                    return prefix + attr
                        .replace('class="', 'state="')
                        .replace(/(background-(?:image|video)=")([^"]+")/, (match, p1, p2) => p1 + p2.replace(/ /g, '%20').replace(/\\/g, '/')) //replace spaces in file name with %20
                })
                .join(' ');

            if (tokens[idx].nesting === 1) {
                return `<section ${attributes}>\n`;
            } else {
                return '</section>\n';
            }
        }
    })
    .use(require('markdown-it-container'), 'speakerNote', {
        render: function (tokens, idx) {
            if (tokens[idx].nesting === 1) {
                // opening tag
                return '<aside class="notes">\n';
            } else {
                // closing tag
                return '</aside>\n';
            }
        }
    })
    .use(require('markdown-it-classy'))
    .use(require('markdown-it-modify-token'))
;
    
