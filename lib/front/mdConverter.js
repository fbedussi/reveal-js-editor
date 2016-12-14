//Markdown conversion init
const configuration = require('../back/configuration');
const MarkdownIt = require('markdown-it');

module.exports = new MarkdownIt({
		html: true,
		//modifyToken: function (token, env) {
		//        switch (token.type) {
		//        case 'image':
		//                token.attrObj['data-src'] = token.attrObj.src;
		//                delete token.attrObj.src;
		//                break;
		//        }
		//}
	})
	.use(require('markdown-it-container'), 'slide', {
		render: function (tokens, idx) {
			var attributes = '';
			var attributesSource = tokens[idx].info
				.trim()
				.replace(/slide */, '')
				.replace(/" /g, '"!');

			if (attributesSource.length) {
				attributes = attributesSource
					.split('!')
					.map(attr => {
						let prefix = attr.match(/id="/) ? '' : 'data-';
						return prefix + attr
							.replace('class="', 'state="')
							.replace(/(background-(?:image|video)=")([^"]+")/, (match, p1, p2) => p1 + p2.replace(/ /g, '%20')
								.replace(/\\/g, '/')) //replace spaces in file name with %20
					})
					.join(' ');
			}


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
	//.use(require('markdown-it-modify-token'))
;