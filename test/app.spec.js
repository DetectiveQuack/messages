const chai = require('chai');

const server = require('../app');

chai.use(require('chai-http'));
chai.should();

describe('App', () => {
  it('Should return message on root get', (done) => {
     chai.request(server)
        .get(`/`)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.have.header('Content-Type', /text\/html/);
          chai.expect(res.text).to.equal('Welcome to messages!!');
          done();
        });
  });
});