import csvtojson from 'csvtojson';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from '../database/models/userModel';

const response = {
    token: {},
    userAuthenticate: {}
}

export function fileUploadProcess(pathFile) {
    csvtojson({delimiter: ';'})
        .fromFile(pathFile)
        .then((jsonObj)=>{
            console.log(jsonObj);
        })
}

export function register(fullName, email, password) {
  const  newUser = new User({fullName, email});
  newUser.hash_password = bcrypt.hashSync(password, 10);
  newUser.save()
    .then(user => {
        user.hash_password = undefined;
        return `User ${user} is saved in mongodb`;
    }).catch(err => `User register failed cause: ${err}`);
};
function invalidUserOrPasswordPredicate(user, password) {
    return !user || !user.comparePassword(password);
}
export function login(email, password) {
    return User.findOne({ email: email }).then((userfromMongo) => {
        return (invalidUserOrPasswordPredicate(userfromMongo, password))
              ? `Authentication failed. Invalid user or password.`
              :  JSON.stringify({ token: jwt.sign({ email: userfromMongo.email, fullName: userfromMongo.fullName, _id: userfromMongo._id }, 'RESTFULAPIs') });
    }).catch((err) => {throw err});
};
