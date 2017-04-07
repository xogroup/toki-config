'use strict';

const Promise = require('bluebird');
const EventEmitter = require('events');
const ConfigFile = require('toki-config-file');

let instance = null;

class Config extends EventEmitter {

    constructor(options) {

        if (!options && !instance) {
            options = {
                'toki-config-file': {}
            };
        }

        if (options && !instance) {
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
            .then(this._checkOptions)
            .then(this._validateActions);
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

    _validateActions(options) {

        const namesSeen = new Set();
        const validateName = (name) => {

            if (namesSeen.has(name)) {
                throw new Error('Duplicate action name ' + name);
            }
            namesSeen.add(name);
        };

        if (options && options.routes) {
            options.routes.forEach( (route) => {

                if (!route.actions) {
                    return;
                }

                route.actions.forEach( (action) => {

                    if (typeof action === 'object' && !(action instanceof Array)) {
                        validateName(action.name);
                    }
                    else if (action instanceof Array){
                        action.forEach( (subaction) => {
                            validateName(subaction.name);
                        });
                    }

                });
            });
        }

        return options;
    }
}

module.exports = Config;
