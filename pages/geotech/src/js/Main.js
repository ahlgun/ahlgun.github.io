
// Constructs
var Manager    = new MercatorManager(),
	Projector  = new MercatorProjector(Manager),
	ext        = new DOM_EXT();

// Large components
var Loader     = ext.id('loader'),
	Container  = ext.id('application-container');

// Menu components
var MenuOpen   = ext.id('menu-open'),
	MenuClose  = ext.id('menu-close'),
	MenuToggle = ext.id('menu-toggle');

// Decorative components
var cTop = ext.id('corner-top'), 
	cBot = ext.id('corner-bottom');

// Menu component event using an action list
MenuToggle.addEventListener('click', event => ext.displayToggleList([
	{ id:'menu', stagger:0 },
	{ id:'menu-open', stagger:0 },
	{ id:'menu-close', stagger:0 },
	{ id:'prefs-header', stagger:150 },
	{ id:'prefs', stagger:200 },
	{ id:'maps-header', stagger:250 },
	{ id:'maps', stagger:300 },
	{ id:'colorschemes-header', stagger:350 },
	{ id:'colorschemes', stagger:400 }
]));


// (P5 function), runs at page load, used for preloading content
function preload() {

	// Display loading animation
	ext.displayToggle(Loader);

	// Start load 
	Manager.LoadAssets();

}

// (P5 function), automatically runs when preload() is complete
function setup() {

	// Only build when import is complete | Slow network solution to call stack
    (!Manager.data.earthquake || !Manager.data.volcanic || !Manager.settings.map) 
    	? ext.delay(() => setup(), 1000) : build();

}

// Used to prepare for projection
function build() {

	// Create projection canvas
	var Canvas = createCanvas(1000, 600);
    Canvas.parent('application-container');

    // Create settings menu
	Manager.CreateMenu();

	// Revert visibility, eg. display canvas, hide loading component
	ext.displayToggle(Loader);
	ext.displayToggle(Container);

	// Run decorative corner animation
	ext.delay(() => {
		ext.addClass(cTop, 'animateTopCorner');
		ext.addClass(cBot, 'animateBotCorner');
	}, 300);

	// Remove loader component
	ext.delay(() => { 
		Loader.remove(); 
	}, 500);

	// Build projection - when build, run
	Projector.Build();
	
	// Display
	run();

}

// Display draw-call
function run() {

	// Project current manager settings
	Projector.Display();

}