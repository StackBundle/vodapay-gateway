/**
 * The PayController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/PayService');
const pay_CompleteOnceOff = async (request, response) => {
  await Controller.handleRequest(request, response, service.pay_CompleteOnceOff);
};

const pay_OnceOff = async (request, response) => {
  await Controller.handleRequest(request, response, service.pay_OnceOff);
};

const pay_Recurring = async (request, response) => {
  await Controller.handleRequest(request, response, service.pay_Recurring);
};

const pay_Refund = async (request, response) => {
  await Controller.handleRequest(request, response, service.pay_Refund);
};

const pay_SubmitRecurring = async (request, response) => {
  await Controller.handleRequest(request, response, service.pay_SubmitRecurring);
};


module.exports = {
  pay_CompleteOnceOff,
  pay_OnceOff,
  pay_Recurring,
  pay_Refund,
  pay_SubmitRecurring,
};
