"use client";
import { usePathname } from "next/navigation";
import { getHeroContent } from "./hero.utils";

export default function Hero() {
  const pathname = usePathname();
  const content = getHeroContent(pathname);

  return (
    <div className="w-full mb-12 h-42  rounded-2xl bg-linear-to-r from-blue-700 to-blue-500 p-6 text-white md:p-8">
      <div className="relative z-10 flex flex-col gap-1">
        <p className="text-sm font-medium text-white/80">{content.eyebrow}</p>
        <h1 className="font-heading text-3xl font-semibold tracking-tight text-balance">{content.title}</h1>
        <p className="max-w-2xl text-pretty text-white/90">{content.subtitle}</p>
      </div>
    </div>
  );
}
