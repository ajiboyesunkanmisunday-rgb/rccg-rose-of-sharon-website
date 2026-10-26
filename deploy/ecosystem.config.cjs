// pm2 process list: one independent Next.js server per site.
//   pm2 start deploy/ecosystem.config.cjs      pm2 reload deploy/ecosystem.config.cjs      pm2 save
const root = __dirname + "/..";
const app = (name, port) => ({
  name: `ros-${name}`,
  cwd: `${root}/apps/${name}`,
  script: "node_modules/next/dist/bin/next",
  args: `start -p ${port}`,
  env: { NODE_ENV: "production", PORT: port },
  max_memory_restart: "600M",
  autorestart: true,
});
module.exports = { apps: [app("main", 3002), app("youth", 3003), app("training", 3004), app("media", 3005)] };
