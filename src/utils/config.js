const PROD_DOMAIN = "";
const STAGING_DOMAIN = "";
const DEV_DOMAIN = "";

const MODE = {
  PRODUCTION: {
    ENV_IP: PROD_DOMAIN,
  },
  STAGING: {
    ENV_IP: STAGING_DOMAIN,
  },
  DEVELOPMENT: {
    ENV_IP: DEV_DOMAIN,
  },
};

const NEXT_MODE = "STAGING"; // Change this to STAGING for staging deployment
const { ENV_IP, ENV_WS } = MODE[NEXT_MODE];

const ENVIRONMENT = {
  ENV_IP,
};
export default ENVIRONMENT;
