module.exports = {
  apps: [
    {
      name: 'M-5.1-test',
      exec_mode: 'cluster',
      instances: 'max', // Or a number of instances
      max_memory_restart:'600M',
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start',
      error_file: "./logs/app-err.log",
      out_file: "./logs/app-out.log",
      env: {
        "MODE": "test"
      }
    }
  ]
}
