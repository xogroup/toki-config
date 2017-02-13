## API Reference

### Instantiating

Before Instantiating you must define an options object that specifies with configuration loading submodule you wish to use. Then to get an instance of the configuration loader, you
require `toki-config` and call a `new` instance, passing in the options object.

```Javascript
const options = {
    'toki-config-example': {
        example: 'foobar'
    }
};

const Config = require('toki-config');
const config = new Config(options);
```

### Functions

The instance itself exposes the following functions:
  * get()