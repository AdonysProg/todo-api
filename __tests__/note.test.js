import request from 'supertest';

const app = 'http://localhost:4000';

let noteId;
const getNoteId = (body) => {
  noteId = body[0]._id;
};

describe('/ CREATE NOTE', () => {
  it('Respond with the fields to create a note', async () => {
    await request(app)
      .post('/api/note')
      .send({
        title: 'Test case',
        description: 'Test case',
      })
      .then((res) => {
        expect(res.statusCode).toEqual(201);
      });
  });
  it('Respond with missing fields to create a note', async () => {
    await request(app)
      .post('/api/note')
      .send({
        title: 'Test case',
      })
      .then((res) => {
        expect(res.statusCode).toEqual(400);
      });
  });
});

describe('/ GET NOTES', () => {
  it('Respond with all the notes', async () => {
    await request(app)
      .get('/api/note')
      .then((res) => {
        getNoteId(res.body);
        expect(res.statusCode).toEqual(200);
      });
  });
});

describe('/ GET NOTE BY ID', () => {
  it('Respond with ID to get a note', async () => {
    await request(app)
      .get(`/api/note/${noteId}`)
      .then((res) => {
        expect(res.statusCode).toBe(202);
      });
  });
  it('Respond with wrong ID', async () => {
    await request(app)
      .get('/api/note/123')
      .then((res) => {
        expect(res.statusCode).toBe(404);
      });
  });
});

describe('/ UPDATE NOTE BY ID', () => {
  it('Respond with an ID to update', async () => {
    await request(app)
      .put(`/api/note/${noteId}`)
      .send({
        title: 'Title updated',
        description: 'Description updated',
        finished: true,
      })
      .then((res) => {
        expect(res.statusCode).toBe(204);
      });
  });
  it('Respond with wrong ID to update', async () => {
    await request(app)
      .put('/api/note/123')
      .send({
        title: 'Title updated',
        description: 'Description updated',
        finished: true,
      })
      .then((res) => {
        expect(res.statusCode).toBe(404);
      });
  });
  it('Respond with missing fields to update', async () => {
    await request(app)
      .put(`/api/note/${noteId}`)
      .send({
        title: 'Title updated',
        finished: true,
      })
      .then((res) => {
        expect(res.statusCode).toBe(400);
      });
  });
});

describe('/ DELETE NOTE BY ID', () => {
  it('Respond with ID to DELETE', async () => {
    await request(app)
      .delete(`/api/note/${noteId}`)
      .then((res) => {
        expect(res.statusCode).toBe(204);
      });
  });
  it('Respond with wrong ID to DELETE', async () => {
    await request(app)
      .delete('/api/note/123')
      .then((res) => {
        expect(res.statusCode).toBe(404);
      });
  });
});
