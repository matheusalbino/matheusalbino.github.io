function getEntry(env) {
  if (env.production) {
    return { app: './src/index.tsx' };
  }

  return ['./src/index.tsx'];
}

module.exports.getEntry = getEntry;
