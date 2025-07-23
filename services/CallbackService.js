/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* gets the specified data.
*
* data String The data. (optional)
* returns File
* */
const callBack_Get = ({ data }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        data,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* redirect data and translate to NI specific
*
* merchantId String 
* returns File
* */
const callBack_NiRedirect = ({ merchantId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        merchantId,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* NI Token Lifecycle
*
* model TokenLifeCycleWebhook 
* apiKey String  (optional)
* returns File
* */
const callBack_NiTokenLifecycle = ({ model, apiKey }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        model,
        apiKey,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* gets the specified data.
*
* model WebHookModel 
* apiKey String  (optional)
* returns File
* */
const callBack_NiWebhook = ({ model, apiKey }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        model,
        apiKey,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Delete saved card token(s) sent by NI
*
* model DeletedTokensWebHookPayload 
* apiKey String  (optional)
* returns File
* */
const callBack_NiWebhookDelete = ({ model, apiKey }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        model,
        apiKey,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

module.exports = {
  callBack_Get,
  callBack_NiRedirect,
  callBack_NiTokenLifecycle,
  callBack_NiWebhook,
  callBack_NiWebhookDelete,
};
