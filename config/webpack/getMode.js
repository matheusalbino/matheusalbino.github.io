function getMode(env) {
  if (env.production) {
    return 'production';
  }

  return 'development';
}

exports.getMode = getMode;
