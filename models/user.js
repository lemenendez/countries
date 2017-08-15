var userModel = {};

userModel.auth = function(username, password) {
    if(username=="test" && password=="test") {
        return true;
    }
    return false;
} 


module.exports = userModel;