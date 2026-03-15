/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Complete payment.
*
* model VodaPayGatewayPaymentComplete VodaPayGatewayPaymentComplete.
* apiKey String The API key. (optional)
* test Boolean if set to true [is testing]. (optional)
* returns VodaPayGatewayCompleteResponse
* */
const pay_CompleteOnceOff = ({ model, apiKey, test }) => new Promise(
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
* Immediate payment intent.
*
* model VodaPayGatewayPayment VodaPayGatewayPayment.
* apiKey String The API key. (optional)
* test Boolean The testing flag. (optional)
* returns VodaPayGatewayResponse
* */
const pay_OnceOff = ({ model, apiKey, test }) => new Promise(
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
* Create recurring payment.
*
* model VodaPayGatewayRecurring VodaPayGatewayRecurring.
* apiKey String The API key. (optional)
* test Boolean if set to true [is testing]. (optional)
* returns VodaPayGatewayResponse
* */
const pay_Recurring = ({ model, apiKey, test }) => new Promise(
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
* Immediate refund.
*
* model VodaPayGatewayRefund VodaPayGatewayRefund.
* apiKey String The API key. (optional)
* test Boolean if set to true [is testing]. (optional)
* returns VodaPayGatewayRefundResponse
* */
const pay_Refund = ({ model, apiKey, test }) => new Promise(
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
* Submit recurring payment.
*
* model VodaPayGatewayRecurringSubmit VodaPayGatewayRecurringSubmit.
* apiKey String The API key. (optional)
* test Boolean if set to true [is testing]. (optional)
* returns VodaPayGatewaySubmitRecurringResponse
* */
const pay_SubmitRecurring = ({ model, apiKey, test }) => new Promise(
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
  pay_CompleteOnceOff,
  pay_OnceOff,
  pay_Recurring,
  pay_Refund,
  pay_SubmitRecurring,
};
