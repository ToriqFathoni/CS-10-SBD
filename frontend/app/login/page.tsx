"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { fetchJson, ApiError } from "../../lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      setMessage("");

      const response = await fetchJson<{ token: string; user: { id: number; name: string; username: string; email: string } }>(
        "/auth/login",
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
        }
      );

      const { token, user } = response.payload;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setMessage("Login berhasil. Mengalihkan ke katalog...");
      router.push("/");
    } catch (requestError) {
      const errorMessage = requestError instanceof ApiError || requestError instanceof Error ? requestError.message : "Login gagal";
      setMessage(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-12">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-zinc-200 p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-zinc-950">Login ke Akunmu</h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">Email</label>
            <input 
              type="email" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full border border-zinc-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 focus:outline-none transition bg-white" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">Password</label>
            <input 
              type="password" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full border border-zinc-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 focus:outline-none transition bg-white" 
            />
          </div>
          <button type="submit" disabled={isSubmitting} className="w-full bg-zinc-900 text-white font-semibold py-2.5 rounded-md hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-70 transition shadow-sm shadow-zinc-200">
            {isSubmitting ? "Memproses..." : "Masuk"}
          </button>
        </form>
        {message ? (
          <p className="mt-4 rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700">
            {message}
          </p>
        ) : null}
        <p className="text-center text-sm text-zinc-600 mt-6">
          Belum punya akun? <Link href="/register" className="text-emerald-600 font-medium hover:underline">Daftar sekarang</Link>
        </p>
      </div>
    </div>
  );
}