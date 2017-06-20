const chai = require('chai');
const sinon = require('sinon');

const db = require('../app/db');
const server = require('../app');

chai.use(require('chai-http'));
chai.should();

describe('Messages', () => {

  beforeEach((done) => {
    db.none('TRUNCATE TABLE messages RESTART IDENTITY').then(() => done());
  });

  describe('GET', () => {
    it('should get the message as plain text', (done) => {
      const message = 'test';

      db.one('INSERT INTO messages (message) VALUES($1) RETURNING id', [message])
        .then((data) => {
          chai.request(server)
            .get(`/messages/${data.id}`)
            .end((err, res) => {
              res.should.have.status(200);
              res.should.have.header('content-type', /text\/plain/);
              chai.expect(res.text).to.equal(message);
              done();
            });

        });
    });

    it('should fail with a 400 and a message if id can not find message', (done) => {
      const message = 'test';

      db.one('INSERT INTO messages (message) VALUES($1) RETURNING id', [message])
        .then((data) => {
          const invalidId = data.id + 1;
          chai.request(server)
            .get(`/messages/${invalidId}`)
            .end((err, res) => {
              res.should.have.status(400);
              res.should.have.header('content-type', /text\/plain/);
              chai.expect(res.text).to.equal(`Message does not exist with id: ${invalidId}`);
              done();
            });

        });
    });

    it('should return a 400 with a message if id is not an number', (done) => {
      chai.request(server)
        .get(`/messages/testing123`)
        .end((err, res) => {
          res.should.have.status(400);
          chai.expect(res.text).to.equal('Invalid id!!');
          done();
        });
    });
  });

  describe('POST', () => {

    it('should save the message to db and return is as json', (done) => {
      const message = 'test2';

      chai.request(server)
        .post('/messages')
        .set({ 'Content-Type': /application\/x-www-form-urlencoded/ })
        .type('form')
        .send(message)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.have.header('content-type', /application\/json/);
          chai.expect(Object.keys(res.body)[0]).to.equal('id');
          chai.expect(res.body.id).to.be.an('number');
          done();
        });
    });

    it('should send a 400 and an error message is no message is sent', (done) => {
      chai.request(server)
        .post('/messages')
        .set({ 'Content-Type': /application\/x-www-form-urlencoded/ })
        .type('form')
        .send('')
        .end((err, res) => {
          res.should.have.status(400);
          res.should.have.header('content-type', /application\/json/);
          chai.expect(res.body.error).to.be.an('string');
          done();
        });
    });

    it('should send a 400 with a generic error message if insert fails', (done) => {
      const stub = sinon.stub(db, 'one').resolves();
      stub.rejects();

      chai.request(server)
        .post('/messages')
        .set({ 'Content-Type': /application\/x-www-form-urlencoded/ })
        .type('form')
        .send('Message')
        .end((err, res) => {
          res.should.have.status(400);
          res.should.have.header('content-type', /application\/json/);
          chai.expect(res.body.error).to.be.an('string');
          stub.restore();
          done();
        });

    });

  });
});