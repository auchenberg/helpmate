'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

var InviteSchema = new Schema({
  created_on: { type : Date, default : Date.now },
  email: { type: String },
});

mongoose.model('Invite', InviteSchema);
