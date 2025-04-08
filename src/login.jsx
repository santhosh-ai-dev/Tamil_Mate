import React, { useState, useRef, useEffect } from 'react';
import { Phone, Lock, ArrowLeft, Heart, Check, X } from 'lucide-react';
import './login.css'; // Import the separated CSS file

const LoginPage = () => {
  // States
  const [currentStep, setCurrentStep] = useState('phone'); // 'phone' or 'otp'
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const [otpValues, setOtpValues] = useState(['', '', '', '']);
  const [isOtpValid, setIsOtpValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Refs for OTP inputs
  const otpRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  
  // Handle phone number change
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);
    setIsPhoneValid(true);
  };
  
  // Handle send OTP button click
  const handleSendOtp = () => {
    // Simple validation - you can enhance this
    if (!phoneNumber || phoneNumber.length < 10) {
      setIsPhoneValid(false);
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call to send OTP
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep('otp');
      setCountdown(30);
    }, 1500);
  };
  
  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    // Allow only numbers
    if (!/^\d*$/.test(value)) return;
    
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);
    setIsOtpValid(true);
    
    // Auto-focus next input
    if (value !== '' && index < otpRefs.length - 1) {
      otpRefs[index + 1].current.focus();
    }
  };
  
  // Handle keydown for backspace in OTP inputs
  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && otpValues[index] === '' && index > 0) {
      otpRefs[index - 1].current.focus();
    }
  };
  
  // Handle verify OTP button click
  const handleVerifyOtp = () => {
    // Check if OTP is complete
    if (otpValues.some(val => val === '')) {
      setIsOtpValid(false);
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API verification
    setTimeout(() => {
      setIsLoading(false);
      // Show success animation
      setShowSuccess(true);
      
      // Redirect to app after success
      setTimeout(() => {
        alert('Login successful! Redirecting to app...');
        // In a real app, you would navigate to the main app screen here
      }, 1500);
    }, 2000);
  };
  
  // Resend OTP functionality
  const handleResendOtp = () => {
    if (countdown > 0) return;
    
    setIsLoading(true);
    
    // Simulate API call to resend OTP
    setTimeout(() => {
      setIsLoading(false);
      setCountdown(30);
      // Clear OTP fields
      setOtpValues(['', '', '', '']);
      otpRefs[0].current.focus();
    }, 1500);
  };
  
  // Countdown effect for resend OTP
  useEffect(() => {
    if (countdown <= 0) return;
    
    const timer = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [countdown]);
  
  // Focus first OTP input when switching to OTP step
  useEffect(() => {
    if (currentStep === 'otp') {
      otpRefs[0].current?.focus();
    }
  }, [currentStep]);
  
  return (
    <div className="login-container">
      <div className="overlay"></div>
      
      {/* Animated background elements */}
      <div className="bg-elements">
        <div className="blob"></div>
        <div className="blob"></div>
        <div className="blob"></div>
      </div>
      
      <div className={`login-card ${showSuccess ? 'success' : ''}`}>
        
        {/* Success animation overlay */}
        {showSuccess && (
          <div className="success-overlay">
            <div className="success-content">
              <div className="success-check-container">
                <Check size={50} className="success-check" strokeWidth={3} />
              </div>
              <h2 className="success-title">Login Successful!</h2>
              <p className="success-message">Redirecting you to the app...</p>
              <div className="success-indicator"></div>
            </div>
          </div>
        )}
        
        {/* Header */}
        <div className="header">
          <div className="header-bg">
            <div className="header-blob-1"></div>
            <div className="header-blob-2"></div>
          </div>
          
          <div className="logo-container">
            <Heart size={36} className="logo-icon" fill="currentColor" />
          </div>
          <h1 className="header-title">Find Your Perfect Match</h1>
          <p className="header-subtitle">Login to start your journey</p>
          
          <div className="header-wave">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path fill="#ffffff" fillOpacity="0.9" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>
        </div>
        
        {/* Form content */}
        <div className="form-container">
          {currentStep === 'phone' ? (
            /* Phone Number Step */
            <div className="form-group">
              <div>
                <label className="input-label">Mobile Number</label>
                <div className={`input-container ${!isPhoneValid ? 'error' : ''}`}>
                  <Phone size={20} className={`input-icon ${!isPhoneValid ? 'error' : ''}`} />
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    placeholder="Enter your mobile number"
                    className={`input-field ${!isPhoneValid ? 'error' : ''}`}
                    maxLength={15}
                  />
                </div>
                {!isPhoneValid && (
                  <p className="error-message">
                    <X size={14} className="error-icon" /> Please enter a valid mobile number
                  </p>
                )}
              </div>
              
              <button
                onClick={handleSendOtp}
                disabled={isLoading}
                className="submit-button"
              >
                {isLoading ? (
                  <div className="button-content">
                    <div className="spinner"></div>
                    Sending OTP...
                  </div>
                ) : (
                  'Send OTP'
                )}
              </button>
              
              <div className="signup-container">
                <p className="signup-text">
                  New to our dating app?{' '}
                  <a href="#" className="signup-link">Sign up</a>
                </p>
              </div>
            </div>
          ) : (
            /* OTP Verification Step */
            <div>
              <button 
                onClick={() => setCurrentStep('phone')}
                className="back-button"
              >
                <ArrowLeft size={18} className="back-icon" />
                Back to phone number
              </button>
              
              <div>
                <div className="otp-header">
                  <label className="otp-label">Enter Verification Code</label>
                  <span className="otp-phone-badge">Sent to {phoneNumber}</span>
                </div>
                
                <div className="otp-info">
                  <Lock size={18} className="otp-info-icon" />
                  <span className="otp-info-text">Enter the 4-digit code sent to your phone</span>
                </div>
                
                <div className="otp-inputs">
                  {otpValues.map((value, index) => (
                    <input
                      key={index}
                      ref={otpRefs[index]}
                      type="text"
                      maxLength={1}
                      value={value}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className={`otp-input ${
                        !isOtpValid ? 'error' : value ? 'filled' : ''
                      }`}
                    />
                  ))}
                </div>
                
                {!isOtpValid && (
                  <p className="error-message" style={{justifyContent: 'center'}}>
                    <X size={14} className="error-icon" /> Please enter a valid OTP code
                  </p>
                )}
              </div>
              
              <button
                onClick={handleVerifyOtp}
                disabled={isLoading}
                className="submit-button verify-button"
                style={{marginTop: '1rem'}}
              >
                {isLoading ? (
                  <div className="button-content">
                    <div className="spinner"></div>
                    Verifying...
                  </div>
                ) : (
                  'Verify & Login'
                )}
              </button>
              
              <div className="signup-container">
                <button
                  onClick={handleResendOtp}
                  disabled={countdown > 0}
                  className="resend-button"
                >
                  {countdown > 0
                    ? `Resend OTP in ${countdown}s`
                    : 'Didn\'t receive the code? Resend'}
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="footer">
          By continuing, you agree to our <a href="#" className="footer-link">Terms</a> & <a href="#" className="footer-link">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;