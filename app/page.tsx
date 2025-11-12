"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/home");
    }, 1500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary via-primary-light to-secondary animate-fade-in">
      {/* Logo/Icon */}
      <div className="text-9xl mb-8 animate-bounce-slow">🍽️</div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-white mb-2 text-center px-4">
        Menù Scuola
      </h1>

      {/* Subtitle */}
      <p className="text-lg text-white/90 text-center px-4 mb-8">
        Menu settimanale 2025-2026
      </p>

      {/* Loading indicator */}
      <div className="flex gap-2">
        <div
          className="w-3 h-3 bg-white rounded-full animate-bounce"
          style={{ animationDelay: "0ms" }}
        />
        <div
          className="w-3 h-3 bg-white rounded-full animate-bounce"
          style={{ animationDelay: "150ms" }}
        />
        <div
          className="w-3 h-3 bg-white rounded-full animate-bounce"
          style={{ animationDelay: "300ms" }}
        />
      </div>
    </div>
  );
}
