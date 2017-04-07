'use strict';

const Promise = require('bluebird');
const EventEmitter = require('events');
const Config = require('../../lib/implementation');

const EzConfig = require('ez-config');
const Sinon = require('sinon');
const DefaultConfig = require('../fixtures/config/default.json');
const DuplicateActionConfig = require('../fixtures/config/duplicateActions.json');

const Code = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();

const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;
const before = lab.before;


let EzConfigStub;

describe('unit tests - implementation', () => {

    before(() => {

        return new Promise((resolve) => {

            EzConfigStub = Sinon.stub(EzConfig, 'get');
            resolve();
        });
    });

    const options = {
        'toki-config-file': {
            foo: 'bar'
        }
    };

    let config;

    // it('should error if no configuration options passed', () => {
    //
    //     const promise =  new Promise(() => {
    //
    //         config = new Config();
    //
    //         return config;
    //     });
    //
    //     return promise
    //             .catch((err) => {
    //
    //                 expect(err).to.be.an.error();
    //                 expect(err.message).to.equal('No existing instance found to return');
    //             });
    // });

    before(() => {

        EzConfigStub.returns(null);
        return Promise.resolve();
    });

    it('should return error if missing config', () => {

        config = new Config(options);
        return config.get()
            .catch((err) => {

                expect(err).to.be.an.error();
                expect(err.message).to.equal('Unable to load configuration');
            });
    });

    it('should accept an options argument on instantiation', () => {

        config = new Config();
        return Promise.resolve()
        .then(() => {

            expect(config).to.be.instanceof(Config);
            expect(config.options).to.be.an.object();
            expect(config.options['toki-config-file']).to.be.an.object();
            expect(config.options['toki-config-file'].foo).to.equal('bar');
        });
    });

    it('should be instance of Event Emitter', () => {

        return new Promise((resolve) => {

            config = new Config();
            expect(config).to.be.instanceof(EventEmitter);

            return resolve();
        });
    });

    it('should be a singleton instance', () => {

        const config1 = new Config();
        const config2 = new Config();

        return Promise.resolve()
        .then(() => {

            expect(config1).to.equal(config2);
        });
    });

    describe('with default configuration', () => {

        before(() => {

            EzConfigStub.returns(DefaultConfig);
            return Promise.resolve();
        });

        it('should return configuration as an object', () => {

            config = new Config();
            return config.get()
                .then((result) => {

                    expect(result).to.an.object();
                    expect(result.routes).to.be.an.array();
                    expect(result.routes[0]).to.be.an.object();
                    expect(result.routes[0].path).to.equal('/default');
                });
        });
    });

    describe('with duplicate action configuration', () => {

        before(() => {

            EzConfigStub.returns(DuplicateActionConfig);
            return Promise.resolve();
        });

        it('should throw an error when a config contains duplicate action names', { plan: 2 }, () => {

            config = new Config();
            return config.get()
            .catch( (e) => {

                expect(e).to.be.instanceof(Error);
                expect(e.message).to.equal('Duplicate action name foo');
            });
        });

    });
});
