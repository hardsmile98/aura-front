"use client";

import Image from "next/image";
import Link from "next/link";

type LandingHeaderProps = {
  locale: string;
  logInLabel: string;
  signUpLabel: string;
};

export function LandingHeader({
  locale,
  logInLabel,
  signUpLabel,
}: LandingHeaderProps) {
  return (
    <header className="bg-white border-b border-zinc-200">
      <div className="flex justify-between items-center px-4 md:px-8 py-4 max-w-7xl mx-auto">
        <Link href={`/${locale}/soulmate/welcome`} className="flex-shrink-0">
          <Image
            priority
            src="/logo.svg"
            alt="Aura"
            width={100}
            height={28}
            className="text-violet-600"
          />
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="#"
            className="text-sm font-medium text-zinc-700 hover:text-violet-600 transition-colors"
          >
            {logInLabel}
          </Link>
          <Link
            href="#"
            className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            {signUpLabel}
          </Link>
        </div>
      </div>
    </header>
  );
}
