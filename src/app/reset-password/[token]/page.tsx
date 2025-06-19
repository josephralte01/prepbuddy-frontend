// === app/reset-password/[token]/page.tsx ===
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';

export default function ResetPasswordPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <ResetPasswordForm />
    </main>
  );
}
