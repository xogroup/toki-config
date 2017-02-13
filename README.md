# Toki-Config <!-- Repo Name -->
> Loads configuration and returns it as an object <!-- Repo Brief Description -->

<!-- Long Description -->
This is the configuration loading device for Toki.

<!-- Maintainer (Hint, probably you) -->
Lead Maintainer: [Rob Horrigan](https://github.com/robhorrigan)

<!-- Badges Go Here -->

<!-- Build Status from Travis -->
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

## Example
To get started, create a `config` directory at the root of your project then add
a `default.js` file with the following format:

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

***

NOTE: If set, toki-config will use your `NODE_ENV` to determine which configuration to load.
```
$: echo $NODE_ENV
production
```
Will load configuration at `config/production.js`

***

## Configuration Schema

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

<!-- Customize this if needed -->

<!-- Anything Else (Sponsors, Links, Etc) -->
