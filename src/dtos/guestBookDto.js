const { BadRequest } = require("../errors");
const { checkMissingParams } = require("../utils/validation");

class CreateGuestBookDto {
  constructor(info) {
    const requiredData = ["user_id", "content", "writer"];
    const errorMessage = checkMissingParams(info, requiredData);

    if (errorMessage) {
      throw new BadRequest(errorMessage);
    }
    
    this.user_id = info.user_id;
    this.content = info.content;
    this.writer = info.writer;
  }
}

module.exports = { CreateGuestBookDto };