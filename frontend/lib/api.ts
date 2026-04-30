type ApiEnvelope<T> = {
  success: boolean;
  message: string;
  payload: T;
};

const API_PREFIX = "/api";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function fetchJson<T>(path: string, init?: RequestInit): Promise<ApiEnvelope<T>> {
  const response = await fetch(`${API_PREFIX}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    ...init,
  });

  const data = (await response.json().catch(() => null)) as ApiEnvelope<T> | null;

  if (!response.ok || !data) {
    throw new ApiError(data?.message || "Request failed", response.status);
  }

  if (!data.success) {
    throw new ApiError(data.message || "Request failed", response.status);
  }

  return data;
}