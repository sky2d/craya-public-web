export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

type JsonObject = { [Key in string]: JsonValue } & { [Key in string]?: JsonValue | undefined };
type JsonArray = JsonValue[] | readonly JsonValue[];
type JsonPrimitive = string | number | boolean | null | undefined;

export type JsonValue = JsonPrimitive | JsonObject | JsonArray;

export interface GetOptions {
  endpoint: string;
  token?: string;
  params?: Record<string, string>;
}

export interface PostOptions {
  endpoint: string;
  body?: JsonValue;
}

export interface PutOptions {
  endpoint: string;
  body: JsonValue;
}

export interface PutMultipartOptions {
  url: string;
  body: FormData | Blob | File;
}

export interface DeleteOptions {
  endpoint: string;
}

export interface ApiResponse<T> {
  status: "error" | "success";
  message: string;
  data?: T;
  error?: string;
}

export interface ApiReturn<T> {
  data?: T;
  error?: string;
  message?: string;
}
