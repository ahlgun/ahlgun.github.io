
// Extend document manipulation
function DOM_EXT() {

	this.id     = id   => document.getElementById(id);
	this.class  = name => document.getElementsByClassName(name);
	this.create = str  => document.createElement(str);

	this.delay  = (f, time) => {
		return setTimeout(() => {
			f();
		}, time);
	}

	this.addClass = (obj, str) => {
		obj.classList.add(str);
	}

	this.displayToggle = (obj, delay) => {
		var classList = obj.classList;
		if(delay) {
			this.delay(() => {
				classList.contains('m-fadeIn') ? this.fadeOut(classList) : this.fadeIn(classList);
			}, delay);
		} else {
			classList.contains('m-fadeIn') ? this.fadeOut(classList) : this.fadeIn(classList);
		}
	}

	this.displayToggleList = list => {
		list.forEach(action => 
			this.displayToggle(this.id(action.id), action.stagger)
		);
	}

	this.fadeOut = cList => {
		cList.add("m-fadeOut")
		cList.remove("m-fadeIn");
	}
	this.fadeIn = cList => {
		cList.add("m-fadeIn")
		cList.remove("m-fadeOut");
	}
}
