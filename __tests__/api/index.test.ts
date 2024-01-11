import { fetchDocuments } from '../../src/api/';

describe('fetchDocuments', () => {
  it('should fetch documents successfully', async () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ data: [], total: 0 }),
    }));

    const result = await fetchDocuments(1, 10);
    expect(result).toEqual({ data: [], total: 0 });
  });

  it('should throw an error when the service is unavailable', async () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      status: 503,
      ok: false,
    }));

    await expect(fetchDocuments(1, 10)).rejects.toThrow('Service unavailable');
  });

  it('should throw an error when the request is timed out', async () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      status: 504,
      ok: false,
    }));

    await expect(fetchDocuments(1, 10)).rejects.toThrow('Gateway timeout');
  });

  it('should handle non-200 status codes', async () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      status: 404,
      ok: false,
    }));

    await expect(fetchDocuments(1, 10)).rejects.toThrow('Network response was not ok');
  });
});
