const Vonage = require('@vonage/server-sdk')

const vonage = new Vonage({
    apiKey: "13b82620",
    apiSecret: "baiMiOxnwti5aEIv"
})

const from = "Vonage APIs"
exports.sendSMS = async (to, text) => {
    // console.log('sending sms ',to, text)
    let to = "91"+to; //obviously work only for Indian numbers
    await vonage.message.sendSms(from, to, text, (err, responseData) => {
        if (err) {
            console.log(err);
        } else {
            if (responseData.messages[0]['status'] === "0") {
                console.log("Message sent successfully.");
            } else {
                console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
            }
        }
    })
}
