function getFileName(env) {
  if (env.local) {
    return '[name]';
  }

  return '[name].[contenthash]';
}

exports.getFileName = getFileName;
