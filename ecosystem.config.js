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
        "MODE": "pro",
        "CLIENT_ID": "Dd8fbbB5",
        "CLIENT_SECRET": "tz9Yfdtn6w"
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
        "MODE": "test",
        "CLIENT_ID": "b4cd9c34",
        "CLIENT_SECRET": "VXAaTFh8yv"
      }
    }
  ]
}
