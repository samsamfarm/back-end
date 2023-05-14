const { BadRequest } = require("../errors");
const { checkMissingParams } = require("../utils/validation");

class creatArticleDTO {
  user_id;
  title;
  content;
  constructor(info) {
    const requireData = ["user_id", "title", "content"];
    const errormessage = checkMissingParams(info, requireData);

    if (errormessage) {
      throw new BadRequest(errormessage);
    }
    userId = user_id;
    title;
    content;
  }
}

module.exports = {
  creatArticleDTO,
};