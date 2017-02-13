'use strict';

const Promise = require('bluebird');
const EventEmitter = require('events');
const Config = require('../../lib/implementation');

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

let EzConfigStub;

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

    it('should be accept an options argument on instantiation', () => {

        return new Promise((resolve) => {

            const options = {
                'toki-config-file': {
                    foo: 'bar'
                }
            };

            const config = new Config(options);

            expect(config.options).to.be.an.object();
            expect(config.options['toki-config-file']).to.be.an.object();
            expect(config.options['toki-config-file'].foo).to.equal('bar');

            resolve();
        });
    });

    describe('with default configuration', () => {

        before(() => {

            return new Promise((resolve) => {

                EzConfigStub = Sinon.stub(EzConfig, 'get', () => {

                    return DefaultConfig;
                });

                resolve();
            });
        });

        after(() => {

            return new Promise((resolve) => {

                EzConfigStub.restore();

                resolve();
            });
        });

        it('should return configuration as an object', () => {

            const options = {
                'toki-config-file': {
                    fizz: 'bazz'
                }
            };

            const config = new Config(options);
            return config.get()
                .then((result) => {

                    expect(result).to.an.object();
                    expect(result.routes).to.be.an.array();
                    expect(result.routes[0]).to.be.an.object();
                    expect(result.routes[0].path).to.equal('/default');
                });
        });

        it('should error if no configuration options passed', () => {

            const config = new Config();
            return config.get()
                .catch((err) => {

                    expect(err).to.be.an.error();
                    expect(err.message).to.equal('Valid configuration loader not detected');
                });
        });
    });

    describe('with missing configuration', () => {

        before(() => {

            return new Promise((resolve) => {

                EzConfigStub = Sinon.stub(EzConfig, 'get', () => {

                    return undefined;
                });

                resolve();
            });
        });

        after(() => {

            return new Promise((resolve) => {

                EzConfigStub.restore();

                resolve();
            });
        });

        it('should return error if missing config', () => {

            const options = {
                'toki-config-file': {
                    flim: 'flam'
                }
            };

            const config = new Config(options);
            return config.get()
                .catch((err) => {

                    expect(err).to.be.an.error();
                    expect(err.message).to.equal('Unable to load configuration');
                });
        });
    });
});
