const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

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
      reactions: [reactionSchema]
   }
);

// UserSchema.virtual('friendCount').get(function() {
//     return this.friends.length;
// });