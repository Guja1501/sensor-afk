if(typeof axios === typeof undefined)
	axios = require('axios');

module.exports = class Lockscreen {
	constructor(url='/lockscreen', time = 30, method = 'post') {
		if(!['post', 'put'].includes(method))
			throw new RangeError(`Lockscreen method must be "post" or "put". Given "${method}"`);

		this.method = method;
		this.url = url;
		this.time = time;
		this.timeout = null;

		this.flush();
	}

	flush() {
		this.stop().start();
	}

	stop() {
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
		this.timeout = setTimeout(() => {
			this.lock();
		}, this.time);

		return this;
	}

	lock() {
		let resolve;
		let reject = resolve = () => {
			window.location.reload();
		};

		axios[this.method](this.url)
			.then(resolve).catch(reject);

		return this;
	}
};
