"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import AuthGNB from "@/components/AuthGNB";
import PasswordInput from "@/components/PasswordInput";
import Modal from "@/components/Modal";
import { signUp } from "@/lib/services/auth";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const isFormFilled =
    email.trim() && nickname.trim() && password.trim() && passwordConfirm.trim();

  const { mutate: register, isPending } = useMutation({
    mutationFn: () => signUp(email, nickname, password, passwordConfirm),
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      router.push("/products");
    },
    onError: (error) => {
      setModalMessage(error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormFilled || isPending) return;

    // 비밀번호 일치 검사 (API 호출 전 클라이언트에서 먼저 확인)
    if (password !== passwordConfirm) {
      setPasswordConfirmError("비밀번호가 일치하지 않아요.");
      return;
    }

    setPasswordConfirmError("");
    register();
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
              </div>

              {/* 닉네임 */}
              <div>
                <label
                  htmlFor="nickname"
                  className="block text-sm font-bold text-gray-800 mb-2"
                >
                  닉네임
                </label>
                <input
                  id="nickname"
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="닉네임을 입력해 주세요"
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
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
              </div>

              {/* 비밀번호 확인 */}
              <div>
                <label
                  htmlFor="passwordConfirm"
                  className="block text-sm font-bold text-gray-800 mb-2"
                >
                  비밀번호 확인
                </label>
                <PasswordInput
                  id="passwordConfirm"
                  value={passwordConfirm}
                  onChange={(e) => {
                    setPasswordConfirm(e.target.value);
                    setPasswordConfirmError("");
                  }}
                  placeholder="비밀번호를 다시 입력해 주세요"
                />
                {passwordConfirmError && (
                  <p className="mt-1 text-sm text-red-500">
                    {passwordConfirmError}
                  </p>
                )}
              </div>

              {/* 회원가입 버튼 */}
              <button
                type="submit"
                disabled={!isFormFilled || isPending}
                className="w-full py-3 bg-blue-500 text-white rounded-full font-semibold mt-2
                           disabled:bg-gray-300 disabled:cursor-not-allowed
                           hover:bg-blue-600 transition-colors"
              >
                {isPending ? "가입 중..." : "회원가입"}
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

            {/* 로그인 링크 */}
            <p className="mt-6 text-center text-sm text-gray-600">
              이미 회원이신가요?{" "}
              <Link
                href="/login"
                className="text-blue-500 underline font-medium"
              >
                로그인하기
              </Link>
            </p>
          </div>
        </main>
      </div>
    </>
  );
}
