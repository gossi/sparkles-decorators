sparkles-decorators
==============================================================================

This addon provides decorators for Sparkles/Glimmer components to handle arguments in a nice way.

[Sparkle Components](https://github.com/rwjblue/sparkles-component) is a proof-of-concept to Glimmer Components to use them in ember projects for early adopters.

Installation
------------------------------------------------------------------------------

```
ember install sparkles-decorators
```


Usage
------------------------------------------------------------------------------

In your component:

```ts
// src/ui/components/my-component/component.ts
import Component from 'sparkles-component';
import { arg } from 'sparkles-decorators';

interface Args {
  foo?: string;
  bar?: string;
}

export default class MyComponent extends Component<Args> {
  // default using object descriptor
  @arg({default: 'bar'}) foo!: string;

  // default using initializer
  @arg bar!: string = 'baz';
}
```

```hbs
{{! src/ui/components/my-component/template.hbs}}
{{this.foo}}
```

```hbs
{{! src/ui/routes/application/template.hbs}}

<MyComponent /> {{! prints 'bar'}}
```

Use the `@arg` decorator to bind properties to arguments (one-way). If an initializer is present, that will be used for your default value. Alternatively, you can pass a default value (or function) in the descriptor object which will be assigned to the property if none is set.

You can also specify the name of your argument (if property and name are different):

```ts
export default class MyComponent extends Component {
  @arg({name: 'foo'}) bam!: string;
}
```

```hbs
{{! src/ui/components/my-component/template.hbs}}
{{this.bam}}
```

```hbs
{{! src/ui/routes/application/template.hbs}}

<MyComponent @foo='bar'/> {{! prints 'bar'}}
```

### API

```
@arg(options)
```

**options.name** (optional) - the name of the argument<br>
**options.default** (optional) - the default value or function

Contributing
------------------------------------------------------------------------------

### Installation

* `git clone https://github.com/gossi/sparkles-decorators`
* `cd sparkles-decorators`
* `yarn install`

### Linting

* `yarn lint:js`
* `yarn lint:js --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
