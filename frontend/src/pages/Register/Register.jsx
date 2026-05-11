import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearError } from '../../redux/slices/authSlice';
import './Register.css';

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
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  // Password Strength Check
  const checkPasswordStrength = (password) => {
    if (password.length === 0) return '';
    if (password.length < 6) return 'weak';
    if (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password)
    ) {
      return 'strong';
    }
    return 'medium';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field error
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: '' }));
    }

    // Password strength
    if (name === 'password') {
      setPasswordStrength(checkPasswordStrength(value));
    }
  };

  const validate = () => {
    const errors = {};

    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      errors.username = 'Minimum 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      errors.username = 'Only letters, numbers, underscore allowed';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'Enter a valid email';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Minimum 6 characters';
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    dispatch(
      register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      })
    );
  };

  const getStrengthLabel = () => {
    switch (passwordStrength) {
      case 'weak': return '🔴 Weak';
      case 'medium': return '🟡 Medium';
      case 'strong': return '🟢 Strong';
      default: return '';
    }
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
            <h1>Create Account 🚀</h1>
            <p>Join thousands of happy shoppers!</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="auth-form">

            {error && (
              <div className="auth-error">
                ⚠️ {error}
              </div>
            )}

            {/* Username */}
            <div className="form-group">
              <label className="form-label">Username</label>
              <div className="input-group">
                <span className="input-icon">👤</span>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={`form-input ${
                    validationErrors.username ? 'input-error' : ''
                  }`}
                  placeholder="Choose a username"
                  autoComplete="username"
                />
              </div>
              {validationErrors.username && (
                <p className="field-error">
                  ⚠️ {validationErrors.username}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-group">
                <span className="input-icon">📧</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-input ${
                    validationErrors.email ? 'input-error' : ''
                  }`}
                  placeholder="Enter your email"
                  autoComplete="email"
                />
              </div>
              {validationErrors.email && (
                <p className="field-error">
                  ⚠️ {validationErrors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-group">
                <span className="input-icon">🔒</span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`form-input has-toggle ${
                    validationErrors.password ? 'input-error' : ''
                  }`}
                  placeholder="Create a strong password"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>

              {/* Password Strength */}
              {formData.password && (
                <div className="password-strength">
                  <div className="strength-bar">
                    <div
                      className={`strength-fill ${passwordStrength}`}
                    />
                  </div>
                  <span className={`strength-text ${passwordStrength}`}>
                    {getStrengthLabel()}
                  </span>
                </div>
              )}

              {validationErrors.password && (
                <p className="field-error">
                  ⚠️ {validationErrors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <div className="input-group">
                <span className="input-icon">🔐</span>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`form-input has-toggle ${
                    validationErrors.confirmPassword ? 'input-error' : ''
                  }`}
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                  {showConfirmPassword ? '🙈' : '👁️'}
                </button>
              </div>
              {validationErrors.confirmPassword && (
                <p className="field-error">
                  ⚠️ {validationErrors.confirmPassword}
                </p>
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
                '✨ Create Account'
              )}
            </button>

            {/* Terms */}
            <p className="terms-text">
              By creating an account, you agree to our{' '}
              <a href="#">Terms of Service</a> and{' '}
              <a href="#">Privacy Policy</a>
            </p>

          </form>

          {/* Footer */}
          <div className="auth-footer">
            <p>
              Already have an account?{' '}
              <Link to="/login">Sign in →</Link>
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="auth-features">
          <div className="auth-feature">
            <span>✅</span>
            <span>Free to Join</span>
          </div>
          <div className="auth-feature">
            <span>🎁</span>
            <span>Exclusive Deals</span>
          </div>
          <div className="auth-feature">
            <span>🔒</span>
            <span>100% Secure</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;