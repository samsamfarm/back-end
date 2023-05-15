const ArticleRepository = require('../repositories/articleRepository')

class ArticleService {
  constructor() {
    this.articleRepository = new ArticleRepository();
  }

  async newArticle(info) {
    await this.articleRepository.newArticle(info);
  }

  getAllArticle(page, perPage) {
    return this.articleRepository.getAllArticle(page, perPage);
  }

  getArticleWithComment(articleId) {
    return this.articleRepository.getArticleWithComment(articleId);
  }

  modifyArticle(articleId, modifyArticleDTO) {
    return this.articleRepository.modifyArticle(articleId, modifyArticleDTO);
  }

  countView(articleId) {
    return this.articleRepository.countView(articleId);
  }

  deleteArticle(articleId) {
    return this.articleRepository.deleteArticle();
  }
}

module.exports = ArticleService;