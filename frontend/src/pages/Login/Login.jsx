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

  const fillAdminCredentials = () => {
    setEmail('admin@primepick.com');
    setPassword('admin123');
  };

  return (
    <div className="auth-page">

      {/* Left Side */}
      <div className="auth-left">
        <div className="auth-left-content">
          <div className="auth-brand">
            <span className="auth-brand-icon">🛍️</span>
            <span className="auth-brand-name">PrimePick</span>
          </div>

          <div className="auth-left-image">🛒</div>

          <h2 className="auth-left-title">
            Shop Smarter,<br />Live Better!
          </h2>
          <p className="auth-left-subtitle">
            Discover amazing products at unbeatable prices.
            Your perfect shopping experience awaits!
          </p>

          <div className="auth-left-features">
            <div className="auth-feature-item">
              <span className="auth-feature-icon">🚚</span>
              <div className="auth-feature-text">
                <h4>Free Delivery</h4>
                <p>On orders above ₹999</p>
              </div>
            </div>
            <div className="auth-feature-item">
              <span className="auth-feature-icon">🔒</span>
              <div className="auth-feature-text">
                <h4>Secure Payment</h4>
                <p>100% safe transactions</p>
              </div>
            </div>
            <div className="auth-feature-item">
              <span className="auth-feature-icon">↩️</span>
              <div className="auth-feature-text">
                <h4>Easy Returns</h4>
                <p>7 day return policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="auth-right">
        <div className="auth-form-container">

          <div className="auth-header">
            <h1>Welcome Back! 👋</h1>
            <p>Sign in to continue your shopping journey</p>
          </div>

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
              <span>or try demo account</span>
            </div>

            {/* Demo Box */}
            <div className="demo-box">
              <p>🛠️ Admin Demo Credentials</p>
              <div className="demo-credentials-list">
                <span>📧 admin@primepick.com</span>
                <span>🔑 admin123</span>
              </div>
              <button
                type="button"
                className="demo-fill-btn"
                onClick={fillAdminCredentials}
              >
                ⚡ Auto Fill
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
      </div>

    </div>
  );
};

export default Login;