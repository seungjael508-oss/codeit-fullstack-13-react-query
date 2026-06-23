import Link from "next/link";

export default function AuthGNB() {
  return (
    <header className="flex justify-center py-8">
      <Link href="/" className="flex items-center gap-2">
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl">
          🐼
        </div>
        <span className="text-2xl font-bold text-blue-500">판다마켓</span>
      </Link>
    </header>
  );
}
