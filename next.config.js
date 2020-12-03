require("dotenv").config({ path: `./.env.${process.env.ENVIRONMENT}` });

module.exports = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.node = {
                net: 'empty',
                tls: 'empty'
            };
        }

        return config;
    },
    ACCOUNT_TYPE : process.env.ACCOUNT_TYPE,
    PROJECT_ID : process.env.PROJECT_ID,
    NEXT_PUBLIC_API_KEY : process.env.NEXT_PUBLIC_API_KEY,
    PRIVATE_KEY_ID : process.env.PRIVATE_KEY_ID,
    PRIVATE_KEY : process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
    CLIENT_EMAIL : process.env.CLIENT_EMAIL,
    CLIENT_ID : process.env.CLIENT_ID,
    LICHESS_API_KEY : process.env.LICHESS_API_KEY,
    LAMBDA_REDIS_PORT: process.env.LAMBDA_REDIS_PORT,
    LAMBDA_REDIS_ENDPOINT: process.env.LAMBDA_REDIS_ENDPOINT,
    LAMBDA_REDIS_PW: process.env.LAMBDA_REDIS_PW,
    AUTH_URI : "https://accounts.google.com/o/oauth2/auth",
    TOKEN_URI : "https://oauth2.googleapis.com/token",
    AUTH_PROVIDER_X509_CERT_URL : "https://www.googleapis.com/oauth2/v1/certs",
    CLIENT_X509_CERT_URL : "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-j6243%40pgnbuddy.iam.gserviceaccount.com",
    NEXT_PUBLIC_MESSAGING_SENDER_ID : "207583183616",
    NEXT_PUBLIC_APP_ID : "1:207583183616:web:20b5e65cb049f905fca9e5",
    MEASUREMENT_ID : "G-LBG9Z3TJ5H",
};