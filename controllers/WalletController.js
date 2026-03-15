/**
 * The WalletController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/WalletService');
const digitalWallet_Block = async (request, response) => {
  await Controller.handleRequest(request, response, service.digitalWallet_Block);
};

const digitalWallet_Unblock = async (request, response) => {
  await Controller.handleRequest(request, response, service.digitalWallet_Unblock);
};


module.exports = {
  digitalWallet_Block,
  digitalWallet_Unblock,
};
