import { validateEndpoint } from "../../src/api/validation/endpoint";

describe('validateEndpoint', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });
  
    it('should validate the endpoint successfully', async () => {
      global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ valid: true }),
      }));
  
      const result = await validateEndpoint('documentId', 'endpoint');
      expect(result).toBe(true);
    });
  
    it('should return false when the endpoint is not valid', async () => {
      global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ valid: false }),
      }));
  
      const result = await validateEndpoint('documentId', 'invalidEndpoint');
      expect(result).toBe(false);
    });
  
    it('should throw an error when the network response is not ok', async () => {
      global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: false,
      }));
  
      await expect(validateEndpoint('documentId', 'invalidEndpoint')).rejects.toThrow('Network response was not ok');
    });
  
    it('should throw an error when the service is unavailable', async () => {
      global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 503,
        ok: false,
      }));
  
      await expect(validateEndpoint('documentId', 'invalidEndpoint')).rejects.toThrow('Service unavailable');
    });
  
    it('should throw an error when the request is timed out', async () => {
      global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 504,
        ok: false,
    }));
  
      await expect(validateEndpoint('documentId', 'invalidEndpoint')).rejects.toThrow('Gateway timeout');
    });
  
    it('should handle non-200 status codes', async () => {
      global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 404,
        ok: false,
      }));
  
      await expect(validateEndpoint('documentId', 'invalidEndpoint')).rejects.toThrow('Network response was not ok');
    });
  
    it('should handle error response', async () => {
      global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ error: { code: 101, message: 'error' }}),
      }));
  
      await expect(validateEndpoint('documentId', 'invalidEndpoint')).rejects.toThrow('Error in response for invalidEndpoint: (101) error');
    });
});
