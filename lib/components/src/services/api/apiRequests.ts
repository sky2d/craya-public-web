import { ApiResponse, ApiReturn, DeleteOptions, GetOptions, PostOptions, PutMultipartOptions, PutOptions } from "../../interfaces";

const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_API_DOMAIN || process.env.API_DOMAIN;
};

const buildQueryString = (params: Record<string, string> = {}): string => {
  const query = new URLSearchParams(params).toString();
  return query ? `?${query}` : "";
};

const processApiPromise = async <T>(promise: Promise<Response>): Promise<ApiReturn<T>> => {
  try {
    const response = await promise;
    let result: ApiResponse<T>;
    try {
      result = await response.json();
    } catch (jsonParseError: unknown) {
      const message = jsonParseError instanceof Error ? jsonParseError.message : "Unknown JSON parsing error";
      return { error: `Invalid JSON response: ${message}` };
    }
    if (response.ok) {
      if (result.data && result.status === "success") {
        return { data: result.data };
      }
      if (result.message) {
        return { error: result.message };
      }
      return { error: "Successful response but no data or specific message." };
    } else {
      const message = result.message || result.error || "An unexpected error occurred";
      if (response.status >= 500) {
        return { error: message || "An error occurred on the server (5xx error)." };
      }
      if (response.status >= 400) {
        return { error: message || "An error occurred on the server (4xx error)." };
      }
      // Generic non-OK fallback
      return { error: message || `An error occurred with status ${response.status}` };
    }
  } catch (e: unknown) {
    const error = e instanceof Error ? e.message : String(e);
    return { error };
  }
};

export const getRequest = async <T>({ endpoint, params, token }: GetOptions) => {
  const url = `${getBaseUrl()}${endpoint}${buildQueryString(params)}`;

  const fetchOptions: RequestInit & { next?: { revalidate: number } } = {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };

  if (endpoint.startsWith("/products") || endpoint.startsWith("/coupons")) {
    fetchOptions.cache = "no-store"; // always fresh
  } else if (endpoint === "/stores/all" || endpoint.startsWith("/stores/getStoreBySubdomain") || endpoint.startsWith("/stores/by-name")) {
    fetchOptions.cache = "no-store"; // always fresh
  }

  const promise = fetch(url, fetchOptions);
  return processApiPromise<T>(promise);
};

export const postRequest = async <T>({ endpoint, body }: PostOptions) => {
  const promise = fetch(`${getBaseUrl()}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return processApiPromise<T>(promise);
};

export const putRequest = async <T>({ endpoint, body }: PutOptions) => {
  const requestBody = JSON.stringify(body);

  const promise = fetch(`${getBaseUrl()}${endpoint}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: requestBody,
  });
  return processApiPromise<T>(promise);
};

export const deleteRequest = async <T>({ endpoint }: DeleteOptions) => {
  const promise = fetch(`${getBaseUrl()}${endpoint}`, { method: "DELETE" });
  return processApiPromise<T>(promise);
};

export const putMultipartRequest = async ({ url, body }: PutMultipartOptions) => {
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body,
    });
    if (response.ok) return true;
  } catch {
    return false;
  }
  return false;
};
