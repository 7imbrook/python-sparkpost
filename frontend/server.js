const webpack = require('webpack');
const config = require('./webpack.config.dev');
const WebpackDevServer = require('webpack-dev-server');

const server = new WebpackDevServer(webpack(config), {
  contentBase: './app',
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  proxy: {
    "/api/**": {
          target: "http://localhost:3000/",
          changeOrigin: true,
          ws: false
      },
      "/socket/**": {
          target: "http://localhost:3000/",
          changeOrigin: true,
          ws: true
      }
  }
})

server.listen(process.env.PORT || 5000, 'localhost', function (err) {
  if (err) {
    console.log(err);
  }
  console.log('Listening at localhost:' + (process.env.PORT || 5000));
});
