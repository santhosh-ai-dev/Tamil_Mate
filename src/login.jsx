import React, { useState, useRef, useEffect } from 'react';
import { Phone, Lock, ArrowLeft, Heart, Check, X } from 'lucide-react';

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
      otpRefs[0].current.focus();
    }
  }, [currentStep]);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 flex items-center justify-center p-4 font-sans">
      <div className="absolute inset-0 bg-black opacity-20 backdrop-blur-sm"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-pink-400 opacity-20 blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 -right-16 w-72 h-72 rounded-full bg-purple-400 opacity-20 blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/4 w-80 h-80 rounded-full bg-indigo-400 opacity-20 blur-3xl animate-blob animation-delay-4000"></div>
      </div>
      
      <div className={`w-full max-w-md bg-white bg-opacity-90 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden transition-all duration-700 relative z-10
        ${showSuccess ? 'scale-105 rotate-1' : 'scale-100 rotate-0'}`}>
        
        {/* Success animation overlay */}
        {showSuccess && (
          <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center z-10 rounded-3xl animate-success-fade-in">
            <div className="text-white text-center">
              <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mx-auto mb-6 shadow-lg animate-success-check">
                <Check size={50} className="text-green-500" strokeWidth={3} />
              </div>
              <h2 className="text-3xl font-bold">Login Successful!</h2>
              <p className="mt-3 text-lg text-green-100">Redirecting you to the app...</p>
              <div className="mt-4 w-16 h-1 bg-white rounded-full mx-auto opacity-60 animate-pulse"></div>
            </div>
          </div>
        )}
        
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 px-8 pt-14 pb-10 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-white opacity-10 blur-xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full bg-pink-300 opacity-20 blur-xl"></div>
          </div>
          
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl relative z-10 animate-float">
            <Heart size={36} className="text-pink-500" fill="currentColor" />
          </div>
          <h1 className="text-3xl font-bold">Find Your Perfect Match</h1>
          <p className="text-pink-100 mt-3 text-lg">Login to start your journey</p>
          
          <div className="absolute -bottom-6 left-0 w-full h-12">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
              <path fill="#ffffff" fillOpacity="0.9" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>
        </div>
        
        {/* Form content */}
        <div className="p-8 pt-10">
          {currentStep === 'phone' ? (
            /* Phone Number Step */
            <div className="space-y-7">
              <div className="transform transition-all duration-500 opacity-100 translate-y-0">
                <label className="text-sm font-medium text-gray-700 block mb-2 ml-1">Mobile Number</label>
                <div className={`flex items-center border-2 rounded-xl px-4 py-3.5 transition-all duration-300 ${
                  !isPhoneValid 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-200 focus-within:border-pink-500 focus-within:shadow-md focus-within:shadow-pink-100'
                }`}>
                  <Phone size={20} className={`mr-3 transition-colors ${!isPhoneValid ? 'text-red-400' : 'text-gray-400'}`} />
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    placeholder="Enter your mobile number"
                    className={`flex-1 outline-none text-gray-700 bg-transparent text-lg ${!isPhoneValid ? 'placeholder-red-300' : 'placeholder-gray-400'}`}
                    maxLength={15}
                  />
                </div>
                {!isPhoneValid && (
                  <p className="text-red-500 text-sm mt-2 ml-1 flex items-center">
                    <X size={14} className="mr-1" /> Please enter a valid mobile number
                  </p>
                )}
              </div>
              
              <button
                onClick={handleSendOtp}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3.5 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-70 text-lg"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                    Sending OTP...
                  </div>
                ) : (
                  'Send OTP'
                )}
              </button>
              
              <div className="text-center pt-4">
                <p className="text-gray-600">
                  New to our dating app?{' '}
                  <a href="#" className="text-pink-500 font-medium hover:text-pink-600 transition-colors underline decoration-2 decoration-pink-200 hover:decoration-pink-400">Sign up</a>
                </p>
              </div>
            </div>
          ) : (
            /* OTP Verification Step */
            <div className="space-y-6">
              <button 
                onClick={() => setCurrentStep('phone')}
                className="flex items-center text-gray-500 hover:text-pink-500 transition-colors group mb-2"
              >
                <ArrowLeft size={18} className="mr-1 group-hover:-translate-x-1 transition-transform" />
                Back to phone number
              </button>
              
              <div className="transform transition-all duration-500 opacity-100 translate-y-0">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-medium text-gray-700">Enter Verification Code</label>
                  <span className="text-xs bg-pink-50 text-pink-600 px-2 py-1 rounded-full">Sent to {phoneNumber}</span>
                </div>
                
                <div className="flex items-center justify-center mb-4 bg-purple-50 py-2 px-3 rounded-lg">
                  <Lock size={18} className="text-purple-400 mr-2" />
                  <span className="text-sm text-purple-600">Enter the 4-digit code sent to your phone</span>
                </div>
                
                <div className="flex justify-center gap-3 mt-4">
                  {otpValues.map((value, index) => (
                    <input
                      key={index}
                      ref={otpRefs[index]}
                      type="text"
                      maxLength={1}
                      value={value}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className={`w-16 h-16 text-center text-2xl font-bold border-2 rounded-xl shadow-sm transition-all duration-300 ${
                        !isOtpValid 
                          ? 'border-red-500 bg-red-50' 
                          : value 
                            ? 'border-green-400 bg-green-50' 
                            : 'border-gray-200 focus:border-purple-500 focus:shadow-md focus:shadow-purple-100'
                      }`}
                    />
                  ))}
                </div>
                
                {!isOtpValid && (
                  <p className="text-red-500 text-sm text-center mt-3 flex items-center justify-center">
                    <X size={14} className="mr-1" /> Please enter a valid OTP code
                  </p>
                )}
              </div>
              
              <button
                onClick={handleVerifyOtp}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3.5 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-70 mt-4 text-lg"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                    Verifying...
                  </div>
                ) : (
                  'Verify & Login'
                )}
              </button>
              
              <div className="text-center pt-2">
                <button
                  onClick={handleResendOtp}
                  disabled={countdown > 0}
                  className={`text-sm py-2 px-4 rounded-lg transition-all ${
                    countdown > 0 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-purple-600 hover:bg-purple-50 font-medium'
                  }`}
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
        <div className="py-4 text-center text-xs text-gray-500 border-t border-gray-100">
          By continuing, you agree to our <a href="#" className="text-pink-500 hover:underline">Terms</a> & <a href="#" className="text-pink-500 hover:underline">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
};

// Additional keyframes and animations
const additionalStyles = `
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}

@keyframes success-fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes success-check {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-success-fade-in {
  animation: success-fade-in 0.5s forwards;
}

.animate-success-check {
  animation: success-check 0.5s forwards 0.3s;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}
`;

export default LoginPage;