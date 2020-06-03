// Use autorestart if in Docker 
// Use instances=1 if in Docker 

module.exports = {
  apps : [{
    name: 'submeet-subscriptions',
    script: 'npm',
    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'start',
    instances: 1,
    watch: false,
    max_memory_restart: '1G',
    instance_id_env: "NODE_APP_INSTANCE",
    error_file    : "logs/submeet-subscriptions.log",
    out_file    : "logs/submeet-subscriptions.log",
    merge_logs: true, 
    env: {
      PORT: 8081,
      NODE_ENV: "development",
      swagger_mockMode: true, 
      //NODE_OPTIONS: "--inspect --inspect-port=9232"
    },
    env_production: {
      NODE_ENV: 'production',
      swagger_mockMode: true, 
      autorestart: false,
      instances: 1,
      PORT: 8081
    }
  }] 
};
