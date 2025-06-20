// === frontend/pages/_app.tsx ===
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { useChallengeInviteToast } from '@/hooks/useChallengeInviteToast';
import Navbar from '@/components/Navbar'; // ✅ import Navbar

export default function App({ Component, pageProps }: AppProps) {
  useChallengeInviteToast();

  return (
    <>
      <Navbar />
      <main className="pt-4">
        <Component {...pageProps} />
      </main>
      <Toaster position="top-right" />
    </>
  );
}
