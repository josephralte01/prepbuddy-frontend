// 📁 app/register/page.tsx
import RegisterForm from '@/components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <RegisterForm />
    </main>
  );
}
