'use strict';

const Promise = require('bluebird');
const EventEmitter = require('events');
const ConfigFile = require('toki-config-file');

let instance = null;

class Config extends EventEmitter {

    constructor(options) {

        if (!options && !instance) {
            throw new Error('No existing instance found to return');
        }
        else if (options && !instance) {
            super();
            instance = this;
            instance.options = options || {};
        }
        else if (options && instance) {
            throw new Error('Failed to create new instance, an instance already exists.');
        }

        return instance;
    }

    get() {

        return Promise.resolve()
            .bind(this)
            .then(this._checkOptions);
    }

    // private methods
    _checkOptions() {

        const options = Object.keys(this.options)[0] || 'default';

        const configs = {
            'toki-config-file' :() => {

                return this._getConfigurationFromFile(this.options['toki-config-file']);
            },
            'default' :() => {

                throw new Error('Valid configuration loader not detected');
            }
        };

        return configs[options]();
    }

    _getConfigurationFromFile(options) {

        const configFile = new ConfigFile(options);
        return configFile.get();
    };
}

module.exports = Config;
