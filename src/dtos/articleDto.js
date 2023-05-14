const { BadRequest } = require("../errors");
const { checkMissingParams } = require("../utils/validation");
class CreateArticleDTO {
  constructor(info) {
    const requiredData = ["user_id", "title", "content"];
    const errorMessage = checkMissingParams(info, requiredData);

    if (errorMessage) {
      throw new BadRequest(errorMessage);
    }

    this.user_id = info.user_id;
    this.title = info.title;
    this.content = info.content;
  }
}

class ModifyArticleDTO {
  constructor(info) {
    const requiredData = ["title", "content"];
    const errorMessage = checkMissingParams(info, requiredData);

    if (errorMessage) {
      throw new BadRequest(errorMessage);
    }

    this.title = info.title;
    this.content = info.content;
  }
}

module.exports = {
  CreateArticleDTO,
  ModifyArticleDTO,
};
