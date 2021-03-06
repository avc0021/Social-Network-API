const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
   {
      username: {
        type: String,
        unique: true,
        required: 'Please enter username.',
        trim: true
      },
      email: {
        type: String,
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address'],
        unique: true,
        required: true
      },
      thoughts: [
          {
              type: Schema.Types.ObjectId,
              ref: 'Thought'
          }
      ],
      friends: [
          {
            type: Schema.Types.ObjectId,
            ref: 'User'
          }
      ]
   },
   {
    toJSON: {
        virtuals: true
    },
    id: false
  }
);

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})

const user = model('User', UserSchema)

module.exports = user;