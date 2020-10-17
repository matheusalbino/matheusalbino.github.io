function getDevServer({ outputPath }) {
  return {
    open: true,
    contentBase: [outputPath, './public'],
    hot: true,
    compress: true,
    port: 3000,
    stats: {
      colors: true
    }
  };
}

exports.getDevServer = getDevServer;
