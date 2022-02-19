const { isUndefined } = require('underscore');
exports.sendResponseV1 = (success, message = '', recordCount = 0, data = {}, reason = '', reply) => {
    if (success === true) {
        const response = {
            "success": success,
            "message": message,
            "recordCount": recordCount,
            "data": data,
            "reason": reason
        }
        reply.send(response)
    } else if (success === false) {
        const response = {
            "success": success,
            "message": message,
            "recordCount": recordCount,
            "data": data,
            "reason": reason
        }
        reply.status(400).send(response)
    }

}

//universal body payload checker
exports.validateFieldLoop = (body, itemArray) => {
    //validates empty string also
      if (body != null && body != '' && !isUndefined(body)) {
          let result = true
          for (let a = 0; a < itemArray.length; a++) {
              if (body[itemArray[a]] === null || body[itemArray[a]] === '' || body[itemArray[a]] === undefined) {
                  result = false;
              }
          }
          return result;
      } else {
          return false
      }
  }