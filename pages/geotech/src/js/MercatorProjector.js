
function MercatorProjector(Manager) {

	// Manager component
	this.Manager = Manager;

	// Data nodes
	this.Nodes = {
		earthquakes:[],
		volcanic:[]
	}

	// Returns coordinate position from relative meridian of mercator projection
	this.GetPosition = (geopos) => {
		return {
			x: this.Math.LonToX(geopos.lon) - this.Math.LonToX(0),
			y: this.Math.LatToY(geopos.lat) - this.Math.LatToY(0)
		}
	}

	// Mercator-specific mathematical functions
	this.Math = {

		// Returns x position relative to the mercator center based on the longitude
		LonToX : (lon) => {
			lon = radians(lon);
			var a = (256 / PI) * pow(2, 1);
			var b = lon + PI;
			return a * b;
		},

		// Returns y position relative to the mercator center based on the latitude
		LatToY : (lat) => {
			lat = radians(lat);
			var a = (256 / PI) * pow(2, 1);
			var b = tan(PI / 4 + lat / 2);
			var c = PI - log(b);
			return a * c;
		},

		// Equalizes magnitude for use with colorscheme
		EqualizeMagnitude : (mag) => {
			mag < 0 ? mag = 0 : mag = round(mag);
			mag > 9 ? mag = 9 : mag = round(mag);
			return mag;
		}

	}

	// Function to build displayable nodes
	this.Build = (callback) => {

		// Define shorthand calls
		var Assembly    = this.Manager,
			Nodes       = this.Nodes,
			Volcanics   = Assembly.data.volcanic.features,
			Earthquakes = Assembly.data.earthquake.features;

		// Create displayable volcano nodes
		Volcanics.forEach((volcano) => {

    		if(!volcano.geometry) return;

	  	    this.DataSaveToArray({
		    	pos:this.GetPosition({
		    		lon:volcano.geometry.coordinates[0], 
		    		lat:volcano.geometry.coordinates[1]
		    	})
		    }, Nodes.volcanic );

    	});

		// Create displayable earthquake nodes
    	Earthquakes.forEach((earthquake) => {

    		if(!earthquake.geometry) return;

		    this.DataSaveToArray({
			    pos:this.GetPosition({
		    		lon:earthquake.geometry.coordinates[0], 
		    		lat:earthquake.geometry.coordinates[1]
		    	}), 
		    	mag:this.Math.EqualizeMagnitude(earthquake.properties.mag)
		    }, Nodes.earthquakes );

	    });

	}

	// Push data to array
	this.DataSaveToArray = (data, array) => {
		array.push(data);
	}

	// Draw function
	this.Display = () => {

		// Define shorthand calls
		var Build = this.Manager,
			Nodes = this.Nodes,

			Preferences = Build.preferences,
			Settings 	= Build.settings,
			Maps        = Build.maps,
			Graphics    = Build.graphics,

			Earthquakes = Preferences.earthquakes, 
			Volcanoes   = Preferences.volcanoes,
			Tectonics   = Preferences.tectonics;

		// (P5) Remove default drawing outline
	    noStroke();

	    // (P5) Configure image settings for fullscreen
	    translate(0, 0);
		imageMode(CORNER);

		// (P5) Draw normal map
	    image(Settings.map, 0, 0, width, height);

	    // (P5) Draw tectonics overlay
	    if(Tectonics) image(Maps.tectonic, 0, 0, width, height);

	    // (P5) Translate drawing point to canvas center
	    translate(width/2, height/2);

		// Display volcanoes
		if(Volcanoes) {
			
			// (P5) Set outline
	    	strokeWeight(1);
			stroke(51);
			
			// For each volcano
			Nodes.volcanic.forEach((node) => {
				
				// (P5) Set fill color
				fill(
					255, 
					128, 
					25, 
					200
				);

				// (P5) Draw triangle from center position
				triangle(
					node.pos.x + 4, 
					node.pos.y + 4,
					node.pos.x, 
					node.pos.y - 4, 
					node.pos.x - 4, 
					node.pos.y + 4
				);
			
			});
			
			// (P5) Remove outline
			noStroke();
		
		}

		// Display earthquakes
		if(Earthquakes) {

			// For each earthquake
			Nodes.earthquakes.forEach((node) => {
				
				// (P5) Set fill color
				fill(
					Settings.colorscheme[node.mag][0], 
					Settings.colorscheme[node.mag][1], 
					Settings.colorscheme[node.mag][2], 
					Graphics.opacity
				);

				// (P5) Draw ellipse from position and magnitude
		        ellipse(
		        	node.pos.x, 
		        	node.pos.y, 
		        	node.mag, 
		        	node.mag
		        );
			
			});

		}

		// Magnitude visualizer module

		// Get bottom left corner coordinates
		var LEFT = -width/2;
		var BOT = height/2;

		// Container
		fill(35, 35, 35, 100);
		rect(LEFT + 25, BOT - 100, 215 , 75);

		// Header
		textSize(22);
		fill(215);
		text('Magnitude', LEFT + 80, BOT - 70)

		// Descriptive numbers
		textSize(20);
		fill(200);
		text('9', LEFT + 45, BOT - 45)
		text('1', LEFT + 210, BOT - 45)

		// Reference dots
		for(var i=1; i<9; i++) {
			var x = LEFT + 200 - (i*15);
			var y = BOT - 50;
			fill(Settings.colorscheme[i][0], Settings.colorscheme[i][1], Settings.colorscheme[i][2], Graphics.opacity)
			ellipse(x, y, i, i)
		}
		
	}
}
