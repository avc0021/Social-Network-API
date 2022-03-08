const { User, Thought } = require('../models');

const thoughtController = {
    //get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.sendStatus(404);
            });
    },

    // get thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .select('-__v')
        .then(dbThoughtData => {
          if (!dbThoughtData) {
            res.status(404).json({ message: "No Thought found with this id" });
            return;
          }
          res.json(dbThoughtData);
        })
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    },
    
    //add thought to user
    addThought({ params, body }, res) {
        console.log(params);
        Thought.create(body)
            .then(({ _id }) => {
              return User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thought: _id } },
                { new: true }
              );
            })
            .then (dbUserData => {
              console.log(dbUserData);
              if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
              }
              res.json(dbUserData)
            })
            .catch(err => res.json(err));
    },

    // update thought
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, {
            new: true, runValidators: true
        })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },
    // add reaction
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({ message: 'Thought no found to add reaction'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },
    // remove comment
    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.commentId })
            .then(deletedThought => {
                if (!deletedThought) {
                    return res.status(404).json({ message: 'Thought with this Id'});   
                }
                return User.findOneAndUpdate(
                    { _id: params.UserId },
                    { $pull: { thoughts: params.thoughtId } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this Id' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));

    },
    // remove reaction
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionsId } } },
            { new: true }
        )
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
    }
}

module.exports = thoughtController;