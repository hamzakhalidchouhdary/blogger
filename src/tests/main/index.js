const app = require('../../app/index');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();
const request = chai.request;

describe('Root', function() {
  it('should access root', async function() {
    const resp = await request(app)
      .get('/')
      .send({});
    resp.status.should.equal(200);
  });
});