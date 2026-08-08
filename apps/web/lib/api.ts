const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiError(res.status, body.message ?? "요청에 실패했습니다.");
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json() as Promise<T>;
}

export interface AuthUser {
  id: string;
  email: string;
  nickname: string;
  profileImage: string | null;
  role: "USER" | "ADMIN";
  createdAt: string;
}

export function signup(data: {
  email: string;
  password: string;
  nickname: string;
}) {
  return apiFetch<{ user: AuthUser }>("/auth/signup", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function login(data: { email: string; password: string }) {
  return apiFetch<{ user: AuthUser }>("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function logout() {
  return apiFetch<{ success: boolean }>("/auth/logout", { method: "POST" });
}

export function me() {
  return apiFetch<AuthUser>("/auth/me");
}

export interface Favorite {
  id: string;
  userId: string;
  toolId: string;
  tool: {
    id: string;
    category: string;
    title: string;
    description: string | null;
  };
}

export function getFavorites() {
  return apiFetch<Favorite[]>("/favorites");
}

export function addFavorite(toolId: string) {
  return apiFetch<Favorite>("/favorites", {
    method: "POST",
    body: JSON.stringify({ toolId }),
  });
}

export function removeFavorite(favoriteId: string) {
  return apiFetch<void>(`/favorites/${favoriteId}`, { method: "DELETE" });
}

export interface AdminStats {
  totalUsers: number;
  totalFavorites: number;
  totalTools: number;
  toolUsage: { toolId: string; title: string; favoriteCount: number }[];
  recentUsers: {
    id: string;
    nickname: string;
    email: string;
    role: "USER" | "ADMIN";
    createdAt: string;
  }[];
}

export function getAdminStats() {
  return apiFetch<AdminStats>("/admin/stats");
}
