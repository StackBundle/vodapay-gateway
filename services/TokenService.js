/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Initiate authentication of token
*
* model VodaPayGatewayAuthenticateToken VodaPayGatewayTokenResponse.
* apiKey String The API key. (optional)
* test Boolean Is testing  (optional)
* returns VodaPayGatewayTokenResponse
* */
const token_Authenticate = ({ model, apiKey, test }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        model,
        apiKey,
        test,
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
*
* control String 
* model VodaPayGatewayToken 
* apiKey String  (optional)
* test Boolean  (optional)
* returns VodaPayGatewayTokenResponse
* */
const token_Control = ({ control, model, apiKey, test }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        control,
        model,
        apiKey,
        test,
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
* Create the specified model.
*
* model VodaPayGatewayCreateToken VodaPayGatewayCreateToken.
* apiKey String The API key. (optional)
* test Boolean Is testing  (optional)
* returns VodaPayGatewayTokenResponse
* */
const token_Create = ({ model, apiKey, test }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        model,
        apiKey,
        test,
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
* Get a list of tokens.
*
* model VodaPayGatewayListToken VodaPayGatewayListToken.
* apiKey String The API key. (optional)
* test Boolean Is testing  (optional)
* returns VodaPayGatewayTokenListResponse
* */
const token_List = ({ model, apiKey, test }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        model,
        apiKey,
        test,
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
  token_Authenticate,
  token_Control,
  token_Create,
  token_List,
};
