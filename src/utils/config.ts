const PROD_DOMAIN = "";
const STAGING_DOMAIN = "https://mentorsphere-dev-e56c7.ondigitalocean.app/api/docs/";
const DEV_DOMAIN = "https://mentorsphere-dev-e56c7.ondigitalocean.app/api/docs/";

type ModeKey = 'PRODUCTION' | 'STAGING' | 'DEVELOPMENT';

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
} as const satisfies Record<ModeKey, { ENV_IP: string }>; 

const NEXT_MODE: ModeKey = "STAGING"; // Change this to STAGING for staging deployment
const { ENV_IP } = MODE[NEXT_MODE];

const ENVIRONMENT: { ENV_IP: string } = {
  ENV_IP,
};

export default ENVIRONMENT;
