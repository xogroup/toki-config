'use strict';

const Promise = require('bluebird');
const Config = require('../../lib/implementation');

const EventEmitter = require('events');

const EzConfig = require('ez-config');
const Sinon = require('sinon');
const DefaultConfig = require('../fixtures/config/default.json');

const Code = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();

const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;
const before = lab.before;
const after = lab.after;

let mockEzConfig;

describe('unit tests - implementation', () => {

    it('should be instantiated', () => {

        return new Promise((resolve) => {

            const config = new Config();
            expect(config).to.be.instanceof(Config);

            resolve();
        });
    });

    it('should be instance of Event Emitter', () => {

        return new Promise((resolve) => {

            const config = new Config();
            expect(config).to.be.instanceof(EventEmitter);

            resolve();
        });
    });

    describe('with default configuration', () => {

        before(() => {

            return new Promise((resolve) => {

                mockEzConfig = Sinon.stub(EzConfig, 'get', () => {

                    return DefaultConfig;
                });

                resolve();
            });
        });

        after(() => {

            return new Promise((resolve) => {

                mockEzConfig.restore();

                resolve();
            });
        });

        it('should return configuration as an object', () => {

            const config = new Config();
            return config.get()
                .then((result) => {

                    expect(result).to.an.object();
                    expect(result.routes).to.be.an.array();
                    expect(result.routes[0]).to.be.an.object();
                    expect(result.routes[0].path).to.equal('/default');
                });
        });
    });

    describe('with missing configuration', () => {

        before(() => {

            return new Promise((resolve) => {

                mockEzConfig = Sinon.stub(EzConfig, 'get', () => {

                    return undefined;
                });

                resolve();
            });
        });

        after(() => {

            return new Promise((resolve) => {

                mockEzConfig.restore();

                resolve();
            });
        });

        it('should return error if missing config', () => {

            const config = new Config();
            return config.get()
                .catch((err) => {

                    expect(err).to.be.an.error();
                    expect(err.message).to.equal('Unable to load configuration');
                });
        });
    });
});
