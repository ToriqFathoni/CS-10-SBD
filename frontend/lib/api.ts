type ApiEnvelope<T> = {
  success: boolean;
  message: string;
  payload: T;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

function buildApiUrl(path: string) {
  const normalizedPath = path.startsWith("/api")
    ? path
    : `/api${path.startsWith("/") ? path : `/${path}`}`;

  return `${API_BASE_URL}${normalizedPath}`;
}

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function fetchJson<T>(path: string, init?: RequestInit): Promise<ApiEnvelope<T>> {
  const response = await fetch(buildApiUrl(path), {
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