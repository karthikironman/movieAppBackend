let basePath = '/api/v1/';
const onboardingController = require('./controllers/onboarding.controller.js');

const routes = [
    {
        method:'GET',
        url:'/health',
        handler:(res,reply)=>{reply.send('working pa - the movie app routes')}
    },
    {
        method:'POST',
        url:basePath+'user',
        handler:onboardingController.addUser
    },
    {
        method:'GET',
        url:basePath+'user',
        handler:onboardingController.getUsers
    },
    {
        method:'POST',
        url:basePath+'login',
        handler:onboardingController.login
    }
]

module.exports = routes;