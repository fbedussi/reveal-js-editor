function initReveal(configuration) {
	setTimeout(() => {
		if (!Reveal.isReady()) {
			Reveal.initialize({
				...configuration,
				plugins: [RevealHighlight, RevealNotes, RevealZoom],
			});
			Reveal.slide(0);
		} else {
			Reveal.configure(configuration);
			Reveal.setState(Reveal.getState());
			hljs.initHighlighting.called = false;
			hljs.initHighlighting();
		}
	}, 50);
}
