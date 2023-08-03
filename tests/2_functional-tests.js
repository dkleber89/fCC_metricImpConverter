const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  this.timeout(5000);

  suite('Convert', function() {
    test('a valid input such as 10L.', function(done) {
      chai
        .request(server)
        .keepOpen()
        .get('/api/convert?input=10L')
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 10);
          assert.equal(res.body.initUnit, 'L');
          assert.approximately(res.body.returnNum, 2.64172, 0.00001);
          assert.equal(res.body.returnUnit, 'gal');
          assert.equal(res.body.string, '10 liters converts to 2.64172 gallons');
          
          done();
        });
    });

    test('an invalid input such as 32g.', function(done) {
      chai
        .request(server)
        .keepOpen()
        .get('/api/convert?input=32g')
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'invalid unit');
          
          done();
        });
    });

    test('an invalid number such as 3/7.2/4kg.', function(done) {
      chai
        .request(server)
        .keepOpen()
        .get('/api/convert?input=3%2F7.2%2F4kg')
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'invalid number');
          
          done();
        });
    });

    test('an invalid number AND unit such as 3/7.2/4kilomegagram.', function(done) {
      chai
        .request(server)
        .keepOpen()
        .get('/api/convert?input=3%2F7.2%2F4kilomegagram')
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'invalid number and unit');
          
          done();
        });
    });

    test('with no number such as kg.', function(done) {
      chai
        .request(server)
        .keepOpen()
        .get('/api/convert?input=kg')
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 1);
          assert.equal(res.body.initUnit, 'kg');
          assert.approximately(res.body.returnNum, 2.20462, 0.00001);
          assert.equal(res.body.returnUnit, 'lbs');
          assert.equal(res.body.string, '1 kilograms converts to 2.20462 pounds');
          
          done();
        });
    });
  });
});
