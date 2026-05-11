import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearError } from '../../redux/slices/authSlice';
import './Register.css';

const EyeIcon = () => (
  <svg className="eye-icon" viewBox="0 0 24 24">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const EyeOffIcon = () => (
  <svg className="eye-icon" viewBox="0 0 24 24">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    return () => { dispatch(clearError()); };
  }, [dispatch]);

  const checkStrength = (password) => {
    if (!password) return '';
    if (password.length < 6) return 'weak';
    if (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password)
    ) return 'strong';
    return 'medium';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (name === 'password') setPasswordStrength(checkStrength(value));
  };

  const validate = () => {
    const errors = {};
    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      errors.username = 'Minimum 3 characters required';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      errors.username = 'Only letters, numbers and underscore allowed';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Minimum 6 characters required';
    }
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    dispatch(register({
      username: formData.username,
      email: formData.email,
      password: formData.password,
    }));
  };

  const strengthLabel = {
    weak: 'Weak password',
    medium: 'Medium strength',
    strong: 'Strong password',
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
            Join<br />
            <span>Millions</span> of<br />
            Shoppers.
          </h2>

          <p className="auth-left-subtitle">
            Create your free account today and unlock
            exclusive deals, fast delivery, and more.
          </p>

          <div className="auth-left-features">
            <div className="auth-feature-item">
              <div className="auth-feature-dot"></div>
              <span className="auth-feature-text">
                Access to exclusive member deals
              </span>
            </div>
            <div className="auth-feature-item">
              <div className="auth-feature-dot"></div>
              <span className="auth-feature-text">
                Save items to your wishlist
              </span>
            </div>
            <div className="auth-feature-item">
              <div className="auth-feature-dot"></div>
              <span className="auth-feature-text">
                Track your orders in real time
              </span>
            </div>
            <div className="auth-feature-item">
              <div className="auth-feature-dot"></div>
              <span className="auth-feature-text">
                Fast & secure checkout
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
                <h4>Free</h4>
                <p>To Join</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Right Panel */}
      <div className="auth-right">
        <div className="auth-form-container">

          <div className="auth-header">
            <h1>Create Account</h1>
            <p>Fill in your details to get started.</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">

            {error && (
              <div className="auth-error">{error}</div>
            )}

            {/* Username */}
            <div className="form-group">
              <label className="form-label">Username</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={`form-input ${
                    validationErrors.username ? 'input-error' : ''
                  }`}
                  placeholder="johndoe"
                  autoComplete="username"
                />
              </div>
              {validationErrors.username && (
                <span className="field-error">
                  {validationErrors.username}
                </span>
              )}
            </div>

            {/* Email */}
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-wrapper">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-input ${
                    validationErrors.email ? 'input-error' : ''
                  }`}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>
              {validationErrors.email && (
                <span className="field-error">
                  {validationErrors.email}
                </span>
              )}
            </div>

            {/* Password */}
            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-wrapper password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`form-input ${
                    validationErrors.password ? 'input-error' : ''
                  }`}
                  placeholder="Min. 6 characters"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>

              {formData.password && (
                <div className="password-strength">
                  <div className="strength-bar">
                    <div className={`strength-fill ${passwordStrength}`} />
                  </div>
                  <span className={`strength-text ${passwordStrength}`}>
                    {strengthLabel[passwordStrength]}
                  </span>
                </div>
              )}

              {validationErrors.password && (
                <span className="field-error">
                  {validationErrors.password}
                </span>
              )}
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <div className="input-wrapper password-wrapper">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`form-input ${
                    validationErrors.confirmPassword ? 'input-error' : ''
                  }`}
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                  {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              {validationErrors.confirmPassword && (
                <span className="field-error">
                  {validationErrors.confirmPassword}
                </span>
              )}
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
                  Creating Account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>

            <p className="terms-text">
              By signing up, you agree to our{' '}
              <a href="#">Terms of Service</a> and{' '}
              <a href="#">Privacy Policy</a>
            </p>

          </form>

          <div className="auth-footer">
            <p>
              Already have an account?{' '}
              <Link to="/login">Sign In</Link>
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Register;