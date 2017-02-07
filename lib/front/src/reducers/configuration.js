var configuration = {
	controls: true,
	progress: true,
	slideNumber: false,
	history: false,
	keyboard: true,
	overview: true,
	center: true,
	touch: true,
	loop: false,
	rtl: false,
	shuffle: false,
	fragments: true,
	embedded: false,
	help: true,
	showNotes: false,
	autoSlide: 0,
	autoSlideStoppable: true,
	//autoSlideMethod: Reveal.navigateNext,
	mouseWheel: false,
	hideAddressBar: true,
	previewLinks: false,
	transition: 'none',
	transitionSpeed: 'default',
	backgroundTransition: 'default',
	viewDistance: 3,
	parallaxBackgroundImage: '',
	parallaxBackgroundSize: '',
	parallaxBackgroundHorizontal: null,
	parallaxBackgroundVertical: null
};

export default function bgSlide(state = configuration, action) {
	switch (action.type) {
		case 'SET_CONFIGURATION':
			return Object.assign({}, state, action.newConf)

		case 'SET_TEMP_PARALLAX_BG_IMAGE':
			return Object.assign({}, state, {tempParallaxBgImage: action.path});

		default:
			return state;
	}
}
