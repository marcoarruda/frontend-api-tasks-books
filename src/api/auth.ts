import { API_ADDRESS } from './index'

export async function useLogin(
  email: string,
  password: string
): Promise<string> {
  const response = await fetch(`${API_ADDRESS}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.msg);
  }

  const { token } = await response.json();

  return token;
}
