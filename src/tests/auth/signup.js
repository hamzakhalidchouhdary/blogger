const app = require('../../app/index');
const chai = require('chai');
const chaiHttp = require('chai-http');
const HTTP_STATUS = require('../../app/utils/constants/httpStatus');

chai.use(chaiHttp);
chai.should();
const request = chai.request;

describe('auth', function() {
  describe('Signup', function() {
    it('should create new user', async function() {
      const resp = await request(app)
        .post('/api/v1/auth/signup')
        .send({});
      resp.status.should.equal(HTTP_STATUS.CREATED);
      resp.body.should.have.key('id');
    });
    it('should access signup:get route', async function() {
      const resp = await request(app)
        .get('/api/v1/auth/signup')
        .send({});
      resp.status.should.equal(HTTP_STATUS.NOT_ALLOWED);
      resp.body.should.empty;
    });
    it('should access signup:put route', async function() {
      const resp = await request(app)
        .put('/api/v1/auth/signup')
        .send({});
      resp.status.should.equal(HTTP_STATUS.NOT_ALLOWED);
      resp.body.should.empty;
    });
    it('should access signup:delete route', async function() {
      const resp = await request(app)
        .delete('/api/v1/auth/signup')
        .send({});
      resp.status.should.equal(HTTP_STATUS.NOT_ALLOWED);
      resp.body.should.empty;
    });
  });
});