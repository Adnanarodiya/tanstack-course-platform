export interface IStorage {
  upload(key: string, data: Buffer): Promise<void>;
  delete(key: string): Promise<void>;
  getStream(
    key: string,
    rangeHeader: string | null
  ): Promise<StreamFileResponse>;
  getPresignedUrl(key: string): Promise<string>;
  getPresignedUploadUrl(key: string): Promise<string>;
}

export type StreamFileRange = Partial<{
  start: number;
  end: number;
}>;

export type StreamFileResponse = {
  stream: ReadableStream;
  contentLength: number;
  contentType: string;
  contentRange?: string;
};
