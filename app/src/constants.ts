const {
  MODE: ENVIRONMENT,
  VITE_REACT_APP_SITE_KEY: RECAPTCHA_SITE_KEY,
  VITE_BACKEND_API: API_URL,
  VITE_PORT: PORT,
  VITE_ENV: ENV,
} = import.meta.env;

export { ENVIRONMENT, RECAPTCHA_SITE_KEY, API_URL, PORT, ENV };
