"use client";

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h2 className="text-2xl font-bold mb-4">Halaman Tidak Ditemukan</h2>
      <p className="mb-4">Maaf, halaman yang Anda cari tidak tersedia.</p>
      <Link href="/" className="text-emerald-600 hover:underline">
        Kembali ke Beranda
      </Link>
    </div>
  );
}
