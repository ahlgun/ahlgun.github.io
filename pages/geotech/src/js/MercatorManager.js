
function MercatorManager(ext) {
	
	// Preference bools
	this.preferences = {
		earthquakes:true,
		volcanoes:false,
		tectonics:false,
	}

	// Settings
	this.settings = {
		map:undefined,
		zoom:undefined,
		colorscheme:undefined
	}

	// Maps
	this.maps = {
		normal:{},
		tectonic:undefined
	}

	// Data lists
	this.data = {
		earthquake:undefined,
		volcanic:undefined
	}

	// Graphics definitions
	this.graphics = {
		opacity:undefined,
		colorschemes:{},
	}

	// Returns a readable string from input
	this.Readable = string => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	// Set new preference setting
	this.UpdatePreferences = preference => {

		let Prefs = this.preferences;

		// Find requested preference
		for(var obj in Prefs)
			if(obj == preference)
				Prefs[obj] = !Prefs[obj];

		clear();
		run();

	}

	// Set new display map
	this.UpdateMap = map => {

		var nMaps = this.maps.normal;

		// Find requested map
		for(var obj in nMaps) 
			if(obj == map) 
				this.settings.map = nMaps[obj];

		clear();
		run();

	}

	// Set new display scheme
	this.UpdateColorScheme = scheme => {

		this.settings.colorscheme = this.graphics.colorschemes[scheme];

		clear();
		run();

	}

	// Create menu from avaliable options
	this.CreateMenu = () => {

		// Preferences button row
		this.CreateButtonRow('prefs', this.preferences, this.UpdatePreferences);
		
		// Maps button row
		this.CreateButtonRow('maps', this.maps.normal, this.UpdateMap);
		
		// Colorschemes button row
		this.CreateButtonRow('colorschemes', this.graphics.colorschemes, this.UpdateColorScheme);
	
	}

	// Creates a row of buttons at parent
	this.CreateButtonRow = (ParentId, Data, BtnCallback) => {

		// Get parent and enumerable properties
		var Parent   = document.getElementById(ParentId),
			DataKeys = Object.keys(Data);

			// For each types prop
		for(let DataProp in DataKeys) {

			// Get current attribute
			let DataAttr = DataKeys[DataProp];

			// Create a new button
			let DataBtn  = document.createElement('button');

			// Set button text as a readable version of the attribute
			DataBtn.innerHTML = this.Readable(DataAttr);

			// Set data attribute to own attribute
			DataBtn.setAttribute('data-attr', DataAttr);

			// Set event to use attribute in callback function
			DataBtn.addEventListener('click', event => {

				// Don't reload the page
				event.preventDefault();
				
				// Callback attribute
				BtnCallback(DataBtn.getAttribute('data-attr'));
			
			});

			// Append button to parent element
			Parent.append(DataBtn);

		}

	}

	// Loads settings and required data
	this.LoadAssets = () => {

		// Define shorthand calls
		var Settings = this.settings,
			Graphics = this.graphics,
			Maps     = this.maps,
			Data     = this.data;

		// Fetch settings file @ static local url
		httpGet('src/json/settings.json', 'json', false, settings => {

			// Fetch normal maps
			for(const prop in settings.presets) 
				Maps.normal[prop] = loadImage(settings.mapbox_url + settings.presets[prop] + '/static/0,0,' + settings.zoom + ',0.00,0.00/' + settings.resolution.width + 'x' + settings.resolution.height + '@2x?access_token=' + settings.mapbox_token);

			// Apply settings from file
			Graphics.opacity = settings.schemes.opacity;
			Graphics.colorschemes = settings.schemes.presets;
			Settings.zoom = settings.zoom;

			// Set predefined preferences
			Settings.map = Maps.normal.dark;
			Settings.colorscheme = Graphics.colorschemes.magnitude;

			// Fetch and set tectonic overlay
			Maps.tectonic = loadImage(settings.tectonic_url);

			// Fetch and set datasets
			httpGet(settings.volcanic_url, 'json', true, eruptions => Data.volcanic = eruptions);
			httpGet(settings.earthquake_url, 'json', true, earthquakes => Data.earthquake = earthquakes);
		
		});
	
	}

}
