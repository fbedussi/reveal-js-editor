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
	autoSlideStoppable: true,
	mouseWheel: false,
	hideAddressBar: true,
	previewLinks: false,
	transition: 'none',
	transitionSpeed: 'default',
	backgroundTransition: 'default',
};

var defaultExtraConf = {
	autoSlide: 0,
	//autoSlideMethod: Reveal.navigateNext,
	viewDistance: 3,
	parallaxBackgroundImage: '',
	parallaxBackgroundSize: '',
	parallaxBackgroundHorizontal: null,
	parallaxBackgroundVertical: null
};

export default function bgSlide(state = Object.assign({}, configuration, defaultExtraConf), action) {
	switch (action.type) {
		case 'SET_CONFIGURATION':
			return Object.assign({}, state, action.newConf)

		case 'SET_TEMP_PARALLAX_BG_IMAGE':
			return Object.assign({}, state, {tempParallaxBgImage: action.path});

		case 'SET_DEFAULT_EXTRA_CONF':
			return Object.assign({}, state, defaultExtraConf )

		default:
			return state;
	}
}
