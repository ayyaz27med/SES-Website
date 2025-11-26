module.exports = {
  apps: [
    {
      name: "SandboxWebsite",
      script: "npm",
      args: "start",
      cwd: "/var/www/SandboxWebsite",
      env: {
        PORT: 3010,
        NODE_ENV: "production"
      }
    }
  ]
};
