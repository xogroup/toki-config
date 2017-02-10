'use strict';

const Promise = require('bluebird');
const EventEmitter = require('events');
const { returnContents } = require('./helpers/file');

class Config extends EventEmitter {

    constructor(options) {

        super();

        this.options = options;
    }

    get() {

        return Promise.resolve()
            .bind()
            .then(this._getConfiguration)
            .catch(this._error);
    }

    // private methods
    _getConfiguration() {

        return returnContents();
    };

    _error(err) {

        return Promise.reject(err);
    };
}

module.exports = Config;
