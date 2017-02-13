# Toki-Config <!-- Repo Name -->
> Loads configuration and returns it as an object <!-- Repo Brief Description -->

<!-- Long Description -->
This is the configuration loading device for Toki. It loads a Toki configuration from a configuration loading submodule which must be specified at instantiation. [Click here](https://github.com/xogroup/toki-config#currently-available-configuration-loaders) to view currently available configuration loaders.

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
## Getting Started
Setup will depend on which configuration loading submodule you want to use. In general, you will need to define your configuration to fit the [Toki Configuration Schema](https://github.com/xogroup/toki-config/blob/master/schema.md) and use a configuration loading submodule to return an object meeting that specification to `toki-config`.

### Currently Available Configuration Loaders
1. [toki-config-file](https://github.com/xogroup/toki-config-file) - Loads configuration from static file
  * See [example](https://github.com/xogroup/toki-config/blob/master/example.md) here.

### How to specify which Configuration Loader you want to use

Toki-Config requires configuration options to be passed at time of instantiation.
This object must specify the name of the submodule to use to load the configuration and any options you wish to pass to the submodule.
```Javascript
const options = {
    'name-of-submodule': {
        foo: 'bar'
    }
}
```

## Development Setup

### Install Dependencies
Install the dependencies based on package.json.
```Text
make install
```

### Test Project
Run tests locally.
```Text
make test
```
<!-- Customize this if needed -->

<!-- Anything Else (Sponsors, Links, Etc) -->
