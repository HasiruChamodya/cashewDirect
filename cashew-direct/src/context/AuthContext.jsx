import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

const USERS_KEY = 'cd_users';
const SESSION_KEY = 'cd_session';

function loadUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function loadSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function toSafeUser(user) {
  const safe = { ...user };
  delete safe.password;
  return safe;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadSession);

  useEffect(() => {
    if (user) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(SESSION_KEY);
    }
  }, [user]);

  function login(email, password) {
    const normalizedEmail = email.trim().toLowerCase();
    const users = loadUsers();
    const found = users.find((u) => u.email.toLowerCase() === normalizedEmail);

    if (!found) {
      return { success: false, error: 'No account found with this email address.' };
    }
    if (found.password !== password) {
      return { success: false, error: 'Incorrect password. Please try again.' };
    }

    const safeUser = toSafeUser(found);
    setUser(safeUser);
    return { success: true, user: safeUser };
  }

  function signup({ fullName, email, phone, password, role, sellerProfile }) {
    const normalizedEmail = email.trim().toLowerCase();
    const users = loadUsers();

    if (users.some((u) => u.email.toLowerCase() === normalizedEmail)) {
      return { success: false, error: 'An account with this email already exists.' };
    }
    if (users.some((u) => u.phone === phone)) {
      return { success: false, error: 'An account with this phone number already exists.' };
    }
    if (role === 'seller' && users.some((u) => u.sellerProfile?.storeSlug === sellerProfile.storeSlug)) {
      return { success: false, error: 'This store URL is already taken. Please choose another.' };
    }

    const newUser = {
      id: `usr_${Date.now()}`,
      fullName,
      email: email.trim(),
      phone,
      password,
      isBuyer: role === 'buyer',
      isSeller: role === 'seller',
      sellerProfile: role === 'seller' ? sellerProfile : null,
      createdAt: new Date().toISOString(),
    };

    saveUsers([...users, newUser]);

    const safeUser = toSafeUser(newUser);
    setUser(safeUser);
    return { success: true, user: safeUser };
  }

  function logout() {
    setUser(null);
  }

  function updateProfile(updates) {
    if (!user) return;
    const users = loadUsers();
    saveUsers(users.map((u) => (u.id === user.id ? { ...u, ...updates } : u)));
    setUser((prev) => ({ ...prev, ...updates }));
  }

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
