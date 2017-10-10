module.exports = class SensorAFK {
	constructor(options = {}) {
		SensorAFK.initStatic();
		let {time, sensors, node, callback} = SensorAFK.filterOptions(options);

		this.node = node;
		this.time = time;
		this.callback = callback;
		this.sensors = Array.isArray(sensors) ? sensors : sensors.split(' ');
		this.timeout = null;

		this.statusOn = true;

		this.flush();
		this.eventRegistration();
	}

	static initStatic() {
		if (this.initStaticDone === true)
			return true;

		this.initStaticDone = true;
		this.defaultOptions = {
			time: 30,
			sensors: 'click wheel mousemove keydown keyup keypress',
			node: document,
			callback: () => {
				// default callback does nothing
			}
		};

		this.events = {
			afk: new Event('SensorAFK:AFK'),
			flush: new Event('SensorAFK:flush'),
			stop: new Event('SensorAFK:stop'),
			start: new Event('SensorAFK:start')
		};
	}

	static filterOptions(options = {}) {
		return Object.assign({}, SensorAFK.defaultOptions, options);
	}

	get seconds() {
		return this.time * 1000;
	}

	trigger(event) {
		this.node.dispatchEvent(event);
	}

	flush() {
		if (this.statusOn) {
			this.trigger(SensorAFK.events.flush);
			this.stop().start();
		}
	}

	stop() {
		this.trigger(SensorAFK.events.stop);

		if (this.timeout !== null) {
			try {
				clearTimeout(this.timeout);
			} catch (e) {
			} finally {
				this.timeout = null;
			}
		}

		return this;
	}

	start() {
		this.trigger(SensorAFK.events.start);

		this.timeout = setTimeout(() => {
			this.afk();
		}, this.seconds);

		return this;
	}

	afk() {
		if (!this.statusOn) {
			return this;
		}

		this.trigger(SensorAFK.events.afk);

		this.callback();

		return this;
	}

	eventRegistration() {
		for (let sensor of this.sensors) {
			this.node.addEventListener(sensor, this.flush.bind(this), false);
		}
	}

	off() {
		this.statusOn = false;
	}

	on() {
		this.statusOn = true;
	}

	toggle() {
		this.statusOn = !this.statusOn;
	}
};
