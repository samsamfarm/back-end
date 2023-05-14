const { Repository } = require("./index");

class CommentRepository extends Repository {
  constructor() {
    super();
    this.table = "comments";
  }
  async newComment(info) {
    await this.db(this.table).insert({
      user_id: info.user_id,
      article_id: info.article_id,
      content: info.content
    });
  }
  async deleteComment(comment_id) {
    const result = await this.db(this.table).where("id", comment_id).update({
      deleted_at: new Date(),
    });

    return result;
  }
}
module.exports = CommentRepository;