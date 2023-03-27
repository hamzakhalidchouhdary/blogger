const app = require('../../app/index');
const chai = require('chai');
const chaiHttp = require('chai-http');
const HTTP_STATUS = require('../../utils/constants/httpStatus');
const UserFixtures = require('../fixtures/user');
const USER_ROLES = require('../../utils/constants/userRoles');
const { generateJWT } = require('../../utils/common/auth');
const { faker } = require('@faker-js/faker');
const { expect } = require('chai');

chai.use(chaiHttp);
chai.should();
const request = chai.request;

describe('Manage User', function () {
  describe('Admin User Role', function () {
    before(async function () {
      this.user = await UserFixtures.createUser({ role: USER_ROLES.ADMIN });
      this.token = await generateJWT({ userId: this.user.id });
    });
    beforeEach(function(){
      this.payload = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: faker.internet.userName(),
        hashedPassword: faker.internet.password()
      };
    });
    it('should create new user profile', async function () {
      const resp = await request(app)
        .post('/api/v1/user/manage/new')
        .set({ Authorization: `Bearer ${this.token}` })
        .send(this.payload);
      resp.status.should.equal(HTTP_STATUS.CREATED);
      resp.body.should.be.an('object').that.is.not.empty;
      resp.body.username.should.equal(this.payload.username);
      resp.body.firstName.should.equal(this.payload.firstName);
      resp.body.lastName.should.equal(this.payload.lastName);
      resp.body.role.should.equal(USER_ROLES.MANAGER);
      const newlyCreatedUser = await UserFixtures.getLatestCreatedUser();
      newlyCreatedUser.username.should.equal(this.payload.username);
      newlyCreatedUser.firstName.should.equal(this.payload.firstName);
      newlyCreatedUser.lastName.should.equal(this.payload.lastName);
      newlyCreatedUser.role.should.equal(USER_ROLES.MANAGER);
    });
    it('should not allow to create new user profile if firstName is empty', async function () {
      const userCountBefore = await UserFixtures.getUserCount();
      this.payload.firstName = '';
      const resp = await request(app)
        .post('/api/v1/user/manage/new')
        .set({ Authorization: `Bearer ${this.token}` })
        .send(this.payload);
      resp.status.should.equal(HTTP_STATUS.INTERNAL_ERROR);
      resp.body.should.be.an('object').that.is.empty;
      const userCountAfter = await UserFixtures.getUserCount();
      userCountBefore.should.equal(userCountAfter);
    });
    it('should allow admin to update user profile', async function () {
      const newFirstName = faker.name.firstName();
      const user = await UserFixtures.createUser(this.payload);
      const resp = await request(app)
        .put(`/api/v1/user/manage/${user.id}`)
        .set({ Authorization: `Bearer ${this.token}` })
        .send({firstName: newFirstName});
      resp.status.should.equal(HTTP_STATUS.OK);
      const updatedUserDetails = await UserFixtures.findUserById(user.id);
      updatedUserDetails.firstName.should.equal(newFirstName);
      updatedUserDetails.lastName.should.equal(this.payload.lastName);
      updatedUserDetails.username.should.equal(this.payload.username);
    });
    it('should allow to delete user profile', async function () {
      const user = await UserFixtures.createUser(this.payload);
      const userCountBefore = await UserFixtures.getUserCount();
      const resp = await request(app)
        .delete(`/api/v1/user/manage/${user.id}`)
        .set({ Authorization: `Bearer ${this.token}` })
        .send({});
      const userCountAfter = await UserFixtures.getUserCount();
      const deletedUser = await UserFixtures.findUserById(user.id);
      resp.status.should.equal(HTTP_STATUS.OK);
      resp.body.should.empty;
      userCountBefore.should.equal(userCountAfter + 1);
      expect(deletedUser).to.be.null;
    });
    it('should allow to get user profile', async function () {
      const resp = await request(app)
        .get('/api/v1/user/manage/1')
        .set({ Authorization: `Bearer ${this.token}` })
        .send({});
      resp.status.should.equal(HTTP_STATUS.OK);
      resp.body.should.empty;
    });
  });
  describe('Manager User Role', function () {
    before(async function () {
      this.user = await UserFixtures.createUser({ role: USER_ROLES.MANAGER });
      this.token = await generateJWT({ userId: this.user.id });
    });
    it('should allow to create new user profile', async function () {
      const resp = await request(app)
        .post('/api/v1/user/manage/new')
        .set({ Authorization: `Bearer ${this.token}` })
        .send({});
      resp.status.should.equal(HTTP_STATUS.UNAUTHORIZED);
      resp.body.should.empty;
    });
    it('should allow to update user profile', async function () {
      const resp = await request(app)
        .put('/api/v1/user/manage/1')
        .set({ Authorization: `Bearer ${this.token}` })
        .send({});
      resp.status.should.equal(HTTP_STATUS.UNAUTHORIZED);
      resp.body.should.empty;
    });
    it('should allow to delete user profile', async function () {
      const user = await UserFixtures.createUser(this.payload);
      const userCountBefore = await UserFixtures.getUserCount();
      const resp = await request(app)
        .delete(`/api/v1/user/manage/${user.id}`)
        .set({ Authorization: `Bearer ${this.token}` })
        .send({});
      const userCountAfter = await UserFixtures.getUserCount();
      const deletedUser = await UserFixtures.findUserById(user.id);
      resp.status.should.equal(HTTP_STATUS.UNAUTHORIZED);
      resp.body.should.empty;
      userCountBefore.should.equal(userCountAfter);
      expect(deletedUser).to.be.a('object').that.is.not.empty;
    });
    it('should allow to get user profile', async function () {
      const resp = await request(app)
        .get('/api/v1/user/manage/1')
        .set({ Authorization: `Bearer ${this.token}` })
        .send({});
      resp.status.should.equal(HTTP_STATUS.OK);
      resp.body.should.empty;
    });
  });
  describe('Reader User Role', function () {
    before(async function () {
      this.user = await UserFixtures.createUser({ role: USER_ROLES.READER });
      this.token = await generateJWT({ userId: this.user.id });
    });
    it('should allow to create new user profile', async function () {
      const resp = await request(app)
        .post('/api/v1/user/manage/new')
        .set({ Authorization: `Bearer ${this.token}` })
        .send({});
      resp.status.should.equal(HTTP_STATUS.UNAUTHORIZED);
      resp.body.should.empty;
    });
    it('should allow to update user profile', async function () {
      const resp = await request(app)
        .put('/api/v1/user/manage/1')
        .set({ Authorization: `Bearer ${this.token}` })
        .send({});
      resp.status.should.equal(HTTP_STATUS.UNAUTHORIZED);
      resp.body.should.empty;
    });
    it('should allow to delete user profile', async function () {
      const user = await UserFixtures.createUser(this.payload);
      const userCountBefore = await UserFixtures.getUserCount();
      const resp = await request(app)
        .delete(`/api/v1/user/manage/${user.id}`)
        .set({ Authorization: `Bearer ${this.token}` })
        .send({});
      const userCountAfter = await UserFixtures.getUserCount();
      const deletedUser = await UserFixtures.findUserById(user.id);
      resp.status.should.equal(HTTP_STATUS.UNAUTHORIZED);
      resp.body.should.empty;
      userCountBefore.should.equal(userCountAfter);
      expect(deletedUser).to.be.a('object').that.is.not.empty;
    });
    it('should allow to get user profile', async function () {
      const resp = await request(app)
        .get('/api/v1/user/manage/1')
        .set({ Authorization: `Bearer ${this.token}` })
        .send({});
      resp.status.should.equal(HTTP_STATUS.OK);
      resp.body.should.empty;
    });
  });
});