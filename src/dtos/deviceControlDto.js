const { checkMissingParams }  = require('../utils/validation')
const { BadRequest } = require('../errors');

class deviceControlDTO {
    data;

    constructor(requestData) {
        const requireData = ['device_id', 'action_mode', 'action_status'];
        const errorMessage = checkMissingParams(requestData, requireData)
        
        if (errorMessage != null) {
            throw new BadRequest(errorMessage);
        }

        this.data = {
          device_id: requestData.device_id,
          action_mode: requestData.action_mode,
          action_status: requestData.action_status
        }
    }
}

module.exports = deviceControlDTO