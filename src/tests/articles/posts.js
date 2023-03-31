const app = require('../../app/index');
const chai = require('chai');
const chaiHttp = require('chai-http');
const HTTP_STATUS = require('../../utils/constants/httpStatus');
const UserFixtures = require('../fixtures/user');
const USER_ROLES = require('../../utils/constants/userRoles');
const ArticleFixtures = require('../fixtures/article');
const { expect } = require('chai');
const ArticleModel = require('../../app/models').Article;

chai.use(chaiHttp);
chai.should();
const request = chai.request;

describe('Article Posts', function () {
  before(function () {
    this.payload = {
      title: 'test article',
      content: 'this is test article'
    }
  });
  describe('Admin Role', function () {
    before(async function () {
      this.user = await UserFixtures.createUser({ role: USER_ROLES.ADMIN });
      this.token = await UserFixtures.getUserToken(this.user.id);
    });
    it('should allow admin to create new post', async function () {
      const resp = await request(app)
        .post('/api/v1/article')
        .set({ Authorization: `Bearer ${this.token}` })
        .send(this.payload);
      resp.status.should.equal(HTTP_STATUS.CREATED);
      const newArticle = await ArticleModel.findLatest();
      newArticle.title.should.equal(this.payload.title);
      newArticle.content.should.equal(this.payload.content);
      newArticle.createdBy.should.equal(this.user.id);
      newArticle.updatedBy.should.equal(this.user.id);
    });
    it('should allow admin to edit a post', async function () {
      const newArticle = await ArticleFixtures.createArticle({}, this.user.id);
      const payload = { title: 'update title' };
      const resp = await request(app)
        .put(`/api/v1/article/${newArticle.id}`)
        .set({ Authorization: `Bearer ${this.token}` })
        .send(payload);
      resp.status.should.equal(HTTP_STATUS.OK);
      const updatedArticle = await ArticleFixtures.findArticleById(newArticle.id);
      expect(updatedArticle.title).to.be.equal(payload.title);
    });
    it('should allow admin to delete a post', async function () {
      const newArticle = await ArticleFixtures.createArticle({}, this.user.id);
      const articleCountBefore = await ArticleFixtures.getArticleCount();
      const resp = await request(app)
        .delete(`/api/v1/article/${newArticle.id}`)
        .set({ Authorization: `Bearer ${this.token}` })
        .send({});
      resp.status.should.equal(HTTP_STATUS.OK);
      const articleCountAfter = await ArticleFixtures.getArticleCount();
      expect(articleCountBefore).to.equal(articleCountAfter + 1);
      resp.body.should.empty;
    });
    it('should allow admin to fetch all post', async function () {
      const resp = await request(app)
        .get('/api/v1/article')
        .set({ Authorization: `Bearer ${this.token}` })
        .send({});
      resp.status.should.equal(HTTP_STATUS.OK);
      resp.body.should.empty;
    });
    it('should allow admin to fetch post by id', async function () {
      const resp = await request(app)
        .get('/api/v1/article/1')
        .set({ Authorization: `Bearer ${this.token}` })
        .send({});
      resp.status.should.equal(HTTP_STATUS.OK);
      resp.body.should.empty;
    });
  });
  describe('Manager Role', function () {
    before(async function () {
      this.user = await UserFixtures.createUser({ role: USER_ROLES.MANAGER });
      this.token = await UserFixtures.getUserToken(this.user.id);
    });
    it('should allow manager to create new post', async function () {
      const resp = await request(app)
        .post('/api/v1/article')
        .set({ Authorization: `Bearer ${this.token}` })
        .send(this.payload);
      resp.status.should.equal(HTTP_STATUS.CREATED);
      const newArticle = await ArticleFixtures.getLatestCreatedArticle();
      expect(newArticle.id).to.be.equal(resp.body.id);
      expect(newArticle.title).to.be.equal(this.payload.title);
      expect(newArticle.createdBy).to.be.equal(this.user.id);

    });
    it('should allow manager to edit a post', async function () {
      const resp = await request(app)
        .put('/api/v1/article/1')
        .set({ Authorization: `Bearer ${this.token}` })
        .send({});
      resp.status.should.equal(HTTP_STATUS.OK);
      resp.body.should.empty;
    });
    it('should not allow manager to delete a post', async function () {
      const resp = await request(app)
        .delete('/api/v1/article/1')
        .set({ Authorization: `Bearer ${this.token}` })
        .send({});
      resp.status.should.equal(HTTP_STATUS.UNAUTHORIZED);
      resp.body.should.empty;
    });
    it('should allow manager to fetch all post', async function () {
      const resp = await request(app)
        .get('/api/v1/article')
        .set({ Authorization: `Bearer ${this.token}` })
        .send({});
      resp.status.should.equal(HTTP_STATUS.OK);
      resp.body.should.empty;
    });
    it('should allow manager to fetch post by id', async function () {
      const resp = await request(app)
        .get('/api/v1/article/1')
        .set({ Authorization: `Bearer ${this.token}` })
        .send({});
      resp.status.should.equal(HTTP_STATUS.OK);
      resp.body.should.empty;
    });
  });
  describe('Reader Role', function () {
    before(async function () {
      this.user = await UserFixtures.createUser({ role: USER_ROLES.READER });
      this.token = await UserFixtures.getUserToken(this.user.id);
    });
    it('should not allow reader to create new post', async function () {
      const resp = await request(app)
        .post('/api/v1/article')
        .set({ Authorization: `Bearer ${this.token}` })
        .send({});
      resp.status.should.equal(HTTP_STATUS.UNAUTHORIZED);
      resp.body.should.empty;
    });
    it('should not allow reader to edit a post', async function () {
      const resp = await request(app)
        .put('/api/v1/article/1')
        .set({ Authorization: `Bearer ${this.token}` })
        .send({});
      resp.status.should.equal(HTTP_STATUS.UNAUTHORIZED);
      resp.body.should.empty;
    });
    it('should not allow reader to delete a post', async function () {
      const resp = await request(app)
        .delete('/api/v1/article/1s')
        .set({ Authorization: `Bearer ${this.token}` })
        .send({});
      resp.status.should.equal(HTTP_STATUS.UNAUTHORIZED);
      resp.body.should.empty;
    });
    it('should allow reader to fetch all post', async function () {
      const resp = await request(app)
        .get('/api/v1/article')
        .set({ Authorization: `Bearer ${this.token}` })
        .send({});
      resp.status.should.equal(HTTP_STATUS.OK);
      resp.body.should.empty;
    });
    it('should allow reader to fetch post by id', async function () {
      const resp = await request(app)
        .get('/api/v1/article/1')
        .set({ Authorization: `Bearer ${this.token}` })
        .send({});
      resp.status.should.equal(HTTP_STATUS.OK);
      resp.body.should.empty;
    });
  });
});