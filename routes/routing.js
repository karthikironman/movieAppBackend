
const onboardingController = require('./controllers/onboarding.controller.js')
let basePath = '/api/v1/';

const routes = [
    {
        method:'POST',
        url:basePath+'user',
        handler:onboardingController.addUser
    }
]

module.exports = routes;