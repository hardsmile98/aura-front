import { Header } from "@/components/Header";

export default async function LandingPaywallRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-pink-50 dark:from-violet-950/20 dark:via-zinc-950 dark:to-pink-950/20 flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-6">
        <p className="text-zinc-600 dark:text-zinc-400">Landing Paywall</p>
      </main>
    </div>
  );
}
