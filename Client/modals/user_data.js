
const { Schema, model } = require('mongoose');
const Profile = Schema({
    UserID:{
      type: String,
      required: true
    },
    Credit:{
       type: Number,
       default: 0
    },
    LastDaily: {
        type: Date
    },
    Transfare: [{
        to: String,
        amout: Number
    }],
    Reseve: [{
        from: String,
        amout: Number
    }]
});

module.exports = model('Users Credits', Profile);