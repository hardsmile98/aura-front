import { AccountHeader } from '@/components/account/AccountHeader';
import { AccountBottomNav } from '@/components/account/AccountBottomNav';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-pink-50 flex flex-col">
      <AccountHeader />

      <main className="flex-1 w-full pb-20 md:pb-0">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
          {children}
        </div>
      </main>

      <AccountBottomNav />
    </div>
  );
}
