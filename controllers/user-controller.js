const { User } = require('../models');

const userController = {
    //get all users
    getAllUsers(req,res) {
        User.find({}).then(users => {
            res.json(users);
          });
    },

    //get one user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'Thought',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(404);
            });
    },       
}

module.exports + userController;