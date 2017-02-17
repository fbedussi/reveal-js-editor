function initReveal(configuration) {
	setTimeout(() => {
		if (!Reveal.isReady()) {
			configuration.dependencies = [{
				src: '../../../node_modules/reveal.js/lib/js/classList.js',
				condition: function () {
					return !document.body.classList;
				}
			}, {
				src: '../../../node_modules/reveal.js/plugin/highlight/highlight.js',
				async: true,
				callback: function () {
					hljs.initHighlightingOnLoad();
					hljs.initHighlighting();
				}
			}, {
				src: '../../../node_modules/reveal.js/plugin/zoom-js/zoom.js',
				async: true
			}, {
				src: '../../../node_modules/reveal.js/plugin/notes/notes.js',
				async: true
			}];

			Reveal.initialize(configuration);
			Reveal.slide(0);
		} else {
			Reveal.configure(configuration);
			Reveal.setState( Reveal.getState() );
		}
	}, 50);
}
