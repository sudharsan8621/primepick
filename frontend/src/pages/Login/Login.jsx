import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../../redux/slices/authSlice';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  // Demo admin fill
  const fillAdminCredentials = () => {
    setEmail('admin@primepick.com');
    setPassword('admin123');
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">

          {/* Logo */}
          <div className="auth-logo">
            <span className="auth-logo-icon">🛍️</span>
            <span className="auth-logo-text">PrimePick</span>
          </div>

          {/* Header */}
          <div className="auth-header">
            <h1>Welcome Back! 👋</h1>
            <p>Sign in to continue your shopping journey</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="auth-form">

            {error && (
              <div className="auth-error">
                ⚠️ {error}
              </div>
            )}

            {/* Email */}
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-group">
                <span className="input-icon">📧</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  placeholder="Enter your email"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-group">
                <span className="input-icon">🔒</span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input has-toggle"
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >
              {loading ? (
                <span className="btn-loading">
                  <span className="spinner"></span>
                  Signing in...
                </span>
              ) : (
                '🚀 Sign In'
              )}
            </button>

            {/* Divider */}
            <div className="auth-divider">
              <span>or try demo</span>
            </div>

            {/* Demo Credentials */}
            <div className="demo-credentials">
              <p>🛠️ Admin Demo</p>
              <button
                type="button"
                className="demo-btn"
                onClick={fillAdminCredentials}
              >
                Fill Admin Credentials
              </button>
            </div>

          </form>

          {/* Footer */}
          <div className="auth-footer">
            <p>
              Don't have an account?{' '}
              <Link to="/register">Create one free →</Link>
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="auth-features">
          <div className="auth-feature">
            <span>🔒</span>
            <span>Secure Login</span>
          </div>
          <div className="auth-feature">
            <span>🚚</span>
            <span>Free Shipping</span>
          </div>
          <div className="auth-feature">
            <span>↩️</span>
            <span>Easy Returns</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;