const { BadRequest } = require("../errors");
const { checkMissingParams } = require("../utils/validation");

class CommentDTO {
  constructor(info) {
    const requiredData = ["user_id", "article_id", "content"];
    const errorMessage = checkMissingParams(info, requiredData);
    
     if (errorMessage) {
      throw new BadRequest(errorMessage);
    }

    this.user_id = info.user_id;
    this.article_id = info.article_id;
    this.content = info.content;
  }
}

module.exports = {
  CommentDTO,
};
