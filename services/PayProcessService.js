/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Immediate payment intent form post.
*
* apiKey String Gets or sets the API key. (optional)
* delaySettlement Boolean Gets or sets a value indicating whether [delay settlement]. (optional)
* isTesting Boolean Gets or sets a value indicating whether this instance is testing. (optional)
* echoData String Gets or sets the echo data. (optional)
* traceId String Gets or sets the trace identifier. (optional)
* amount Integer Gets or sets the amount. (optional)
* additionalData String Gets or sets the additional data. (optional)
* customerId String Gets or sets the customer identifier. (optional)
* digitalWalletId String Gets or sets the digital wallet identifier. (optional)
* callbackUrl String Gets or sets the callback URL. (optional)
* notificationUrl String Gets or sets the notification URL. (optional)
* logoUrl String Gets or sets the logo URL. (optional)
* bannerUrl String Gets or sets the banner URL. (optional)
* theme Integer Gets or sets the theme. (optional)
* basket List Gets or sets the basket. (optional)
* msisdn String Gets or sets the msisdn. (optional)
* message String Gets or sets the message. (optional)
* returns VodaPayGatewayResponse
* */
const payProcess_OnceOff = ({ apiKey, delaySettlement, isTesting, echoData, traceId, amount, additionalData, customerId, digitalWalletId, callbackUrl, notificationUrl, logoUrl, bannerUrl, theme, basket, msisdn, message }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        apiKey,
        delaySettlement,
        isTesting,
        echoData,
        traceId,
        amount,
        additionalData,
        customerId,
        digitalWalletId,
        callbackUrl,
        notificationUrl,
        logoUrl,
        bannerUrl,
        theme,
        basket,
        msisdn,
        message,
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
  payProcess_OnceOff,
};
