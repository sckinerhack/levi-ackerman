import { Metadata } from 'next';
import LoginForm from '@/components/LoginForm';
import { isAuthenticated } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Login - Redirect Manager',
  description: 'Sign in to access the redirect management dashboard',
};

export default function LoginPage() {
  // If already authenticated, redirect to redirects page
  if (isAuthenticated()) {
    redirect('/redirects');
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/50">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">Redirect Manager</h1>
          <p className="text-muted-foreground">
            Sign in to manage your redirect links
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
