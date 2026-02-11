
import Image from "next/image";

export function Header() {
  return (
    <header className="flex justify-center items-center px-6 py-4 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-800">
      <Image
        priority
        src="/logo.svg"
        alt="Aura"
        width={100}
        height={28} />
    </header>
  );
}
