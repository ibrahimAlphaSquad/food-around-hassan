const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;
const localStrategy = require('passport-local').Strategy;
const {ExtractJwt} = require('passport-jwt');
const GooglePlusTokenStrategy = require('passport-google-plus-token');

const {secret} = require('./');
const {Chef} = require('../../models/chef');
const {Customer} = require('../../models/customer');

//JWT Strategy
passport.use(new jwtStrategy({
jwtFromRequest: ExtractJwt.fromHeader('authorization'),
secretOrKey: secret
},
async (payload, done) => {
   
    try{
    //find if user exists in Chefs' docs
    let user = await Chef.findById(payload.sub);

    if(!user) {
        user = await Customer.findById(payload.sub);
        if(!user) {
            return done(null, false, {error: "Token not valid"});
        }
        else {
            return done(null, user);
        } 
        
    }
    return done(null, user);

   }
   catch(err) {
        done(err, false);
   }
}));

//Google OAuth Strategy
passport.use('googleToken', new GooglePlusTokenStrategy({
    clientID: '690887777603-1gsrir2b0aaauaqv1ns0f9v9n4difm36.apps.googleusercontent.com',
    clientSecret: 'gmS6tyMtyPtDvTVqTG9_tFPs'
}, async (accessToken, refreshToken, profile, done) => {
    console.log(accessToken);
    console.log(refreshToken);    
    console.log(profile);
}));


//Local Strategy
passport.use(new localStrategy( {
    usernameField: 'email'
},
    async(email, password, done) => {
    
        try{
            //check if user exists
            let user = await Chef.findOne({email}); //first query the chefs collection
            if(!user) {  //if not present if chefs, query customers
                user = await Customer.findOne({email});
                if(!user) {    
                    //if not in customers too, exit from function
                    return done(null, false, {message: "noEmail"});
                }
            }
            //if user exists in either Chefs || Customers, check if password is correct
            const pass = await user.isCorrect(password)
                if(!pass) {
                    return done(null, false, {message: "passIncorrect"}); //password incorrect, exit
                }
                done(null, user); //password correct, return user
        }
        catch(err) {
            done(err, false);
        }


}));
