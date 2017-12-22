const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const { getLoader } = require('react-app-rewired');

function rewireGraphQLTag(config, env) {
  const gqlExtension = /\.(graphql|gql)$/;

  // Exclude .graphql files from the file-loader
  const fileLoader = getLoader(
    config.module.rules,
    rule =>
      rule.loader && typeof rule.loader === 'string' && rule.loader.indexOf(`${path.sep}file-loader${path.sep}`) !== -1
  );
  fileLoader.exclude.push(gqlExtension);

  // Add loader for graphQL files
  const graphQLRule = {
    test: gqlExtension,
    loader: 'graphql-tag/loader',
    exclude: /node_modules/
  };
  config.module.rules.push(graphQLRule);
  config.resolve.extensions.push('.graphql');

  return config;
}

module.exports = function override(config, env) {
  config.resolve.extensions.push('.ts', '.tsx');
  coconfignf = rewireGraphQLTag(config, env);
  config.plugins.push(
    new CompressionPlugin({
      algorithm: 'gzip'
    })
  );

  return config;
};
