# SensorAFK

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.me/Guja1501)
[![npm version](https://badge.fury.io/js/sensor-afk.svg)](https://badge.fury.io/js/sensor-afk)

Sensor away from keyboard (element)

[Sensor AFK](https://github.com/Guja1501/sensor-afk) was created for [Laravel](https://laravel.com) package: [rangoo/lockscreen](https://packagist.org/packages/rangoo/lockscreen)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installing

This package can be installed with:

* [npm](https://www.npmjs.com/package/sensor-afk): `npm install --save sensor-afk`

### Examples

```js
const SensorAFK = require('sensor-afk');

let wasAfk = false;

let sensor = new SensorAFK({
	time: 30,
	sensors: 'click wheel mousemove keydown keyup keypress',
	node: document,
	callback: () => {
		if(wasAfk) {
			alert('You are afk again :/');
		} else {
			alert('You are afk!');
		}
		
		wasAfk = true;
	}
});

// trigger events manually
sensor.flush();
sensor.stop(); // doesn't shut downs sensor. Just waiting next flush
sensor.start();
sensor.afk(); // callback is triggered here

sensor.off(); // turns off sensor
sensor.on(); // turns on sensor
sensor.toggle(); // toggle on/off sensor

```

Default Options:

```js
{
	time: 30,
	sensors: 'click wheel mousemove keydown keyup keypress',
	node: document,
	callback: () => {
		// default callback does nothing
	}
}
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Laravel Mix](https://github.com/JeffreyWay/laravel-mix) - Laravel Mix for compiling files

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/Guja1501/sensor-afk/tags). 

## Authors

* **Guja Babunashvili** - *Initial work* - [Guja1501](https://github.com/Guja1501)

See also the list of [contributors](https://github.com/Guja1501/sensor-afk/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/Guja1501/sensor-afk/blob/master/LICENSE) file for details
