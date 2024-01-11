export interface Doc {
  id: string;
  filename: string;
  author: string;
  created_at: string; // Format: yyyy-mm-ddThh:mm:ssZ
  hash: string;
  size: number; // Size in kilobytes
}

export interface Meta {
    pageCount: number;
    page: number;
    perPage: number;
}

export interface Rejection {
    code: number;
    message: string;
}

export interface ApiResponse {
    meta?: Meta;
    data?: Doc[];
    error?: Rejection;
}

export interface ValidationResponse {
    valid?: boolean;
    error?: Rejection;
}

export interface Validation {
    checksum: boolean;
    schema: boolean;
    signature: boolean;
}
