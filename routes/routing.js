
const onboardingController = require('./controllers/onboarding.controller.js')
let basePath = '/api/v1/';

const routes = [
    {
        method:'POST',
        url:basePath+'user',
        handler:onboardingController.addUser
    },
    {
        method:'POST',
        url:basePath+'otp',
        handler:onboardingController.sendOtp
    }
]

module.exports = routes;