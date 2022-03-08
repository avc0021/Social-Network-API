const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
   {  
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },
      reactionBody: {
        type: String,
        required: true,
        maxlength: 280
      },
      username: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
      }
    },
    {
      toJSON: {
        getters: true,
      },
      id: false
    }
);

const ThoughtSchema = new Schema(
   {
      thoughtText: {
        type: String,
        unique: true,
        required: 'Please enter text.',
        maxlength: 280
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
      },
      username: {
          type: String,
          required: true
      },
      reactions: [ReactionSchema]
    }
);

ThoughtSchema.virtual('reactionCount').get(function() {
     return this.reaction.length;
})

const thought = model('Thought', ThoughtSchema)

module.exports = thought;