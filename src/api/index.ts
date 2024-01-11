import { ApiResponse } from './interfaces';

export const API = import.meta.env.VITE_API as string;

export async function fetchDocuments (pageParam=1, perPage=10): Promise<ApiResponse> {
    const url = new URL(API);

    url.searchParams.append('perPage', perPage.toString());
    url.searchParams.append('page', pageParam.toString());
  
    const response = await fetch(url.toString());

    if (response.status === 503) {
        throw new Error('Service unavailable');
    }

    if (response.status === 504) {
        throw new Error('Gateway timeout');
    }

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return await response.json();
}
