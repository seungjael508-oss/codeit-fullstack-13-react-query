const BASE_URL = "https://panda-market-api.vercel.app";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken");
  }
  return null;
};

export const fetchProducts = async (page = 1, pageSize = 10) => {
  const token = getToken();
  const response = await fetch(
    `${BASE_URL}/products?page=${page}&pageSize=${pageSize}`,
    {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }
  );

  if (!response.ok) {
    throw new Error("상품 목록을 가져오는데 실패했습니다.");
  }

  return response.json();
};

export const fetchProduct = async (id) => {
  const token = getToken();
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  if (!response.ok) {
    throw new Error("상품 정보를 가져오는데 실패했습니다.");
  }

  return response.json();
};
