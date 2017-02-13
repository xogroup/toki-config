# Toki-Config <!-- Repo Name -->
> Loads configuration and returns it as an object <!-- Repo Brief Description -->

<!-- Long Description -->
This is the configuration loading device for Toki.

<!-- Maintainer (Hint, probably you) -->
Lead Maintainer: [Rob Horrigan](https://github.com/robhorrigan)

<!-- Badges Go Here -->

<!-- Build Status from Travis -->
[![npm version](https://badge.fury.io/js/toki-config.svg)](https://badge.fury.io/js/toki-config)
[![Build Status](https://travis-ci.org/xogroup/toki-config.svg?branch=master)](https://travis-ci.org/xogroup/toki-config)
<!-- Security Scan from Snyk.io -->
[![Known Vulnerabilities](https://snyk.io/test/github/xogroup/toki-config/badge.svg)](https://snyk.io/test/github/xogroup/toki-config)
<!-- Security Scan from NSP -->
[![NSP Status](https://nodesecurity.io/orgs/xo-group/projects/4e38f776-3a5a-42e4-9240-a88dab24f7a5/badge)](https://nodesecurity.io/orgs/xo-group/projects/4e38f776-3a5a-42e4-9240-a88dab24f7a5)

<!-- End Badges -->
<!-- Quick Example -->
## Install Dependencies
Install the dependencies based on package.json.
```Text
make install
```

## Test Project
Run tests locally.
```Text
make test
```

## Getting Started
To get started, create a `config` directory at the root of your project then add
a `default.js` or `default.json` file with the following format:

```Javascript
'use strict';

const configuration = {
    toki: {
        routes: [
            {
                path       : '/example',
                httpAction : 'GET',
                tags       : ['api'],
                description: 'Example endpoint',
                actions    : [
                    {
                        name: 'action 1',
                        type: 'http'
                    },
                    [
                        {
                            name: 'action 2',
                            type: 'http'
                        },
                        {
                            name: 'action 3',
                            type: 'http'
                        }
                    ]
                ]
            }
        ]
    }
};

module.exports = configuration;
```
OR
```Javascript
{
    "toki": {
        "routes": [
            {
                "path"       : "/example",
                "httpAction" : "GET",
                "tags"       : ["api"],
                "description": "Example endpoint",
                "actions"    : [
                    {
                        "name": "action 1",
                        "type": "http"
                    },
                    [
                        {
                            "name": "action 2",
                            "type": "http"
                        },
                        {
                            "name": "action 3",
                            "type": "http"
                        }
                    ]
                ]
            }
        ]
    }
}
```

***

NOTE: If set, toki-config will use your `NODE_ENV` to determine which configuration to load.
```
$: echo $NODE_ENV
production
```
Will load configuration at `config/production.js` or `config/production.json`

**Obeys the import hierarchy described [here](https://github.com/lorenwest/node-config/wiki/Configuration-Files)

***

## Configuration Schema

<!-- TODO: Should link to schema definition in toki repo. -->

```Javascript
//executable action
action  = Joi.object().keys({
    name       : Joi.string(),

    //type is the custom action to be invoked
    type       : Joi.string(),

    description: Joi.string().optional()
}),

//parallel actions
actions = Joi.array().items(action).min(2),

//route configuration
routes  = Joi.object().keys({
    path       : Joi.string(),
    httpAction : Joi.string().valid('GET', 'POST'),
    tags       : Joi.array().items(Joi.string()).min(1),
    description: Joi.string(),
    actions    : Joi.array().items(action, actions).min(1)
}),

//Final overall schema
toki  = Joi.object().keys({
    routes: Joi.array().items(routes).min(1)
});
```

## Example usage

This module requires a configuration object to get passed at instantiation.
This must specify the name of the submodule to use to load the configuration and any options you wish to pass to the submodule.
```Javascript
const options = {
    'name-of-submodule': {
        foo: 'bar'
    }
}
```

Then require and instantiate `toki-config` as follows:

```Javascript
'use strict';

const Promise = require('bluebird');
const Config = require('toki-config');
const config = new Config(options);

const logConfig = () => {

    config.get()
        .then((configuration) => {
            console.log(configuration.routes[0].path) // /example
        })
        .catch((err) => {
            throw err;
        });
};

module.exports = () => {

    return Promise.resolve()
        .bind()
        .then(logConfig)
        .catch(function(err) {
            console.log(err);
        })
};
```

<!-- Customize this if needed -->

<!-- Anything Else (Sponsors, Links, Etc) -->
