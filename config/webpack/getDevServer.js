function getDevServer({ outputPath }) {
  return {
    open: true,
    contentBase: outputPath,
    hot: true,
    compress: true,
    port: 3000,
    stats: {
      colors: true
    }
  };
}

exports.getDevServer = getDevServer;
