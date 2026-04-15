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
/*const payProcess_OnceOff = ({ apiKey, delaySettlement, isTesting, echoData, traceId, amount, additionalData, customerId, digitalWalletId, callbackUrl, notificationUrl, logoUrl, bannerUrl, theme, basket, msisdn, message }) => new Promise(
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
};*/




const axios = require('axios');

const UAT_BASE_URL = 'https://api.vodapaygatewayuat.vodacom.co.za/v2/';
const PROD_BASE_URL = 'https://api.vodapaygateway.vodacom.co.za/v2/';

const isProd = process.env.NODE_ENV === 'production';
const BASE_URL = isProd ? PROD_BASE_URL : UAT_BASE_URL;

/**
 * Create Once-Off VodaPay Payment
 */
const payProcess_OnceOff = async ({
  amount,
  orderId,
  customerId,
  callbackUrl,
  notificationUrl,
  isTesting = true,
}) => {
  try {
    const apiKey = process.env.VODAPAY_API_KEY;

    if (!apiKey) {
      throw new Error('Missing VODAPAY_API_KEY in environment variables');
    }

    if (!amount || !orderId) {
      throw new Error('amount and orderId are required');
    }

    // --------------------------------------------------
    // VodaPay payload (based on gateway structure)
    // --------------------------------------------------
    const payload = {
      amount,
      currency: 'ZAR',
      merchantReference: orderId,
      customerReference: customerId || orderId,
      callbackUrl,
      notificationUrl,
      isTesting,
    };

    // --------------------------------------------------
    // API CALL
    // --------------------------------------------------
    const response = await axios.post(
      `${BASE_URL}payments/once-off`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': apiKey, // IMPORTANT: VodaPay uses raw API key (not Bearer unless docs say otherwise)
        },
        timeout: 15000,
      }
    );

    const data = response.data;

    // --------------------------------------------------
    // Extract payment URL (depends on VodaPay response shape)
    // --------------------------------------------------
    const paymentUrl =
      data?.paymentUrl ||
      data?.redirectUrl ||
      data?.data?.paymentUrl ||
      data?.data?.redirectUrl;

    if (!paymentUrl) {
      console.error('VodaPay response:', data);
      throw new Error('No payment URL returned from VodaPay');
    }

    return {
      success: true,
      paymentUrl,
      raw: data,
    };

  } catch (error) {
    console.error('❌ VodaPay Payment Error:', error.response?.data || error.message);

    return {
      success: false,
      message: error.message,
      details: error.response?.data || null,
    };
  }
};

module.exports = {
  payProcess_OnceOff,
};
