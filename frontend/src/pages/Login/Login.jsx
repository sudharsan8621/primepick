import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../../redux/slices/authSlice';
import { HiEye, HiEyeOff } from 'react-icons/hi';
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
    if (isAuthenticated) navigate(from, { replace: true });
  }, [isAuthenticated, navigate, from]);

  useEffect(() => {
    return () => { dispatch(clearError()); };
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className="auth-page">

      {/* Left Panel */}
      <div className="auth-left">
        <div className="auth-left-content">

          <div className="auth-brand">
            <span className="auth-brand-icon">🛍️</span>
            <span className="auth-brand-name">PrimePick</span>
          </div>

          <h2 className="auth-left-title">
            Shop the<br />
            <span>Best Deals</span><br />
            Online.
          </h2>

          <p className="auth-left-subtitle">
            Millions of products at your fingertips.
            Fast delivery, easy returns, secure payments.
          </p>

          <div className="auth-left-features">
            <div className="auth-feature-item">
              <div className="auth-feature-dot"></div>
              <span className="auth-feature-text">
                Free delivery on orders above ₹999
              </span>
            </div>
            <div className="auth-feature-item">
              <div className="auth-feature-dot"></div>
              <span className="auth-feature-text">
                7-day hassle free returns
              </span>
            </div>
            <div className="auth-feature-item">
              <div className="auth-feature-dot"></div>
              <span className="auth-feature-text">
                100% secure & encrypted payments
              </span>
            </div>
            <div className="auth-feature-item">
              <div className="auth-feature-dot"></div>
              <span className="auth-feature-text">
                24/7 customer support
              </span>
            </div>
          </div>

          <div className="auth-left-bottom">
            <div className="auth-stats">
              <div className="auth-stat">
                <h4>50K+</h4>
                <p>Products</p>
              </div>
              <div className="auth-stat">
                <h4>2M+</h4>
                <p>Customers</p>
              </div>
              <div className="auth-stat">
                <h4>4.8★</h4>
                <p>Rating</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Right Panel */}
      <div className="auth-right">
        <div className="auth-form-container">

          <div className="auth-header">
            <h1>Sign In</h1>
            <p>Welcome back! Enter your credentials to continue.</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">

            {error && (
              <div className="auth-error">{error}</div>
            )}

            {/* Email */}
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-wrapper">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-wrapper password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword
                    ? <HiEyeOff className="eye-icon" />
                    : <HiEye className="eye-icon" />
                  }
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
                'Sign In'
              )}
            </button>

          </form>

          <div className="auth-footer">
            <p>
              Don't have an account?{' '}
              <Link to="/register">Create Account</Link>
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Login;