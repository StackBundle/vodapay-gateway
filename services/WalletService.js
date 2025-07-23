/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Initializes a new instance of the DigitalWalletController class.
*
* model VodaPayGatewayDigitalWallet VodaPayGatewayDigitalWallet.
* apiKey String The API key. (optional)
* test Boolean if set to true [is testing]. (optional)
* returns VodaPayGatewayDigitalWalletResponse
* */
const digitalWallet_Block = ({ model, apiKey, test }) => new Promise(
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
* Unblock wallet.
*
* model VodaPayGatewayDigitalWallet VodaPayGatewayDigitalWallet.
* apiKey String The API key. (optional)
* test Boolean if set to true [is testing]. (optional)
* returns PaymentDigitalWalletResponseModel
* */
const digitalWallet_Unblock = ({ model, apiKey, test }) => new Promise(
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
  digitalWallet_Block,
  digitalWallet_Unblock,
};
