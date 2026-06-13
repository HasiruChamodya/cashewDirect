import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Phone,
  User,
  ShoppingBag,
  Store,
  UserPlus,
  AlertCircle,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { isValidEmail, isValidPhone, getPasswordStrength, slugify } from '../lib/validation';
import { BUSINESS_TYPES } from '../lib/constants';
import AuthLayout from '../components/auth/AuthLayout';
import Button from '../components/ui/Button';
import Input, { Label, Select, Textarea } from '../components/ui/Input';

const INITIAL_FORM = {
  fullName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  storeName: '',
  storeSlug: '',
  businessType: 'individual',
  businessRegNumber: '',
  tagline: '',
  description: '',
  terms: false,
};

export default function Signup() {
  const { signup } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [role, setRole] = useState('buyer');
  const [form, setForm] = useState(INITIAL_FORM);
  const [slugTouched, setSlugTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined, form: undefined }));
  }

  function validate() {
    const next = {};

    if (!form.fullName.trim()) next.fullName = 'Full name is required.';

    if (!form.email.trim()) next.email = 'Email is required.';
    else if (!isValidEmail(form.email)) next.email = 'Enter a valid email address.';

    if (!form.phone.trim()) next.phone = 'Phone number is required.';
    else if (!isValidPhone(form.phone)) next.phone = 'Enter a valid Sri Lankan phone number, e.g. +94 77 123 4567.';

    if (!form.password) next.password = 'Password is required.';
    else if (form.password.length < 8) next.password = 'Password must be at least 8 characters.';

    if (!form.confirmPassword) next.confirmPassword = 'Please confirm your password.';
    else if (form.confirmPassword !== form.password) next.confirmPassword = 'Passwords do not match.';

    if (role === 'seller') {
      if (!form.storeName.trim()) next.storeName = 'Store name is required.';
      else if (form.storeName.trim().length > 120) next.storeName = 'Store name must be 120 characters or fewer.';

      if (!form.storeSlug.trim()) next.storeSlug = 'Store URL is required.';
      else if (!/^[a-z0-9-]+$/.test(form.storeSlug)) {
        next.storeSlug = 'Use lowercase letters, numbers and hyphens only.';
      }

      if (!form.businessType) next.businessType = 'Select a business type.';

      if (form.businessType !== 'individual' && !form.businessRegNumber.trim()) {
        next.businessRegNumber = 'Business registration number is required for this business type.';
      }
    }

    if (!form.terms) next.terms = 'You must agree to the Terms of Service and Privacy Policy.';

    return next;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      const firstError = document.getElementById(Object.keys(validationErrors)[0]);
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setSubmitting(true);
    const result = signup({
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      password: form.password,
      role,
      sellerProfile:
        role === 'seller'
          ? {
              storeName: form.storeName.trim(),
              storeSlug: form.storeSlug.trim(),
              businessType: form.businessType,
              businessRegNumber: form.businessRegNumber.trim(),
              tagline: form.tagline.trim(),
              description: form.description.trim(),
            }
          : null,
    });
    setSubmitting(false);

    if (!result.success) {
      setErrors({ form: result.error });
      return;
    }

    showToast(
      role === 'seller'
        ? `Welcome to Kaju.live, ${result.user.sellerProfile.storeName}!`
        : `Welcome to Kaju.live, ${result.user.fullName.split(' ')[0]}!`
    );
    navigate('/account', { replace: true });
  }

  const strength = getPasswordStrength(form.password);

  return (
    <AuthLayout
      icon={UserPlus}
      title="Create your account"
      subtitle="Join Kaju.live to shop fresh cashews or start selling your own."
      wide
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-brand-600 hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      {/* Role switch */}
      <div className="mb-6 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setRole('buyer')}
          className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition ${
            role === 'buyer'
              ? 'border-brand-500 bg-brand-50/60 ring-1 ring-brand-500'
              : 'border-gray-200 hover:border-brand-300'
          }`}
        >
          <ShoppingBag className={`h-5 w-5 ${role === 'buyer' ? 'text-brand-600' : 'text-gray-400'}`} />
          <span className={`text-sm font-semibold ${role === 'buyer' ? 'text-brand-800' : 'text-gray-700'}`}>
            I&apos;m a Buyer
          </span>
          <span className="text-xs text-gray-500">Shop fresh cashews & gift boxes</span>
        </button>
        <button
          type="button"
          onClick={() => setRole('seller')}
          className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition ${
            role === 'seller'
              ? 'border-brand-500 bg-brand-50/60 ring-1 ring-brand-500'
              : 'border-gray-200 hover:border-brand-300'
          }`}
        >
          <Store className={`h-5 w-5 ${role === 'seller' ? 'text-brand-600' : 'text-gray-400'}`} />
          <span className={`text-sm font-semibold ${role === 'seller' ? 'text-brand-800' : 'text-gray-700'}`}>
            I&apos;m a Seller
          </span>
          <span className="text-xs text-gray-500">Open your own cashew storefront</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        {errors.form && (
          <div className="flex items-start gap-2.5 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            {errors.form}
          </div>
        )}

        {/* Account details */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label htmlFor="fullName" required>
              Full name
            </Label>
            <div className="relative">
              <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                id="fullName"
                autoComplete="name"
                className="pl-10"
                error={errors.fullName}
                value={form.fullName}
                onChange={(e) => update('fullName', e.target.value)}
                placeholder="Your full name"
              />
            </div>
            {errors.fullName && <p className="mt-1.5 text-xs font-medium text-red-500">{errors.fullName}</p>}
          </div>

          <div>
            <Label htmlFor="email" required>
              Email address
            </Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                id="email"
                type="email"
                autoComplete="email"
                className="pl-10"
                error={errors.email}
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            {errors.email && <p className="mt-1.5 text-xs font-medium text-red-500">{errors.email}</p>}
          </div>

          <div>
            <Label htmlFor="phone" required>
              Phone number
            </Label>
            <div className="relative">
              <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                id="phone"
                type="tel"
                autoComplete="tel"
                className="pl-10"
                error={errors.phone}
                value={form.phone}
                onChange={(e) => update('phone', e.target.value)}
                placeholder="+94 7X XXX XXXX"
              />
            </div>
            {errors.phone && <p className="mt-1.5 text-xs font-medium text-red-500">{errors.phone}</p>}
          </div>

          <div>
            <Label htmlFor="password" required>
              Password
            </Label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                className="pl-10 pr-10"
                error={errors.password}
                value={form.password}
                onChange={(e) => update('password', e.target.value)}
                placeholder="At least 8 characters"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-600"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {form.password && (
              <div className="mt-2">
                <div className="flex gap-1">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        i < strength.score ? strength.barColor : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <p className={`mt-1 text-xs font-medium ${strength.textColor}`}>{strength.label}</p>
              </div>
            )}
            {errors.password && <p className="mt-1.5 text-xs font-medium text-red-500">{errors.password}</p>}
          </div>

          <div>
            <Label htmlFor="confirmPassword" required>
              Confirm password
            </Label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                id="confirmPassword"
                type={showConfirm ? 'text' : 'password'}
                autoComplete="new-password"
                className="pl-10 pr-10"
                error={errors.confirmPassword}
                value={form.confirmPassword}
                onChange={(e) => update('confirmPassword', e.target.value)}
                placeholder="Re-enter your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((s) => !s)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-600"
                aria-label={showConfirm ? 'Hide password' : 'Show password'}
              >
                {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1.5 text-xs font-medium text-red-500">{errors.confirmPassword}</p>
            )}
          </div>
        </div>

        {/* Seller-only store details */}
        {role === 'seller' && (
          <div className="flex flex-col gap-4 rounded-xl border border-brand-100 bg-brand-50/50 p-4">
            <p className="flex items-center gap-2 text-sm font-bold text-brand-800">
              <Store className="h-4 w-4" /> Store details
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="storeName" required>
                  Store name
                </Label>
                <Input
                  id="storeName"
                  error={errors.storeName}
                  value={form.storeName}
                  onChange={(e) => {
                    const value = e.target.value;
                    setForm((f) => ({
                      ...f,
                      storeName: value,
                      storeSlug: slugTouched ? f.storeSlug : slugify(value),
                    }));
                    setErrors((err) => ({ ...err, storeName: undefined, form: undefined }));
                  }}
                  placeholder="e.g. Heshan's Cashew Farm"
                  maxLength={120}
                />
                {errors.storeName && <p className="mt-1.5 text-xs font-medium text-red-500">{errors.storeName}</p>}
              </div>

              <div>
                <Label htmlFor="storeSlug" required>
                  Store URL
                </Label>
                <Input
                  id="storeSlug"
                  error={errors.storeSlug}
                  value={form.storeSlug}
                  onChange={(e) => {
                    setSlugTouched(true);
                    update('storeSlug', slugify(e.target.value));
                  }}
                  placeholder="your-store-name"
                />
                <p className="mt-1.5 truncate text-xs text-gray-500">
                  kaju.live/store/<span className="font-semibold text-brand-700">{form.storeSlug || 'your-store-name'}</span>
                </p>
                {errors.storeSlug && <p className="mt-1.5 text-xs font-medium text-red-500">{errors.storeSlug}</p>}
              </div>

              <div>
                <Label htmlFor="businessType" required>
                  Business type
                </Label>
                <Select
                  id="businessType"
                  value={form.businessType}
                  onChange={(e) => update('businessType', e.target.value)}
                >
                  {BUSINESS_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </Select>
                {errors.businessType && <p className="mt-1.5 text-xs font-medium text-red-500">{errors.businessType}</p>}
              </div>

              <div>
                <Label htmlFor="businessRegNumber" required={form.businessType !== 'individual'}>
                  Business registration number
                </Label>
                <Input
                  id="businessRegNumber"
                  error={errors.businessRegNumber}
                  value={form.businessRegNumber}
                  onChange={(e) => update('businessRegNumber', e.target.value)}
                  placeholder={form.businessType === 'individual' ? 'Optional' : 'Required for this business type'}
                />
                {errors.businessRegNumber && (
                  <p className="mt-1.5 text-xs font-medium text-red-500">{errors.businessRegNumber}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <Label htmlFor="tagline">Store tagline</Label>
                <Input
                  id="tagline"
                  value={form.tagline}
                  onChange={(e) => update('tagline', e.target.value)}
                  placeholder="A short line that describes your store"
                  maxLength={160}
                />
              </div>

              <div className="sm:col-span-2">
                <Label htmlFor="description">Store description</Label>
                <Textarea
                  id="description"
                  rows={3}
                  value={form.description}
                  onChange={(e) => update('description', e.target.value)}
                  placeholder="Tell buyers about your farm, products and what makes them special (optional)"
                />
              </div>
            </div>
          </div>
        )}

        <label className="flex items-start gap-2.5 text-sm text-gray-600">
          <input
            id="terms"
            type="checkbox"
            checked={form.terms}
            onChange={(e) => update('terms', e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-brand-500"
          />
          <span>
            I agree to the{' '}
            <Link to="/" className="font-semibold text-brand-600 hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/" className="font-semibold text-brand-600 hover:underline">
              Privacy Policy
            </Link>
          </span>
        </label>
        {errors.terms && <p className="-mt-2 text-xs font-medium text-red-500">{errors.terms}</p>}

        <Button type="submit" fullWidth size="lg" disabled={submitting} className="mt-1">
          {submitting ? 'Creating account…' : role === 'seller' ? 'Create Seller Account' : 'Create Account'}
        </Button>
      </form>
    </AuthLayout>
  );
}
