const BASE_URL = "https://panda-market-api.vercel.app";

export const signIn = async (email, password) => {
  const response = await fetch(`${BASE_URL}/auth/signIn`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    const error = new Error(data.message || "로그인에 실패했습니다.");
    error.status = response.status;
    throw error;
  }

  return response.json();
};

export const signUp = async (email, nickname, password, passwordConfirmation) => {
  const response = await fetch(`${BASE_URL}/auth/signUp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, nickname, password, passwordConfirmation }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    const error = new Error(data.message || "회원가입에 실패했습니다.");
    error.status = response.status;
    throw error;
  }

  return response.json();
};
