const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const keyStoreSchema = new Schema({
    version: {
      type: 'Number'
    },
    id: {
      type: 'String'
    },
    address: {
      type: 'String'
    },
    crypto: {
      ciphertext: {
        type: 'String'
      },
      cipherparams: {
        iv: {
          type: 'String'
        }
      },
      cipher: {
        type: 'String'
      },
      kdf: {
        type: 'String'
      },
      kdfparams: {
        dklen: {
          type: 'Number'
        },
        salt: {
          type: 'String'
        },
        n: {
          type: 'Number'
        },
        r: {
          type: 'Number'
        },
        p: {
          type: 'Number'
        }
      },
      mac: {
        type: 'String'
      }
    }
  });

  module.exports = keyStoreSchema