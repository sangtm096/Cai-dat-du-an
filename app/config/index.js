require('dotenv').config();

const config = {
    app: {
        port: process.env.PORT || 3000,
    }
};

module.exports = config;