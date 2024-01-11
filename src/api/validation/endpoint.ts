
import { API } from '..';
import { ValidationResponse } from '../interfaces';

export async function validateEndpoint (documentId: string, endpoint: string): Promise<boolean> {
    const response = await fetch(`${API}/${documentId}/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (response.status === 503) {
        throw new Error('Service unavailable');
    }

    if (response.status === 504) {
        throw new Error(`Gateway timeout for ${endpoint}`);
    }

    if (!response.ok) {
      throw new Error(`Network response was not ok for ${endpoint}`);
    }
    
    const result: ValidationResponse = await response.json();

    if (result.error) {
        throw new Error(`Error in response for ${endpoint}: (${result.error.code}) ${result.error.message}`);
    }

    if (!result.valid) {
        return false;
    }

    return result.valid;
}
