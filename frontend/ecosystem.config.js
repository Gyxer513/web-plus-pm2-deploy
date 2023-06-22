require("dotenv").config({ path: "../backend/.env.deploy" });

const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_PATH,
  DEPLOY_REF = "origin/master",
} = process.env;

module.exports = {
  apps: [
    {
      name: "mesto-frontend",
    },
  ],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: "https://github.com/Gyxer513/web-plus-pm2-deploy/",
      path: DEPLOY_PATH,
      "post-deploy":
        "cd frontend && npm install && npm run build && sudo scp -r build/* /var/www/build",
    },
  },
};
