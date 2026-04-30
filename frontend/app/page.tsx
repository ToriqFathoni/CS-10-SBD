"use client";

import { useState, useEffect } from "react";
import { fetchJson } from "../lib/api";

interface Barang {
  id: number;
  name: string;
  price: number;
  stock?: number;
}

export default function CatalogPage() {
  const [barang, setBarang] = useState<Barang[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadItems = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetchJson<Barang[]>("/items");
        setBarang(response.payload);
      } catch (requestError) {
        const message = requestError instanceof Error ? requestError.message : "Gagal memuat katalog";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    loadItems();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-zinc-950">Katalog Barang</h1>
        <p className="text-zinc-600 mt-2">Daftar semua barang yang dijual di toko ini.</p>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-zinc-500 font-medium animate-pulse">
          Memuat katalog...
        </div>
      ) : error ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800">
          {error}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {barang.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-zinc-200 p-6 flex flex-col hover:shadow-md hover:border-zinc-300 transition">
              <h2 className="text-xl font-bold mb-2 text-zinc-900">{item.name}</h2>
              <p className="text-zinc-500 text-sm mb-4 flex-grow">
                {item.stock !== undefined ? `Stok tersedia: ${item.stock}` : "Item tersedia di katalog."}
              </p>
              <div className="text-xl font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 w-fit px-3 py-1 rounded-md">
                Rp {item.price.toLocaleString('id-ID')}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}