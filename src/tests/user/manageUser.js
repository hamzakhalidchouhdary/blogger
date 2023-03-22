const app = require('../../app/index');
const chai = require('chai');
const chaiHttp = require('chai-http');
const HTTP_STATUS = require('../../utils/constants/httpStatus');
const UserFixtures = require('../fixtures/user');
const USER_ROLES = require('../../utils/constants/userRoles');
const { generateJWT } = require('../../utils/common/auth');

chai.use(chaiHttp);
chai.should();
const request = chai.request;

describe.only('Manage User', function() {
  describe('Admin User Role', function() {
    before(async function(){
      this.user = await UserFixtures.createUser({role: USER_ROLES.ADMIN});
      this.token = await generateJWT({userId: this.user.id});
    });
    it('should allow to create new user profile', async function() {
      const resp = await request(app)
      .post('/api/v1/user/manage/new')
      .set({ Authorization: `Bearer ${this.token}` })
      .send({});
      resp.status.should.equal(HTTP_STATUS.CREATED);
      resp.body.should.empty;
    });
    it('should allow to update user profile', async function() {
      const resp = await request(app)
      .put('/api/v1/user/manage/1')
      .set({ Authorization: `Bearer ${this.token}` })
      .send({});
      resp.status.should.equal(HTTP_STATUS.OK);
      resp.body.should.empty;
    });
    it('should allow to delete user profile', async function() {
      const resp = await request(app)
      .delete('/api/v1/user/manage/1')
      .set({ Authorization: `Bearer ${this.token}` })
      .send({});
      resp.status.should.equal(HTTP_STATUS.OK);
      resp.body.should.empty;
    });
    it('should allow to get user profile', async function() {
      const resp = await request(app)
      .get('/api/v1/user/manage/1')
      .set({ Authorization: `Bearer ${this.token}` })
      .send({});
      resp.status.should.equal(HTTP_STATUS.OK);
      resp.body.should.empty;
    });
  });
  describe('Manager User Role', function() {
    before(async function(){
      this.user = await UserFixtures.createUser({role: USER_ROLES.MANAGER});
      this.token = await generateJWT({userId: this.user.id});
    });
    it('should allow to create new user profile', async function() {
      const resp = await request(app)
      .post('/api/v1/user/manage/new')
      .set({ Authorization: `Bearer ${this.token}` })
      .send({});
      resp.status.should.equal(HTTP_STATUS.UNAUTHORIZED);
      resp.body.should.empty;
    });
    it('should allow to update user profile', async function() {
      const resp = await request(app)
      .put('/api/v1/user/manage/1')
      .set({ Authorization: `Bearer ${this.token}` })
      .send({});
      resp.status.should.equal(HTTP_STATUS.UNAUTHORIZED);
      resp.body.should.empty;
    });
    it('should allow to delete user profile', async function() {
      const resp = await request(app)
      .delete('/api/v1/user/manage/1')
      .set({ Authorization: `Bearer ${this.token}` })
      .send({});
      resp.status.should.equal(HTTP_STATUS.UNAUTHORIZED);
      resp.body.should.empty;
    });
    it('should allow to get user profile', async function() {
      const resp = await request(app)
      .get('/api/v1/user/manage/1')
      .set({ Authorization: `Bearer ${this.token}` })
      .send({});
      resp.status.should.equal(HTTP_STATUS.OK);
      resp.body.should.empty;
    });
  });
  describe('Reader User Role', function() {
    before(async function(){
      this.user = await UserFixtures.createUser({role: USER_ROLES.READER});
      this.token = await generateJWT({userId: this.user.id});
    });
    it('should allow to create new user profile', async function() {
      const resp = await request(app)
      .post('/api/v1/user/manage/new')
      .set({ Authorization: `Bearer ${this.token}` })
      .send({});
      resp.status.should.equal(HTTP_STATUS.UNAUTHORIZED);
      resp.body.should.empty;
    });
    it('should allow to update user profile', async function() {
      const resp = await request(app)
      .put('/api/v1/user/manage/1')
      .set({ Authorization: `Bearer ${this.token}` })
      .send({});
      resp.status.should.equal(HTTP_STATUS.UNAUTHORIZED);
      resp.body.should.empty;
    });
    it('should allow to delete user profile', async function() {
      const resp = await request(app)
      .delete('/api/v1/user/manage/1')
      .set({ Authorization: `Bearer ${this.token}` })
      .send({});
      resp.status.should.equal(HTTP_STATUS.UNAUTHORIZED);
      resp.body.should.empty;
    });
    it('should allow to get user profile', async function() {
      const resp = await request(app)
      .get('/api/v1/user/manage/1')
      .set({ Authorization: `Bearer ${this.token}` })
      .send({});
      resp.status.should.equal(HTTP_STATUS.OK);
      resp.body.should.empty;
    });
  });
});