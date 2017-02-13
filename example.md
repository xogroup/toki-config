### Example usage with toki-config-file (more use cases to come!)

```Javascript
'use strict';

const options = {
    'toki-config-file': {
        example: 'foobar'
    }
};

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

See the [toki-config-file](https://github.com/xogroup/toki-config-file) repo for more details.