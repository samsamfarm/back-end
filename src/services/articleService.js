const ArticleRepositoy = require('../repositories/articleRepository')

class ArticleService {
  constructor() {
    this.articleRepositoy = new ArticleRepositoy();
  }

  async newArtcle(info) {
    await articleRepositoy.newArtcle(info);
  }

}

module.exports = ArticleService;