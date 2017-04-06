const crypto = require('crypto');
const mongoose = require('mongoose');

/**
 * User Schema
 */
const ClientSchema = new mongoose.Schema({
   token: {
      type: String,
      required: true
   },
   date: {
      type: Date,
      default: Date.now
   }
});


/**
 * Methods
 */


/**
 * Statics
 */
ClientSchema.statics = {

   /**
    * @returns {Promise<Client>}
    */
   create() {

      var client = new this();

      client.token = `${client.id}.${crypto.randomBytes}`;

      return client.save();

   },

   /**
    *
    * @param token
    */
   remove(token) {

      return this.remove({ token }), err => {
         return Promise.resolve;
      };

   },

};

/**
 * @typedef Client
 */
module.exports = mongoose.model('Client', ClientSchema);
