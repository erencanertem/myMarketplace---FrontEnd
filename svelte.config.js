const adapter = require('@sveltejs/adapter-vercel');

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    alias: {
      $lib: 'src/lib'
    }
  }
};

module.exports = config;
