## API Reference

### Instantiating

Before Instantiating you must define an options object that specifies which configuration loading submodule you wish to use. Then to get an instance of the configuration loader, you
require `toki-config` and call a `new` instance of it, passing in the options object as an argument.

Note that the configuration loader is now a singleton. If you attempt to create a new configuration loader when an instance already exists you will get a `Failed to create new instance, an instance already exists.` error.

Finally, if your configuration loading submodule has an error in loading your configuration (i.e. missing file, malformed config options, ..etc) calling `.get()` will bubble up an error from your configuration loader submodule.

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