"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { fetchProduct } from "@/lib/services/products";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
    staleTime: 60_000,
  });

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
        <p className="text-red-500">상품 정보를 불러오는데 실패했습니다.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
            🐼
          </div>
          <span className="text-xl font-bold text-blue-500">판다마켓</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* 목록으로 돌아가기 */}
        <button
          onClick={() => router.push("/products")}
          className="mb-6 text-sm text-gray-500 hover:text-gray-800 flex items-center gap-1"
        >
          ← 목록으로 돌아가기
        </button>

        <div className="flex flex-col md:flex-row gap-8">
          {/* 상품 이미지 */}
          <div className="w-full md:w-1/2">
            <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
              {product?.images?.[0] ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-6xl text-gray-300">
                  📦
                </div>
              )}
            </div>
          </div>

          {/* 상품 정보 */}
          <div className="w-full md:w-1/2 flex flex-col gap-5">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {product?.name}
              </h2>
              <p className="text-3xl font-bold mt-3">
                {product?.price.toLocaleString("ko-KR")}원
              </p>
            </div>

            <hr className="border-gray-200" />

            {/* 좋아요 */}
            <div className="flex items-center gap-1 text-gray-500 text-sm">
              <span>♡</span>
              <span>{product?.favoriteCount}</span>
            </div>

            <hr className="border-gray-200" />

            {/* 상품 소개 */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 mb-2">
                상품 소개
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                {product?.description}
              </p>
            </div>

            {/* 태그 */}
            {product?.tags?.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-2">
                  상품 태그
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 판매자 정보 */}
            <div className="mt-auto pt-4 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                  👤
                </div>
                <div>
                  <p className="text-xs text-gray-400">판매자</p>
                  <p className="text-sm font-medium text-gray-700">
                    {product?.ownerNickname}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
