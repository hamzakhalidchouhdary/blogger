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
          hashedPassword: faker.internet.password(),
          role: ''
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
        delete this.payload.role;
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