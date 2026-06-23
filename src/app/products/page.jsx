"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { fetchProducts, fetchProduct } from "@/lib/services/products";

export default function ProductsPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetchProducts(1, 10),
    staleTime: 60_000,
    refetchInterval: 60_000,
  });

  // 상품 카드 hover 시 상세 데이터 미리 불러오기
  const handleMouseEnter = (id) => {
    queryClient.prefetchQuery({
      queryKey: ["product", String(id)],
      queryFn: () => fetchProduct(id),
      staleTime: 60_000,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">로딩 중...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">상품 목록을 불러오는데 실패했습니다.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
            🐼
          </div>
          <span className="text-xl font-bold text-blue-500">판다마켓</span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <h2 className="text-xl font-bold mb-6">상품 목록</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {data?.list?.map((product) => (
            <div
              key={product.id}
              onMouseEnter={() => handleMouseEnter(product.id)}
              onClick={() => router.push(`/products/${product.id}`)}
              className="cursor-pointer rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* 상품 이미지 */}
              <div className="aspect-square bg-gray-100">
                {product.images?.[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl text-gray-300">
                    📦
                  </div>
                )}
              </div>

              {/* 상품 정보 */}
              <div className="p-3">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {product.name}
                </p>
                <p className="text-sm font-bold mt-1">
                  {product.price.toLocaleString("ko-KR")}원
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  ♡ {product.favoriteCount}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
