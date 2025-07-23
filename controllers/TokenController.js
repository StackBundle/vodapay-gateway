/**
 * The TokenController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/TokenService');
const token_Authenticate = async (request, response) => {
  await Controller.handleRequest(request, response, service.token_Authenticate);
};

const token_Control = async (request, response) => {
  await Controller.handleRequest(request, response, service.token_Control);
};

const token_Create = async (request, response) => {
  await Controller.handleRequest(request, response, service.token_Create);
};

const token_List = async (request, response) => {
  await Controller.handleRequest(request, response, service.token_List);
};


module.exports = {
  token_Authenticate,
  token_Control,
  token_Create,
  token_List,
};
