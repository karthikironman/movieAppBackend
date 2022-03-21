let basePath = '/api/v1/';
const onboardingController = require('./controllers/onboarding.controller.js');

const routes = [
    {
        method:'POST',
        url:basePath+'send_otp',
        handler:onboardingController.sendOtp
    },
    {
        method:'POST',
        url:basePath+'verify_otp',
        handler:onboardingController.verifyOtp
    },
    {
        method:'POST',
        url:basePath+'user',
        handler:onboardingController.addUser
    }
]

module.exports = routes;