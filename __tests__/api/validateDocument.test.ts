import * as endpoint from "../../src/api/validation/endpoint";
import { validateDocument } from "../../src/api/validation/document";

jest.mock('../../src/api/validation/endpoint', () => ({
  validateEndpoint: jest.fn(),
}));

const mockedEndpoint = endpoint as jest.Mocked<typeof endpoint>;

describe('validateDocument', () => {
    it('should validate the document successfully', async () => {
      mockedEndpoint.validateEndpoint.mockImplementation(() => Promise.resolve(true));

      const result = await validateDocument('documentId');
  
      expect(result).toEqual({checksum: true, schema: true, signature: true});
    });

    it('should validate the document successfully 2', async () => {
      mockedEndpoint.validateEndpoint
      .mockImplementationOnce(() => Promise.resolve(true))
      .mockImplementationOnce(() => Promise.resolve(false));

      const result = await validateDocument('documentId');
  
      expect(result).toEqual({checksum: true, schema: false, signature: false});
    });

    it('should validate the document successfully 3', async () => {
      mockedEndpoint.validateEndpoint
      .mockImplementationOnce(() => Promise.resolve(true))
      .mockImplementationOnce(() => Promise.resolve(true))
      .mockImplementationOnce(() => Promise.resolve(false));

      const result = await validateDocument('documentId');
  
      expect(result).toEqual({checksum: true, schema: true, signature: false});
    });

    it('should validate the document successfully 4', async () => {
      mockedEndpoint.validateEndpoint.mockImplementation(() => Promise.resolve(false));

      const result = await validateDocument('documentId');
  
      expect(result).toEqual({checksum: false, schema: false, signature: false});
    });
});
