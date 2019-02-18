# babel-preset-gda

Babel preset including babel-preset-env, configurable latest [TC39](https://github.com/tc39/proposals) proposals, React, Flow, TypeScript. Used by [gda-scripts](https://github.com/gillesdandrea/gda-scripts).

Inspired by [babel-standalone](https://github.com/babel/babel/tree/master/packages/babel-standalone/src)
and by [babel-preset-react-app](https://github.com/facebook/create-react-app/tree/master/packages/babel-preset-react-app)

## Usage

First, install [Babel](https://babeljs.io/docs/setup/)

Then install `babel-preset-gda`

```
npm install babel-preset-gda --save-dev
```

Then create a file named `.babelrc` with following contents in the root folder of your project:

```
{
  "presets": ["gda"]
}
```

## Configure Preset

### Configure babel-preset-env

See [babel-preset-env](https://babeljs.io/docs/en/babel-preset-env).

For example, to disable babel-preset-env `modules`:

```
{
  "presets": ["gda", { "modules": false }]
}
```

### Configure JS stage

Default stage is `0`.

```
{
  "presets": ["gda", { "stage": 4 }]
}
```

### Usage with React

Default is `true`.
You can set it to `true` or pass a configuration object, see [babel-preset-react](https://babeljs.io/docs/en/next/babel-preset-react).

```
{
  "presets": ["gda", { "react": true }]
}
```

### Usage with Flow

Default is `false`.

```
{
  "presets": ["gda", { "flow": true }]
}
```

### Usage with TypeScript

Default is `false`.
You can set it to `true` or pass a configuration object, see [babel-preset-typescript](https://babeljs.io/docs/en/next/babel-preset-typescript).

```
{
  "presets": ["gda", { "typescript": true }]
}
```

### Additional options:

#### `loose`

`boolean`, defaults to `false`

Enable "loose" transformations for any plugins in this preset that allow them.

#### `decoratorsLegacy` (stage-2)

`boolean`, defaults to `false`.
See [babel-plugin-proposal-decorators](https://babeljs.io/docs/en/babel-plugin-proposal-decorators)

#### `pipelineProposal` (stage-1)

`string`, defaults to `"minimal"`
See [babel-plugin-proposal-pipeline-operator](https://babeljs.io/docs/en/babel-plugin-proposal-pipeline-operator)
