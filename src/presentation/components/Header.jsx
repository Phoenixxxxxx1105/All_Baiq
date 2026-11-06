import React from 'react';
import { Sparkles } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-3.5">
            <img
              src="/logo.jpg"
              alt="Logo Kantin Kampus"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover object-top border-2 border-white/40 shadow-md shrink-0"
            />
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                KANTIN KAKA AL & KAKA
              </h1>
              <p className="text-orange-100 text-xs sm:text-sm font-medium mt-0.5">
                BELI DISINI GRATIS TIKET SURGA
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-black/15 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide text-orange-100 border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" aria-hidden="true" />
            <span>GAADA DISKON</span>
          </div>
        </div>
      </div>
    </header>
  );
};
