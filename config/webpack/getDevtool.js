function getDevtool(env) {
  if (env.production) {
    return 'source-map';
  }

  return 'eval-source-map';
}

exports.getDevtool = getDevtool;
