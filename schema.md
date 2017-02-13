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