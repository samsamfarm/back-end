const ArticleRepository = require('../repositories/articleRepository')

class ArticleService {
  constructor() {
    this.articleRepository = new ArticleRepository();
  }

  async newArtcle(info) {
    await this.articleRepository.newArtcle(info);
  }

  getAllArticle() {
    return this.articleRepository.getAllArticle();
  }

  getArticleWithComment(articleId) {
    return this.articleRepository.getArticleWithComment(articleId);
  }

  modifyArticle(articleId, modifyArticleDTO) {
    return this.articleRepository.modifyArticle(articleId, modifyArticleDTO);
  }
  deleteArticle(articleId) {
    return this.articleRepository.deleteArticle();
  }
}

module.exports = ArticleService;