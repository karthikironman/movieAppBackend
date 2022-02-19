//import controllers here
// const onboardingController = require('./controllers/onboarding.controller.js')
// const netflixController = require('./controllers/netflix.controller.js')
//end of import
let basePath = '/api/v1/'
const routes = [
    {
        method:'POST',
        url:basePath+'user',
        handler:()=>{console.log('api working')}
    }
]

module.exports = routes