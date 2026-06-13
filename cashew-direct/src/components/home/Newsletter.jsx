import { useState } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <section className="bg-brand-800">
      <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 lg:py-20">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-700">
          <Mail className="h-5 w-5 text-brand-200" />
        </div>
        <h2 className="mt-5 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Get 10% off your first order
        </h2>
        <p className="mx-auto mt-2 max-w-md text-brand-100">
          Join our newsletter for early access to new flavours, seasonal gift
          boxes and subscriber-only discounts.
        </p>

        {submitted ? (
          <div className="mx-auto mt-6 flex max-w-md items-center justify-center gap-2 rounded-lg bg-brand-700/60 px-4 py-3 text-sm font-medium text-white">
            <CheckCircle2 className="h-5 w-5 text-brand-300" />
            Thanks for subscribing! Check your inbox for your code.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="h-12 flex-1 rounded-lg border border-brand-600 bg-brand-700/40 px-4 text-sm text-white placeholder:text-brand-200 focus:border-brand-300 focus:outline-none focus:ring-4 focus:ring-brand-500/30"
            />
            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-white px-7 text-sm font-semibold text-brand-800 transition-all duration-200 hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
            >
              Subscribe
            </button>
          </form>
        )}
        <p className="mt-4 text-xs text-brand-200">
          By subscribing you agree to our Privacy Policy. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
