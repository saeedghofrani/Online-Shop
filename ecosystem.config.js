module.exports = {
  apps : [{
    name   : "app1",
    script : "./dist/main.js",
    instances: 1,
    autorestart: true,
    watch: true,
    max_memory_restart: '1G',
    env_production: {
      NODE_ENV: "production"
   },
   env_development: {
      NODE_ENV: "development"
   }
  }],
  deploy : {
    production : {
      user : 'node',
      host : '127.0.0.1',
      ref  : 'origin/main',
      repo : 'x',
      path : 'x',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    },
    development : {
      user : 'node',
      host : '127.0.0.1',
      ref  : 'origin/main',
      repo : 'x',
      path : 'x',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env development'
    }
  }
}