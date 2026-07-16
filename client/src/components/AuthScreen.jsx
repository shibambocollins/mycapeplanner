import React, { useState } from 'react';
import { Compass } from 'lucide-react';
import { register, login } from '../services/api';

const AuthScreen = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError('');

    if (!email || !password || (!isLogin && !name)) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      const user = isLogin
        ? await login({ email, password })
        : await register({ name, email, password });
      onLogin(user);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#FAF6F1] selection:bg-[#E8734A] selection:text-white">
      {/* Left side - Beautiful Hero Image */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80&w=1200&auto=format&fit=crop"
          className="w-full h-full object-cover"
          alt="Cape Town"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#146B71]/90 via-[#146B71]/30 to-transparent"></div>
        <div className="absolute bottom-16 left-16 right-16">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/30">
            <Compass size={36} color="white" strokeWidth={1.5} />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4 leading-tight">Discover the magic of Cape Town.</h1>
          <p className="text-xl text-white/90 font-medium">Your premium AI-powered local companion awaits.</p>
        </div>
      </div>

      {/* Right side - Form Container */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-10 lg:p-24 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="flex items-center gap-3 mb-16 lg:hidden">
            <div className="w-12 h-12 bg-[#E8734A] rounded-xl flex items-center justify-center shadow-md">
              <Compass size={28} color="white" strokeWidth={2} />
            </div>
            <h1 className="text-2xl font-bold text-[#2D2A26] tracking-tight">MyCapePlanner</h1>
          </div>

          <h2 className="text-4xl font-bold text-[#2D2A26] mb-3">
            {isLogin ? 'Welcome back' : 'Create account'}
          </h2>
          <p className="text-gray-500 text-lg mb-10">
            {isLogin ? 'Enter your details to access your itineraries.' : 'Start planning your dream Cape Town trip today.'}
          </p>

          {error && (
            <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">
              {error}
            </div>
          )}

          {/* Form Fields */}
          <div className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="Alex Johnson"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-[#146B71] focus:bg-white transition-all text-base"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
              <input
                type="email"
                placeholder="alex@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-[#146B71] focus:bg-white transition-all text-base"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-[#146B71] focus:bg-white transition-all text-base"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-4 bg-[#146B71] text-white rounded-2xl text-lg font-bold hover:bg-[#0f5257] transition-all shadow-lg shadow-[#146B71]/20 mt-4 active:scale-[0.98] disabled:opacity-60"
            >
              {loading ? 'Please wait...' : isLogin ? 'Log In' : 'Sign Up'}
            </button>
          </div>

          <div className="mt-10 text-center">
            <p className="text-gray-500 font-medium">
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                }}
                className="text-[#E8734A] font-bold hover:underline"
              >
                {isLogin ? 'Sign up' : 'Log in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
