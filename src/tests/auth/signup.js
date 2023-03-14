const app = require('../../app/index');
const chai = require('chai');
const chaiHttp = require('chai-http');
const HTTP_STATUS = require('../../app/utils/constants/httpStatus');
const UserModel = require('../../app/models').User;
const { faker } = require('@faker-js/faker');

chai.use(chaiHttp);
chai.should();
const request = chai.request;

describe('auth', function() {
  describe('Signup', function() {
    describe('create new user', function() {
      beforeEach(async function() {
        this.payload = {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          username: faker.internet.userName(),
          hashedPassword: faker.internet.password()
        };
      });
      it('should create user with admin role', async function() {
        this.payload.role = 'admin';
        const resp = await request(app)
          .post('/api/v1/auth/signup')
          .send(this.payload);
        resp.status.should.equal(HTTP_STATUS.CREATED);
        resp.body.should.have.key('id');
        const latestUser = await UserModel.findLatest();
        resp.body.id.should.equal(latestUser.id);
        latestUser.firstName.should.equal(this.payload.firstName);
        latestUser.lastName.should.equal(this.payload.lastName);
        latestUser.username.should.equal(this.payload.username);
        latestUser.role.should.equal(this.payload.role);
      });
      it('should create user with manager role', async function() {
        this.payload.role = 'manager';
        const resp = await request(app)
          .post('/api/v1/auth/signup')
          .send(this.payload);
        resp.status.should.equal(HTTP_STATUS.CREATED);
        resp.body.should.have.key('id');
        const latestUser = await UserModel.findLatest();
        resp.body.id.should.equal(latestUser.id);
        latestUser.firstName.should.equal(this.payload.firstName);
        latestUser.lastName.should.equal(this.payload.lastName);
        latestUser.username.should.equal(this.payload.username);
        latestUser.role.should.equal(this.payload.role);
      });
      it('should create user with reader role', async function() {
        this.payload.role = 'reader';
        const resp = await request(app)
          .post('/api/v1/auth/signup')
          .send(this.payload);
        resp.status.should.equal(HTTP_STATUS.CREATED);
        resp.body.should.have.key('id');
        const latestUser = await UserModel.findLatest();
        resp.body.id.should.equal(latestUser.id);
        latestUser.firstName.should.equal(this.payload.firstName);
        latestUser.lastName.should.equal(this.payload.lastName);
        latestUser.username.should.equal(this.payload.username);
        latestUser.role.should.equal(this.payload.role);
      });
      it('should create user with manager role by default', async function() {
        const resp = await request(app)
          .post('/api/v1/auth/signup')
          .send(this.payload);
        resp.status.should.equal(HTTP_STATUS.CREATED);
        resp.body.should.have.key('id');
        const latestUser = await UserModel.findLatest();
        resp.body.id.should.equal(latestUser.id);
        latestUser.firstName.should.equal(this.payload.firstName);
        latestUser.lastName.should.equal(this.payload.lastName);
        latestUser.username.should.equal(this.payload.username);
        latestUser.role.should.equal('manager');
      });
      it('should not create user if first is empty', async function() {
        const userCountBefore = await UserModel.count();
        this.payload.firstName = '';
        const resp = await request(app)
          .post('/api/v1/auth/signup')
          .send(this.payload);
        resp.status.should.equal(HTTP_STATUS.INTERNAL_ERROR);
        const userCountAfter = await UserModel.count();
        userCountBefore.should.equal(userCountAfter);
      });
      it('should not create user if first is null', async function() {
        const userCountBefore = await UserModel.count();
        this.payload.firstName = null;
        const resp = await request(app)
          .post('/api/v1/auth/signup')
          .send(this.payload);
        resp.status.should.equal(HTTP_STATUS.INTERNAL_ERROR);
        const userCountAfter = await UserModel.count();
        userCountBefore.should.equal(userCountAfter);
      });
      it('should not create user if first is undefined', async function() {
        const userCountBefore = await UserModel.count();
        delete this.payload.firstName;
        const resp = await request(app)
          .post('/api/v1/auth/signup')
          .send(this.payload);
        resp.status.should.equal(HTTP_STATUS.INTERNAL_ERROR);
        const userCountAfter = await UserModel.count();
        userCountBefore.should.equal(userCountAfter);
      });
      it('should not create user if last name is empty', async function() {
        const userCountBefore = await UserModel.count();
        this.payload.lastName = '';
        const resp = await request(app)
          .post('/api/v1/auth/signup')
          .send(this.payload);
        resp.status.should.equal(HTTP_STATUS.INTERNAL_ERROR);
        const userCountAfter = await UserModel.count();
        userCountBefore.should.equal(userCountAfter);
      });
      it('should not create user if last name is null', async function() {
        const userCountBefore = await UserModel.count();
        this.payload.lastName = null;
        const resp = await request(app)
          .post('/api/v1/auth/signup')
          .send(this.payload);
        resp.status.should.equal(HTTP_STATUS.INTERNAL_ERROR);
        const userCountAfter = await UserModel.count();
        userCountBefore.should.equal(userCountAfter);
      });
      it('should not create user if last name is undefined', async function() {
        const userCountBefore = await UserModel.count();
        delete this.payload.lastName;
        const resp = await request(app)
          .post('/api/v1/auth/signup')
          .send(this.payload);
        resp.status.should.equal(HTTP_STATUS.INTERNAL_ERROR);
        const userCountAfter = await UserModel.count();
        userCountBefore.should.equal(userCountAfter);
      });
      it('should not create user if username is empty', async function() {
        const userCountBefore = await UserModel.count();
        this.payload.username = '';
        const resp = await request(app)
          .post('/api/v1/auth/signup')
          .send(this.payload);
        resp.status.should.equal(HTTP_STATUS.INTERNAL_ERROR);
        const userCountAfter = await UserModel.count();
        userCountBefore.should.equal(userCountAfter);
      });
      it('should not create user if username is null', async function() {
        const userCountBefore = await UserModel.count();
        this.payload.username = null;
        const resp = await request(app)
          .post('/api/v1/auth/signup')
          .send(this.payload);
        resp.status.should.equal(HTTP_STATUS.INTERNAL_ERROR);
        const userCountAfter = await UserModel.count();
        userCountBefore.should.equal(userCountAfter);
      });
      it('should not create user if username is undefined', async function() {
        const userCountBefore = await UserModel.count();
        delete this.payload.username;
        const resp = await request(app)
          .post('/api/v1/auth/signup')
          .send(this.payload);
        resp.status.should.equal(HTTP_STATUS.INTERNAL_ERROR);
        const userCountAfter = await UserModel.count();
        userCountBefore.should.equal(userCountAfter);
      });
      it.only('should not create user if username is invalid', async function() {
        const userCountBefore = await UserModel.count();
        this.payload.username = 'abs@70e';
        const resp = await request(app)
          .post('/api/v1/auth/signup')
          .send(this.payload);
        resp.status.should.equal(HTTP_STATUS.INTERNAL_ERROR);
        const userCountAfter = await UserModel.count();
        userCountBefore.should.equal(userCountAfter);
      });
      it('should not create user if username is duplicate', async function() {
        this.payload.username = 'abc';
        const resp1 = await request(app)
          .post('/api/v1/auth/signup')
          .send(this.payload);
        resp1.status.should.equal(HTTP_STATUS.CREATED);
        const userCountBefore = await UserModel.count();
        const resp2 = await request(app)
          .post('/api/v1/auth/signup')
          .send(this.payload);
        resp2.status.should.equal(HTTP_STATUS.INTERNAL_ERROR);
        const userCountAfter = await UserModel.count();
        userCountBefore.should.equal(userCountAfter);
      });
      it('should not create user if password is empty', async function() {
        const userCountBefore = await UserModel.count();
        this.payload.hashedPassword = '';
        const resp = await request(app)
          .post('/api/v1/auth/signup')
          .send(this.payload);
        resp.status.should.equal(HTTP_STATUS.INTERNAL_ERROR);
        const userCountAfter = await UserModel.count();
        userCountBefore.should.equal(userCountAfter);
      });
      it('should not create user if password is null', async function() {
        const userCountBefore = await UserModel.count();
        this.payload.hashedPassword = null;
        const resp = await request(app)
          .post('/api/v1/auth/signup')
          .send(this.payload);
        resp.status.should.equal(HTTP_STATUS.INTERNAL_ERROR);
        const userCountAfter = await UserModel.count();
        userCountBefore.should.equal(userCountAfter);
      });
      it('should not create user if password is undefined', async function() {
        const userCountBefore = await UserModel.count();
        delete this.payload.hashedPassword;
        const resp = await request(app)
          .post('/api/v1/auth/signup')
          .send(this.payload);
        resp.status.should.equal(HTTP_STATUS.INTERNAL_ERROR);
        const userCountAfter = await UserModel.count();
        userCountBefore.should.equal(userCountAfter);
      });
    });
    it('should not allow to access signup:get route', async function() {
      const userCountBefore = await UserModel.count();
      const resp = await request(app)
        .get('/api/v1/auth/signup')
        .send({});
      const userCountAfter = await UserModel.count();
      resp.status.should.equal(HTTP_STATUS.NOT_ALLOWED);
      resp.body.should.empty;
      userCountBefore.should.equal(userCountAfter);
    });
    it('should not allow to access signup:put route', async function() {
      const userCountBefore = await UserModel.count();
      const resp = await request(app)
        .put('/api/v1/auth/signup')
        .send({});
      const userCountAfter = await UserModel.count();
      resp.status.should.equal(HTTP_STATUS.NOT_ALLOWED);
      resp.body.should.empty;
      userCountBefore.should.equal(userCountAfter);
    });
    it('should not allow to access signup:delete route', async function() {
      const userCountBefore = await UserModel.count();
      const resp = await request(app)
        .delete('/api/v1/auth/signup')
        .send({});
      const userCountAfter = await UserModel.count();
      resp.status.should.equal(HTTP_STATUS.NOT_ALLOWED);
      resp.body.should.empty;
      userCountBefore.should.equal(userCountAfter);
    });
  });
});