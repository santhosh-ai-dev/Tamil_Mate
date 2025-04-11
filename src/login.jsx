import { useState } from 'react';
import { Phone, ArrowRight, Lock, ShieldCheck } from 'lucide-react';
import './LoginPage.css';

export default function MobileOTPLogin() {
  const [step, setStep] = useState('phone'); // 'phone' or 'otp'
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call to send OTP
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
    }, 1500);
  };

  const handleOtpChange = (index, value) => {
    // Only allow digits
    if (value && !/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace to move to previous input
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call to verify OTP
    setTimeout(() => {
      setIsLoading(false);
      alert('Login successful!');
    }, 1500);
  };

  const handleResendOTP = () => {
    setIsLoading(true);
    
    // Simulate API call to resend OTP
    setTimeout(() => {
      setIsLoading(false);
      alert('New OTP sent!');
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="icon-container">
          <div className="icon-wrapper">
            {step === 'phone' ? (
              <Phone className="icon" />
            ) : (
              <Lock className="icon" />
            )}
          </div>
        </div>
        
        <h2 className="page-title">
          {step === 'phone' ? 'Login with Mobile' : 'Verify OTP'}
        </h2>
        
        <p className="page-subtitle">
          {step === 'phone' 
            ? 'Enter your mobile number to continue' 
            : `We've sent a verification code to ${phoneNumber}`}
        </p>
        
        {step === 'phone' ? (
          <form onSubmit={handlePhoneSubmit}>
            <div className="input-group">
              <label htmlFor="phone" className="input-label">
                Mobile Number
              </label>
              <div className="phone-input-container">
                <div className="country-code">
                  <span>+91</span>
                </div>
                <input
                  type="tel"
                  id="phone"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="Enter 10 digit number"
                  className="phone-input"
                  required
                  maxLength={10}
                  pattern="[0-9]{10}"
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={phoneNumber.length !== 10 || isLoading}
              className={`submit-button ${phoneNumber.length !== 10 || isLoading ? 'button-disabled' : ''}`}
            >
              {isLoading ? (
                <svg className="loading-spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="spinner-track" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="spinner-path" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <>
                  Continue <ArrowRight className="button-icon" />
                </>
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit}>
            <div className="otp-container">
              <label htmlFor="otp-0" className="input-label">
                Enter Verification Code
              </label>
              <div className="otp-inputs">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="otp-input"
                    required
                  />
                ))}
              </div>
            </div>
            
            <button
              type="submit"
              disabled={otp.join('').length !== 4 || isLoading}
              className={`submit-button ${otp.join('').length !== 4 || isLoading ? 'button-disabled' : ''}`}
            >
              {isLoading ? (
                <svg className="loading-spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="spinner-track" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="spinner-path" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <>
                  Verify OTP <ShieldCheck className="button-icon" />
                </>
              )}
            </button>
            
            <div className="action-links">
              <button 
                type="button" 
                onClick={() => setStep('phone')}
                className="text-link"
              >
                Change Number
              </button>
              <button 
                type="button" 
                onClick={handleResendOTP}
                disabled={isLoading}
                className="text-link primary"
              >
                Resend OTP
              </button>
            </div>
          </form>
        )}
        
        <div className="terms-section">
          By continuing, you agree to our
          <a href="#" className="terms-link"> Terms of Service </a>
          and
          <a href="#" className="terms-link"> Privacy Policy</a>
        </div>
      </div>
    </div>
  );
}