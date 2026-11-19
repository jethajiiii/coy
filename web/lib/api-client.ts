export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly error: string;

  constructor(message: string, statusCode: number, error = "ApiError") {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.error = error;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

const BASE_URL =
  process.env["NEXT_PUBLIC_API_URL"] || "/api/backend";

interface RequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
}

export async function apiClient<T>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const { body, headers = {}, ...rest } = options;
  const url = `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;

  const requestHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...(headers as Record<string, string>),
  };

  const response = await fetch(url, {
    ...rest,
    headers: requestHeaders,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    let errorMessage = `Request failed with status ${response.status}`;
    try {
      const errorJson = (await response.json()) as { error?: string };
      if (errorJson.error) {
        errorMessage = errorJson.error;
      }
    } catch {
      // Body was not JSON; use default message
    }
    throw new ApiError(errorMessage, response.status);
  }

  return response.json() as Promise<T>;
}
