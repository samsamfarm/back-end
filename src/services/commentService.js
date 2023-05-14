const CommentRepository = require('../repositories/commentRepository')

class CommentService {
  constructor() {
    this.commentRepository = new CommentRepository();
  }

  newComment(info) {
    return this.commentRepository.newComment(info);
  }
  deleteComment(commentId) {
    return this.commentRepository.deleteComment(commentId);
  }
}

module.exports = CommentService;