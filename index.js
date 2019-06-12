// Inspired by https://github.com/babel/babel/tree/master/packages/babel-standalone/src
// and by https://github.com/facebook/create-react-app/tree/master/packages/babel-preset-react-app
//
module.exports = function preset(
  api,
  {
    'print-config': printConfig = false,
    react = true, // or false or { pragma, pragmaFrag, ... }
    flow = false, // or false
    typescript = false, // or true or { isTSX, jsxPragma, allExtension }
    transformRuntime = false, // or @babel/plugin-transform-runtime config
    useBuiltIns = 'false', // false | entry | usage
    corejs = false, // false || 2 || 3
    stage = 0,
    loose = false,
    decoratorsLegacy = false,
    decoratorsBeforeExport = false,
    pipelineProposal = 'minimal',
    ...rest // used to configure @babel/preset-env (with `loose` too)
  } = {}
) {
  const env = process.env.BABEL_ENV || process.env.NODE_ENV;
  const envConfig = { useBuiltIns, corejs, loose, ...rest };
  const reactConfig = {
    development: env === 'development',
    ...(typeof react === 'object' ? react : {}),
  };
  const typescriptConfig = typeof react === 'object' ? typescript : undefined;
  const stage0 = stage === 0;
  const stage1 = stage <= 1;
  const stage2 = stage <= 2;
  const stage3 = stage <= 3;
  const config = {
    presets: [
      ['@babel/preset-env', envConfig],
      react && ['@babel/preset-react', reactConfig],
      flow && '@babel/preset-flow',
      typescript && ['@babel/preset-typescript', typescriptConfig],
    ].filter(Boolean),
    plugins: [
      transformRuntime && [
        '@babel/plugin-transform-runtime',
        { corejs, ...(typeof transformRuntime === 'object' ? transformRuntime : { useESModules: true }) },
      ],

      // Stage 0
      stage0 && '@babel/plugin-proposal-function-bind',

      // Stage 1
      stage1 && '@babel/plugin-proposal-export-default-from',
      stage1 && '@babel/plugin-proposal-logical-assignment-operators',
      stage1 && ['@babel/plugin-proposal-optional-chaining', { loose }],
      stage1 && ['@babel/plugin-proposal-pipeline-operator', { proposal: pipelineProposal }],
      stage1 && ['@babel/plugin-proposal-nullish-coalescing-operator', { loose }],
      stage1 && '@babel/plugin-proposal-do-expressions',

      // Stage 2
      stage2 && ['@babel/plugin-proposal-decorators', { legacy: decoratorsLegacy, decoratorsBeforeExport }],
      stage2 && '@babel/plugin-proposal-function-sent',
      stage2 && '@babel/plugin-proposal-export-namespace-from',
      stage2 && '@babel/plugin-proposal-numeric-separator',
      stage2 && '@babel/plugin-proposal-throw-expressions',

      // Stage 3
      stage3 && '@babel/plugin-syntax-dynamic-import',
      stage3 && '@babel/plugin-syntax-import-meta',
      stage3 && ['@babel/plugin-proposal-class-properties', { loose }],
      stage3 && '@babel/plugin-proposal-json-strings',
      stage3 && ['@babel/plugin-proposal-private-methods', { loose }],
    ].filter(Boolean),
  };
  if (printConfig) {
    console.log(JSON.stringify(config, null, 2));
  }
  return config;
};
