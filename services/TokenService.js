/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Initiate authentication of token
*
* model VodaPayGatewayAuthenticateToken VodaPayGatewayTokenResponse.
* test Boolean Is testing  (optional)
* returns VodaPayGatewayTokenResponse
* */
const token_Authenticate = ({ model, test }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        model,
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
* test Boolean  (optional)
* returns VodaPayGatewayTokenResponse
* */
const token_Control = ({ control, model, test }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        control,
        model,
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
* test Boolean Is testing  (optional)
* returns VodaPayGatewayTokenResponse
* */
const token_Create = ({ model, test }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        model,
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
