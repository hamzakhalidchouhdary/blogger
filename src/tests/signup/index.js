const app = require('../../app/index');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();
const request = chai.request;

describe('Signup', function() {
  it('should create new user', async function() {
    const resp = await request(app)
      .post('/api/v1/signup')
      .send({});
    resp.status.should.equal(200);
  });
});