module.exports = class SensorAFK {
	constructor(options = {}) {
		SensorAFK.initStatic();
		let { time, sensors, node } = SensorAFK.filterOptions(options);

		this.node = node;
		this.time = time;
		this.sensors = Array.isArray(sensors) ? sensors : sensors.split(' ');
		this.timeout = null;

		this.flush();
		this.eventRegistration();
	}

	static initStatic(){
		if(this.initStaticDone === true)
			return true;

		this.initStaticDone = true;
		this.defaultOptions = {
			time: 30,
			sensors: 'click wheel mousemove keydown keyup keypress',
			node: document
		};

		this.events = {
			afk: new Event('SensorAFK:AFK'),
			flush: new Event('SensorAFK:flush'),
			stop: new Event('SensorAFK:stop'),
			start: new Event('SensorAFK:start')
		};
	}

	static filterOptions(options = {}){
		return Object.assign({}, SensorAFK.defaultOptions, options);
	}

	static trigger(event){
		this.node.dispatchEvent(event);
	}

	flush() {
		SensorAFK.trigger(SensorAFK.events.flush);
		this.stop().start();
	}

	stop() {
		SensorAFK.trigger(SensorAFK.events.stop);
		if (this.timeout !== null) {
			try {
				clearTimeout(this.timeout);
			} catch (e) {
			}

			this.timeout = null;
		}

		return this;
	}

	start() {
		SensorAFK.trigger(SensorAFK.events.start);
		this.timeout = setTimeout(() => {
			this.afk();
		}, this.time);

		return this;
	}

	afk() {
		SensorAFK.trigger(SensorAFK.events.afk);

		return this;
	}

	eventRegistration(){
		for(let sensor of this.sensors) {
			this.node.addEventListener(sensor, this.flush.bind(this), false);
		}
	}
};
