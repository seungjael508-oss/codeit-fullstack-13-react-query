"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import AuthGNB from "@/components/AuthGNB";
import PasswordInput from "@/components/PasswordInput";
import Modal from "@/components/Modal";
import { signIn } from "@/lib/services/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const isFormFilled = email.trim() && password.trim();

  const { mutate: login, isPending } = useMutation({
    mutationFn: () => signIn(email, password),
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      router.push("/products");
    },
    onError: (error) => {
      if (error.status >= 500) {
        setModalMessage(error.message);
      } else {
        setEmailError("이메일을 확인해 주세요.");
        setPasswordError("비밀번호를 확인해 주세요.");
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormFilled || isPending) return;
    setEmailError("");
    setPasswordError("");
    login();
  };

  return (
    <>
      <Modal message={modalMessage} onClose={() => setModalMessage("")} />
      <div className="min-h-screen bg-white">
        <AuthGNB />
        <main className="flex justify-center px-4">
          <div className="w-full max-w-[640px]">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* 이메일 */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-bold text-gray-800 mb-2"
                >
                  이메일
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="이메일을 입력해 주세요"
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {emailError && (
                  <p className="mt-1 text-sm text-red-500">{emailError}</p>
                )}
              </div>

              {/* 비밀번호 */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-bold text-gray-800 mb-2"
                >
                  비밀번호
                </label>
                <PasswordInput
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호를 입력해 주세요"
                />
                {passwordError && (
                  <p className="mt-1 text-sm text-red-500">{passwordError}</p>
                )}
              </div>

              {/* 로그인 버튼 */}
              <button
                type="submit"
                disabled={!isFormFilled || isPending}
                className="w-full py-3 bg-blue-500 text-white rounded-full font-semibold mt-2
                           disabled:bg-gray-300 disabled:cursor-not-allowed
                           hover:bg-blue-600 transition-colors"
              >
                {isPending ? "로그인 중..." : "로그인"}
              </button>
            </form>

            {/* 간편 로그인 */}
            <div className="mt-8">
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-sm text-gray-500">간편 로그인하기</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>
              <div className="flex justify-center gap-4 mt-4">
                <button
                  type="button"
                  className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center bg-white hover:bg-gray-50 shadow-sm"
                  aria-label="구글로 로그인"
                >
                  <span className="text-sm font-bold text-blue-500">G</span>
                </button>
                <button
                  type="button"
                  className="w-12 h-12 rounded-full bg-yellow-300 flex items-center justify-center hover:bg-yellow-400 shadow-sm"
                  aria-label="카카오로 로그인"
                >
                  <span className="text-sm font-bold text-gray-800">K</span>
                </button>
              </div>
            </div>

            {/* 회원가입 링크 */}
            <p className="mt-6 text-center text-sm text-gray-600">
              판다마켓이 처음이신가요?{" "}
              <Link
                href="/signup"
                className="text-blue-500 underline font-medium"
              >
                회원가입
              </Link>
            </p>
          </div>
        </main>
      </div>
    </>
  );
}
