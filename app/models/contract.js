'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

/**
 * User Schema
 */

var ContractSchema = new Schema({
  payment_provider: { type: String, default: 'paymill' },
  payment_customer_id: { type: String, default: '' },
  subscription_id: { type: Number, default: 0 },
  created_on: { type : Date, default : Date.now },
  user: { type: Number, ref: 'User' },
});

mongoose.model('Contract', ContractSchema);
