if(typeof axios === typeof undefined)
	require('axios');

module.exports = class Lockscreen {
	constructor(url, time = 30) {
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

		axios.post(this.url)
			.then(resolve).catch(reject);

		return this;
	}
};
