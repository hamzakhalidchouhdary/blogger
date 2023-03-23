const app = require('../../app/index');
const chai = require('chai');
const chaiHttp = require('chai-http');
const HTTP_STATUS = require('../../utils/constants/httpStatus');
const UserFixtures = require('../fixtures/user');
const USER_ROLES = require('../../utils/constants/userRoles');

chai.use(chaiHttp);
chai.should();
const request = chai.request;

describe('Article Comments', function () {
  describe('Admin Role', function () {
    before(async function(){
      this.user = await UserFixtures.createUser({role: USER_ROLES.ADMIN});
      this.token = await UserFixtures.getUserToken(this.user.id);
    });
    it('should allow admin to add comments on article', async function () {
      const resp = await request(app)
        .post('/api/v1/article/1/comment')
        .set({ Authorization: `Bearer ${this.token}` })
        .send({});
      resp.status.should.equal(HTTP_STATUS.CREATED);
      resp.body.should.empty;
    });
    it('should allow admin to edit comments on article', async function () {
      const resp = await request(app)
        .put('/api/v1/article/1/comment')
        .set({ Authorization: `Bearer ${this.token}` })
        .send({});
      resp.status.should.equal(HTTP_STATUS.OK);
      resp.body.should.empty;
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
    before(async function(){
      this.user = await UserFixtures.createUser({role: USER_ROLES.MANAGER});
      this.token = await UserFixtures.getUserToken(this.user.id);
    });
    it('should allow manager to add comments on article', async function () {
      const resp = await request(app)
        .post('/api/v1/article/1/comment')
        .set({ Authorization: `Bearer ${this.token}` })
        .send({});
      resp.status.should.equal(HTTP_STATUS.CREATED);
      resp.body.should.empty;
    });
    it('should allow manager to edit comments on article', async function () {
      const resp = await request(app)
        .put('/api/v1/article/1/comment')
        .set({ Authorization: `Bearer ${this.token}` })
        .send({});
      resp.status.should.equal(HTTP_STATUS.OK);
      resp.body.should.empty;
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
    before(async function(){
      this.user = await UserFixtures.createUser({role: USER_ROLES.READER});
      this.token = await UserFixtures.getUserToken(this.user.id);
    });
    it('should allow reader to add comments on article', async function () {
      const resp = await request(app)
        .post('/api/v1/article/1/comment')
        .set({ Authorization: `Bearer ${this.token}` })
        .send({});
      resp.status.should.equal(HTTP_STATUS.CREATED);
      resp.body.should.empty;
    });
    it('should allow reader to edit comments on article', async function () {
      const resp = await request(app)
        .put('/api/v1/article/1/comment')
        .set({ Authorization: `Bearer ${this.token}` })
        .send({});
      resp.status.should.equal(HTTP_STATUS.OK);
      resp.body.should.empty;
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