const { Repository } = require("./index");

class ArticleRepositoy extends Repository {
  constructor() {
    super();
    this.table = "article";
  }
async newArtcle(info) {
  await this.db(this.table).insert({
    user_id: info.userId,
    title: info.title,
    content: info.content
  });
}

}

module.exports = ArticleRepositoy;