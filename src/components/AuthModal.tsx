import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User as UserIcon, Github, Twitch, Info, Gamepad2, ArrowRight } from 'lucide-react';
import { supabase } from '../supabaseClient';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthState = 'login' | 'register' | 'reset';

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [authState, setAuthState] = useState<AuthState>('login');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Clear state when changing modes
  useEffect(() => {
    setErrorMsg(null);
    setEmail('');
    setPassword('');
    setUsername('');
  }, [authState]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#06070a]/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl bg-[#0b0c15]/90 border border-slate-800 shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row backdrop-blur-xl z-10 isolate"
          >
            {/* Left Side - Visual Panel (hidden on small screens) */}
            <div className="hidden md:flex relative w-[45%] lg:w-1/2 flex-col justify-between overflow-hidden p-10 select-none">
              {/* Background Art & Effects */}
              <div className="absolute inset-0 z-0">
                <img 
                  src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1000" 
                  alt="Gaming background" 
                  className="w-full h-full object-cover opacity-30 transform scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0b0c15] via-[#0b0c15]/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c15] via-transparent to-transparent" />
              </div>

              {/* Top - Logo */}
              <div className="relative z-10 flex items-center gap-2">
                <div className="text-[#00d4ff]">
                  <Gamepad2 className="w-8 h-8" />
                </div>
                <span className="font-display font-bold text-2xl tracking-tight text-[#00d4ff]">
                  Game<span className="bg-clip-text text-transparent bg-gradient-to-r from-[#3b82f6] to-[#a855f7]">Library</span>
                </span>
              </div>

              {/* Middle - Tagline */}
              <div className="relative z-10 mt-12 space-y-4">
                <h2 className="text-3xl lg:text-4xl font-display font-bold text-white leading-tight">
                  Track games, discover deals, stay connected to gaming.
                </h2>
                <div className="w-12 h-1 bg-gradient-to-r from-[#3b82f6] to-[#a855f7] rounded-full" />
              </div>

              {/* Bottom - Stats */}
              <div className="relative z-10 mt-auto space-y-4 font-mono text-xs uppercase tracking-widest text-[#00d4ff]">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-pulse" />
                  120,000+ tracked games
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#a855f7] animate-pulse" style={{ animationDelay: '0.3s' }} />
                  Live gaming industry updates
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00e676] animate-pulse" style={{ animationDelay: '0.6s' }} />
                  Real-time deal tracking
                </div>
              </div>
            </div>

            {/* Right Side - Auth Panel */}
            <div className="relative w-full md:w-[55%] lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center min-h-[500px]">
              {/* Close Button */}
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <AnimatePresence mode="wait">
                {/* ---------------- LOGIN STATE ---------------- */}
                {authState === 'login' && (
                  <motion.div
                    key="login"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    <div className="space-y-2">
                      <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">Welcome Back</h3>
                      <p className="text-slate-400 text-sm">Access your wishlist, reviews, deals, and gaming profile.</p>
                    </div>

                    <form className="space-y-4" onSubmit={async (e) => {
                      e.preventDefault();
                      setErrorMsg(null);
                      setIsLoading(true);
                      const { error } = await supabase.auth.signInWithPassword({ email, password });
                      setIsLoading(false);
                      if (error) {
                        setErrorMsg(error.message);
                      } else {
                        onClose();
                        window.location.reload();
                      }
                    }}>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Email</label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                          <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email" 
                            className="w-full bg-[#11121d] border border-slate-700/50 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-[#00b0ff] focus:ring-1 focus:ring-[#00b0ff] transition-all"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Password</label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                          <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password" 
                            className="w-full bg-[#11121d] border border-slate-700/50 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-[#00b0ff] focus:ring-1 focus:ring-[#00b0ff] transition-all"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <div className="relative w-4 h-4 rounded border border-slate-600 bg-[#11121d] group-hover:border-[#00b0ff] transition-colors flex items-center justify-center">
                            <input type="checkbox" className="opacity-0 absolute inset-0 cursor-pointer peer" />
                            <svg className="w-3 h-3 text-[#00b0ff] opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </div>
                          <span className="text-sm text-slate-300 group-hover:text-white transition-colors">Remember me</span>
                        </label>
                        <button 
                          type="button" 
                          onClick={() => setAuthState('reset')}
                          className="text-sm text-[#00b0ff] hover:text-[#00d4ff] hover:underline transition-colors"
                        >
                          Forgot Password?
                        </button>
                      </div>

                      <button disabled={isLoading} className="w-full py-3.5 bg-[#00b0ff] hover:bg-[#0090ff] text-white font-bold rounded-xl shadow-[0_0_20px_rgba(0,176,255,0.2)] hover:shadow-[0_0_30px_rgba(0,176,255,0.4)] transition-all transform hover:-translate-y-0.5 mt-2 disabled:opacity-50">
                        {isLoading ? 'Signing In...' : 'Sign In'}
                      </button>
                      {errorMsg && <p className="text-red-500 text-sm mt-2 text-center">{errorMsg}</p>}
                    </form>

                    <div className="relative flex items-center py-2">
                      <div className="flex-1 border-t border-slate-800" />
                      <span className="px-4 text-xs font-mono text-slate-500 uppercase tracking-widest">or connect with</span>
                      <div className="flex-1 border-t border-slate-800" />
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                      <button className="flex items-center justify-center gap-2 py-2.5 bg-[#11121d] hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white rounded-lg transition-all group">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M11.99 13.9v-3.72h9.36c.14.63.25 1.22.25 2.05 0 5.71-3.83 9.77-9.6 9.77-5.52 0-10-4.48-10-10S6.48 2 12 2c2.7 0 4.96.99 6.69 2.61l-2.84 2.85c-.72-.68-1.98-1.48-3.85-1.48-3.31 0-6.01 2.75-6.01 6.02s2.7 6.02 6.01 6.02c3.94 0 5.4-2.82 5.62-4.12H11.99z" />
                        </svg>
                        <span className="text-sm font-medium">Google</span>
                      </button>
                      <button className="flex items-center justify-center gap-2 py-2.5 bg-[#171a21] hover:bg-[#2a475e] border border-slate-700 text-slate-300 hover:text-white rounded-lg transition-all group">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M11.97 0C5.353 0 0 5.353 0 11.97c0 4.248 2.222 7.983 5.564 10.15l2.254-6.398c-1.127-.267-1.992-1.282-1.992-2.518 0-1.411 1.155-2.566 2.566-2.566 1.411 0 2.566 1.155 2.566 2.566 0 .521-.168 1.002-.442 1.398L13.1 12.16c.123-.314.19-.661.19-1.026 0-1.802-1.472-3.275-3.274-3.275-1.802 0-3.275 1.473-3.275 3.275 0 .736.25 1.415.661 1.956l-2.03 5.76C9.176 23.36 10.536 24 11.97 24 18.587 24 24 18.647 24 11.97 24 5.353 18.587 0 11.97 0zm6.822 6.914c-1.802 0-3.274 1.473-3.274 3.274 0-1.801-1.473-3.274-3.275-3.274-1.802 0-3.275 1.473-3.275 3.274 0 1.802 1.473 3.275 3.275 3.275 1.802 0 3.275-1.473 3.275-3.275 0 1.802 1.472 3.275 3.274 3.275 1.802 0 3.275-1.473 3.275-3.275 0-1.801-1.473-3.274-3.275-3.274z"/>
                        </svg>
                        <span className="text-sm font-medium">Steam</span>
                      </button>
                      <button className="col-span-2 lg:col-span-1 flex items-center justify-center gap-2 py-2.5 bg-[#5865F2]/10 hover:bg-[#5865F2]/20 border border-[#5865F2]/30 text-[#5865F2] hover:text-white rounded-lg transition-all group">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                        </svg>
                        <span className="text-sm font-medium">Discord</span>
                      </button>
                    </div>

                    <div className="text-center pt-2">
                      <p className="text-sm text-slate-400">
                        New to GameLibrary? {' '}
                        <button 
                          onClick={() => setAuthState('register')}
                          className="text-[#a855f7] hover:text-[#d8b4fe] font-bold hover:underline transition-colors"
                        >
                          Create Account
                        </button>
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* ---------------- REGISTER STATE ---------------- */}
                {authState === 'register' && (
                  <motion.div
                    key="register"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    <div className="space-y-2">
                      <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">Join the Community</h3>
                      <p className="text-slate-400 text-sm">Create an account to track your games and get personalized deals.</p>
                    </div>

                    <form className="space-y-4" onSubmit={async (e) => {
                      e.preventDefault();
                      setErrorMsg(null);
                      setIsLoading(true);
                      const { data, error } = await supabase.auth.signUp({ 
                        email, 
                        password,
                        options: {
                          data: {
                            username: username || email.split('@')[0],
                          }
                        }
                      });
                      
                      if (!error && data?.user) {
                        // Create their profile entry
                        const { error: profileError } = await supabase.from('profiles').upsert({
                          id: data.user.id,
                          nickname: username || email.split('@')[0]
                        });
                        
                        if (profileError) {
                          console.error("Failed to create profile:", profileError.message);
                        }
                      }

                      setIsLoading(false);
                      if (error) {
                        setErrorMsg(error.message);
                      } else {
                        onClose();
                        window.location.reload();
                      }
                    }}>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Username</label>
                          <div className="relative">
                            <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input 
                              type="text" 
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              placeholder="Choose a username" 
                              className="w-full bg-[#11121d] border border-slate-700/50 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7] transition-all"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Email</label>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input 
                              type="email" 
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                              placeholder="Enter your email" 
                              className="w-full bg-[#11121d] border border-slate-700/50 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7] transition-all"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Password</label>
                          <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input 
                              type="password" 
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                              placeholder="Create a password" 
                              className="w-full bg-[#11121d] border border-slate-700/50 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7] transition-all"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Confirm Password</label>
                          <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input 
                              type="password" 
                              placeholder="Confirm password" 
                              className="w-full bg-[#11121d] border border-slate-700/50 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7] transition-all"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="pt-2">
                        <label className="flex items-start gap-3 cursor-pointer group">
                          <div className="relative w-4 h-4 rounded border border-slate-600 bg-[#11121d] group-hover:border-[#a855f7] transition-colors mt-0.5 shrink-0 flex items-center justify-center">
                            <input type="checkbox" className="opacity-0 absolute inset-0 cursor-pointer peer" />
                            <svg className="w-3 h-3 text-[#a855f7] opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </div>
                          <span className="text-xs text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                            I agree to the <a href="#" className="text-[#a855f7] hover:underline">Terms of Service</a> and <a href="#" className="text-[#a855f7] hover:underline">Privacy Policy</a>
                          </span>
                        </label>
                      </div>

                      <button disabled={isLoading} className="w-full py-3.5 bg-gradient-to-r from-[#a855f7] to-[#8b5cf6] hover:from-[#9333ea] hover:to-[#7c3aed] text-white font-bold rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.2)] hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all transform hover:-translate-y-0.5 mt-2 disabled:opacity-50">
                        {isLoading ? 'Creating Account...' : 'Create Account'}
                      </button>
                      {errorMsg && <p className="text-red-500 text-sm mt-2 text-center">{errorMsg}</p>}
                    </form>

                    <div className="text-center pt-2">
                      <p className="text-sm text-slate-400">
                        Already have an account? {' '}
                        <button 
                          onClick={() => setAuthState('login')}
                          className="text-[#00b0ff] hover:text-[#00d4ff] font-bold hover:underline transition-colors"
                        >
                          Sign In
                        </button>
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* ---------------- RESET PASSWORD STATE ---------------- */}
                {authState === 'reset' && (
                  <motion.div
                    key="reset"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    <div className="space-y-2">
                      <button 
                        onClick={() => setAuthState('login')}
                        className="flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-colors mb-6"
                      >
                        <ArrowRight className="w-4 h-4 rotate-180" /> Back to login
                      </button>
                      <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">Reset Password</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">Enter the email associated with your account and we'll send you a link to reset your password.</p>
                    </div>

                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Email</label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                          <input 
                            type="email" 
                            placeholder="Enter your email" 
                            className="w-full bg-[#11121d] border border-slate-700/50 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-[#00e676] focus:ring-1 focus:ring-[#00e676] transition-all"
                          />
                        </div>
                      </div>

                      <button className="w-full py-3.5 bg-[#00e676] hover:bg-[#00c853] text-[#003300] font-black rounded-xl shadow-[0_0_20px_rgba(0,230,118,0.2)] hover:shadow-[0_0_30px_rgba(0,230,118,0.4)] transition-all transform hover:-translate-y-0.5">
                        Send Reset Link
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
