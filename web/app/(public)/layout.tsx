"use client";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="grid grid-cols-4 2xl:grid-cols-3 h-full min-h-screen">
      <div className="absolute inset-0 lg:col-span-2 lg:relative lg:block 2xl:col-span-2">
        <Image src="/welcome.png" alt="Welcome" fill style={{ objectFit: "cover" }} />
      </div>

      <div
        className="h-full overflow-y-auto z-10 flex items-start justify-center col-span-5 lg:col-span-2 2xl:col-span-1
      bg-black/50 lg:bg-[linear-gradient(135deg,#248ca3ee,#1a6b7eee_40%,#7a3510ee_70%,#f05b05ee)]
        backdrop-blur-xl transition-all duration-500 ease-in-out"
      >
        <Card className="flex flex-col w-full my-auto sm:mx-12 bg-white border rounded-3xl p-12 transition-all duration-500 ease-in-out ">
          <Image src="/logo-withname.png" alt="Logo" width={400} height={100} className="mx-auto mt-4" />
          <div className="flex-1 min-h-0 mb-4">{children}</div>
          <div className="flex gap-2 justify-center">
            <Link
              href="/login"
              aria-label="Login"
              onClick={() => setIsLogin(true)}
              className={cn(
                "w-4 h-4 rounded-full transition-all duration-300 bg-[#248ca3]",
                isLogin ? "opacity-100" : "opacity-30",
              )}
            >
              <span className="sr-only">Login</span>
            </Link>
            <Link
              href="/register"
              aria-label="Register"
              onClick={() => setIsLogin(false)}
              className={cn(
                "w-4 h-4 rounded-full transition-all duration-300 bg-[#248ca3]",
                !isLogin ? "opacity-100" : "opacity-30",
              )}
            >
              <span className="sr-only">Register</span>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
