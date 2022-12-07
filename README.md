<h1 align="center">
  Retagger
</h1>
<p align="center" style="font-size: 1.2rem;">?</p>
<p align="center" style="font-size: 1.2rem;">emmit.jsx</p>

[![License](https://img.shields.io/npm/l/retagger.svg)](https://github.com/godested/retagger/blob/master/LICENSE)
[![npm package](https://img.shields.io/npm/v/retagger.svg)](https://www.npmjs.com/package/retagger)
[![npm downloads](https://img.shields.io/npm/dm/retagger.svg)](https://www.npmjs.com/package/retagger)

```bash
npm install retagger
# or
yarn add retagger
```

## Examples

```js
import Retagger from 'retagger';

const Container = Retagger.div.Container;
// <div className="Container" {...restProps} />

function MyComponent() {
  return (
    // Accept any other props
    <Container role="presentation">
      <OtherComponent />
    </Container>
  );
}
```

```js
import Retagger from 'retagger';

const Container = Retagger.div.Container.OtherClass.foo;
// <div className="Container OtherClass foo" {...restProps} />

function MyComponent() {
  return (
    <Container>
      <OtherComponent />
    </Container>
  );
}
```

```js
import Retagger from 'retagger';

const classes = {
  container: '__foo',
};

const Container = Retagger.div[classes.container].OtherClass.foo;
// <div className="__foo OtherClass foo" {...restProps} />

function MyComponent() {
  return (
    <Container>
      <OtherComponent />
    </Container>
  );
}
```

```js
import Retagger from 'retagger';

const Container = Retagger(YourComponent).Container.foo;
// YourComponent should accept className prop
// <YourComponent className="Container foo" {...restProps} />

function MyComponent() {
  return (
    <Container>
      <OtherComponent />
    </Container>
  );
}
```

See [LICENSE](./LICENSE) for more information.
