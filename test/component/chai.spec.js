const pactum = require('../../src/index');
const expect = pactum.expect;

describe('Chai Like Assertions', () => {

  let request = pactum.spec();
  let response;

  it('Given a user with name snow', () => {
    request.useInteraction({
      get: '/api/users',
      return: {
        name: 'snow'
      }
    });
  });

  it('When a user is requested', () => {
    request.get('http://localhost:9393/api/users');
  });

  it('should return a response', async () => {
    response = await request.toss();
  });

  it('should return a status 200', () => {
    expect(response).to.have.status(200);
  });

  it('should return a header', () => {
    expect(response).to.have.header('connection', 'close');
    expect(response).to.have.headerContains('connection', 'cl');
  });

  it('should return a valid user', async () => {
    expect(response).to.have.json({ name: 'snow'});
    expect(response).to.have.jsonLike({ name: 'snow'});
    expect(response).to.have.jsonQuery('name', 'snow');
    expect(response).to.have.jsonQueryLike('name', 'snow');
    expect(response).to.have.body(`{"name":"snow"}`);
    expect(response).to.have.bodyContains(`snow`);
  });

  it('should return a valid schema', async () => {
    expect(response).to.have.jsonSchema({ properties: { name: 'string' }});
  });

  it('should return a response within 500 ms', async () => {
    expect(response).to.have.responseTimeLessThan(500);
  });

});