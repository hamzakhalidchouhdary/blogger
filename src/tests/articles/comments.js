const app = require('../../app/index');
const chai = require('chai');
const chaiHttp = require('chai-http');
const HTTP_STATUS = require('../../utils/constants/httpStatus');
const UserFixtures = require('../fixtures/user');
const ArticleFixtures = require('../fixtures/article');
const CommentFixtures = require('../fixtures/comment');
const USER_ROLES = require('../../utils/constants/userRoles');
const { expect } = require('chai');

chai.use(chaiHttp);
chai.should();
const request = chai.request;

describe('Article Comments', function () {
  describe('Admin Role', function () {
    before(async function () {
      this.user = await UserFixtures.createUser({ role: USER_ROLES.ADMIN });
      this.token = await UserFixtures.getUserToken(this.user.id);
      this.article = await ArticleFixtures.createArticle({}, this.user.id);
    });
    it('should allow admin to add comments on article', async function () {
      const payload = {
        content: 'test comment'
      }
      const articleCommentCountBefore = await CommentFixtures.getCommentCount(this.article.id);
      const resp = await request(app)
        .post(`/api/v1/article/${this.article.id}/comment`)
        .set({ Authorization: `Bearer ${this.token}` })
        .send(payload);
      resp.status.should.equal(HTTP_STATUS.CREATED);
      const articleCommentCountAfter = await CommentFixtures.getCommentCount(this.article.id);
      expect(articleCommentCountBefore).to.be.equal(articleCommentCountAfter - 1);

    });
    it('should allow admin to edit comments on article', async function () {
      const comment = await CommentFixtures.createComment('', this.article.id, this.user.id);
      const payload = {content: 'updated comment'};
      const resp = await request(app)
        .put(`/api/v1/article/${this.article.id}/comment/${comment.id}`)
        .set({ Authorization: `Bearer ${this.token}` })
        .send(payload);
      resp.status.should.equal(HTTP_STATUS.OK);
      const updatedComment = await CommentFixtures.getCommentById(comment.id);
      expect(updatedComment.content).to.equal(payload.content);
    });
    it('should not allow admin to edit other user`s comments on article', async function () {
      const tempUser = await UserFixtures.createUser();
      const comment = await CommentFixtures.createComment('', this.article.id, tempUser.id);
      const payload = {content: 'updated comment'};
      const resp = await request(app)
        .put(`/api/v1/article/${this.article.id}/comment/${comment.id}`)
        .set({ Authorization: `Bearer ${this.token}` })
        .send(payload);
      resp.status.should.equal(HTTP_STATUS.NOT_ALLOWED);
      const updatedComment = await CommentFixtures.getCommentById(comment.id);
      expect(updatedComment.content).to.equal(comment.content);
    });
    it('should allow admin to delete comments on article', async function () {
      const resp = await request(app)
        .delete('/api/v1/article/1/comment')
        .set({ Authorization: `Bearer ${this.token}` })
        .send({});
      resp.status.should.equal(HTTP_STATUS.OK);
      resp.body.should.empty;
    });
    it('should allow admin to view comments on article', async function () {
      const resp = await request(app)
        .get('/api/v1/article/1/comment')
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
      this.article = await ArticleFixtures.createArticle({}, this.user.id);
    });
    it('should allow manager to add comments on article', async function () {
      const payload = {
        content: 'test comment'
      }
      const articleCommentCountBefore = await CommentFixtures.getCommentCount(this.article.id);
      const resp = await request(app)
        .post(`/api/v1/article/${this.article.id}/comment`)
        .set({ Authorization: `Bearer ${this.token}` })
        .send(payload);
      resp.status.should.equal(HTTP_STATUS.CREATED);
      const articleCommentCountAfter = await CommentFixtures.getCommentCount(this.article.id);
      expect(articleCommentCountBefore).to.be.equal(articleCommentCountAfter - 1);
    });
    it('should allow manager to edit comments on article', async function () {
      const comment = await CommentFixtures.createComment('', this.article.id, this.user.id);
      const payload = {content: 'updated comment'};
      const resp = await request(app)
        .put(`/api/v1/article/${this.article.id}/comment/${comment.id}`)
        .set({ Authorization: `Bearer ${this.token}` })
        .send(payload);
      resp.status.should.equal(HTTP_STATUS.OK);
      const updatedComment = await CommentFixtures.getCommentById(comment.id);
      expect(updatedComment.content).to.equal(payload.content);
    });
    it('should not allow manager to edit other user`s comments on article', async function () {
      const tempUser = await UserFixtures.createUser();
      const comment = await CommentFixtures.createComment('', this.article.id, tempUser.id);
      const payload = {content: 'updated comment'};
      const resp = await request(app)
        .put(`/api/v1/article/${this.article.id}/comment/${comment.id}`)
        .set({ Authorization: `Bearer ${this.token}` })
        .send(payload);
      resp.status.should.equal(HTTP_STATUS.NOT_ALLOWED);
      const updatedComment = await CommentFixtures.getCommentById(comment.id);
      expect(updatedComment.content).to.equal(comment.content);
    });
    it('should allow manager to delete comments on article', async function () {
      const resp = await request(app)
        .delete('/api/v1/article/1/comment')
        .set({ Authorization: `Bearer ${this.token}` })
        .send({});
      resp.status.should.equal(HTTP_STATUS.OK);
      resp.body.should.empty;
    });
    it('should allow manager to view comments on article', async function () {
      const resp = await request(app)
        .get('/api/v1/article/1/comment')
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
      this.article = await ArticleFixtures.createArticle({}, this.user.id);
    });
    it('should allow reader to add comments on article', async function () {
      const payload = {
        content: 'test comment'
      }
      const articleCommentCountBefore = await CommentFixtures.getCommentCount(this.article.id);
      const resp = await request(app)
        .post(`/api/v1/article/${this.article.id}/comment`)
        .set({ Authorization: `Bearer ${this.token}` })
        .send(payload);
      resp.status.should.equal(HTTP_STATUS.CREATED);
      const articleCommentCountAfter = await CommentFixtures.getCommentCount(this.article.id);
      expect(articleCommentCountBefore).to.be.equal(articleCommentCountAfter - 1);
    });
    it('should allow reader to edit comments on article', async function () {
      const comment = await CommentFixtures.createComment('', this.article.id, this.user.id);
      const payload = {content: 'updated comment'};
      const resp = await request(app)
        .put(`/api/v1/article/${this.article.id}/comment/${comment.id}`)
        .set({ Authorization: `Bearer ${this.token}` })
        .send(payload);
      resp.status.should.equal(HTTP_STATUS.OK);
      const updatedComment = await CommentFixtures.getCommentById(comment.id);
      expect(updatedComment.content).to.equal(payload.content);
    });
    it('should not allow reader to edit other user`s comments on article', async function () {
      const tempUser = await UserFixtures.createUser();
      const comment = await CommentFixtures.createComment('', this.article.id, tempUser.id);
      const payload = {content: 'updated comment'};
      const resp = await request(app)
        .put(`/api/v1/article/${this.article.id}/comment/${comment.id}`)
        .set({ Authorization: `Bearer ${this.token}` })
        .send(payload);
      resp.status.should.equal(HTTP_STATUS.NOT_ALLOWED);
      const updatedComment = await CommentFixtures.getCommentById(comment.id);
      expect(updatedComment.content).to.equal(comment.content);
    });
    it('should allow reader to delete comments on article', async function () {
      const resp = await request(app)
        .delete('/api/v1/article/1/comment')
        .set({ Authorization: `Bearer ${this.token}` })
        .send({});
      resp.status.should.equal(HTTP_STATUS.OK);
      resp.body.should.empty;
    });
    it('should allow reader to view comments on article', async function () {
      const resp = await request(app)
        .get('/api/v1/article/1/comment')
        .set({ Authorization: `Bearer ${this.token}` })
        .send({});
      resp.status.should.equal(HTTP_STATUS.OK);
      resp.body.should.empty;
    });
  });
});