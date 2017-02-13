'use strict';

const Promise = require('bluebird');
const EventEmitter = require('events');
const ConfigFile = require('@toki/toki-config-file');

class Config extends EventEmitter {

    constructor(options) {

        super();

        this.options = options || {};
    }

    get() {

        return Promise.resolve()
            .bind(this)
            .then(this._checkOptions)
            .catch(this._error);
    }

    // private methods
    _checkOptions() {

        switch (Object.keys(this.options)[0]) {
            case 'toki-config-file':
                return this._getConfigurationFromFile(this.options['toki-config-file']);
            default:
                throw new Error('Valid configuration loader not detected');
        }
    }

    _getConfigurationFromFile(options) {

        const configFile = new ConfigFile(options);
        return configFile.get();
    };

    _error(err) {

        return Promise.reject(err);
    };
}

module.exports = Config;
