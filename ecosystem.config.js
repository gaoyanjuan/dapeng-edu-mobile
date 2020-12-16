module.exports = {
  apps: [
    {
      name: 'wap-pro',
      exec_mode: 'cluster',
      instances: 'max', // Or a number of instances
      max_memory_restart:'1000M',
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start',
      error_file: "/home/dapeng/logs/pm2/wap-err.log",
      out_file: "/home/dapeng/logs/pm2/wap-out.log",
      env: {
        "MODE": "pro"
      }
    },
    {
      name: 'wap-test',
      exec_mode: 'cluster',
      instances: 'max', // Or a number of instances
      max_memory_restart:'1000M',
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start',
      error_file: "./logs/wap-err.log",
      out_file: "./logs/wap-out.log",
      env: {
        "MODE": "test"
      }
    }
  ]
}
