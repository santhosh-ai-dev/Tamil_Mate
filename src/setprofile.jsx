import { useState } from 'react';
import { Calendar, Gift, ChevronDown, User, Check } from 'lucide-react';
import './SetProfile.css';

export default function SetProfile() {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log({ name, gender, dateOfBirth, referralCode });
    setFormSubmitted(true);
    // After submission, you might redirect to another page
    setTimeout(() => {
      alert('Profile set successfully!');
    }, 1000);
  };

  // Generate an array of years for the calendar
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  
  // Generate months array
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Generate an array of days (1-31)
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const [selectedDay, setSelectedDay] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const handleDateSelection = () => {
    if (selectedDay && selectedMonth && selectedYear) {
      const formattedDate = `${selectedDay} ${selectedMonth} ${selectedYear}`;
      setDateOfBirth(formattedDate);
      setCalendarOpen(false);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1 className="profile-title">Set Up Your Profile</h1>
        <p className="profile-subtitle">Please provide your details to continue</p>

        <form onSubmit={handleSubmit} className="profile-form">
          {/* Name Input */}
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Your Name
            </label>
            <div className="input-container">
              <User className="input-icon" />
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="form-input"
                required
              />
            </div>
          </div>

          {/* Gender Selection */}
          <div className="form-group">
            <label className="form-label">Who are you?</label>
            <div className="gender-container">
              <button
                type="button"
                className={`gender-option ${gender === 'male' ? 'selected' : ''}`}
                onClick={() => setGender('male')}
              >
                <div className="gender-image-container">
                  <img src="/api/placeholder/120/120" alt="Male" className="gender-image" />
                  {gender === 'male' && <div className="gender-check"><Check /></div>}
                </div>
                <span className="gender-label">Boy</span>
              </button>

              <button
                type="button"
                className={`gender-option ${gender === 'female' ? 'selected' : ''}`}
                onClick={() => setGender('female')}
              >
                <div className="gender-image-container">
                  <img src="/api/placeholder/120/120" alt="Female" className="gender-image" />
                  {gender === 'female' && <div className="gender-check"><Check /></div>}
                </div>
                <span className="gender-label">Girl</span>
              </button>
            </div>
          </div>

          {/* Date of Birth Input */}
          <div className="form-group">
            <label htmlFor="dob" className="form-label">
              Date of Birth
            </label>
            <div className="input-container">
              <Calendar className="input-icon" />
              <input
                type="text"
                id="dob"
                value={dateOfBirth}
                readOnly
                placeholder="Select your date of birth"
                className="form-input"
                onClick={() => setCalendarOpen(!calendarOpen)}
                required
              />
              <button
                type="button"
                className="calendar-toggle"
                onClick={() => setCalendarOpen(!calendarOpen)}
              >
                <ChevronDown className="toggle-icon" />
              </button>
            </div>

            {calendarOpen && (
              <div className="calendar-dropdown">
                <div className="calendar-selects">
                  <div className="calendar-select-container">
                    <label className="calendar-label">Day</label>
                    <select 
                      value={selectedDay} 
                      onChange={(e) => setSelectedDay(e.target.value)}
                      className="calendar-select"
                    >
                      <option value="">Day</option>
                      {days.map(day => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </select>
                  </div>

                  <div className="calendar-select-container">
                    <label className="calendar-label">Month</label>
                    <select 
                      value={selectedMonth} 
                      onChange={(e) => setSelectedMonth(e.target.value)}
                      className="calendar-select"
                    >
                      <option value="">Month</option>
                      {months.map(month => (
                        <option key={month} value={month}>{month}</option>
                      ))}
                    </select>
                  </div>

                  <div className="calendar-select-container">
                    <label className="calendar-label">Year</label>
                    <select 
                      value={selectedYear} 
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="calendar-select"
                    >
                      <option value="">Year</option>
                      {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <button 
                  type="button" 
                  className="calendar-apply-btn"
                  onClick={handleDateSelection}
                >
                  Apply
                </button>
              </div>
            )}
          </div>

          {/* Referral Code Input */}
          <div className="form-group">
            <label htmlFor="referral" className="form-label">
              Referral Code (Optional)
            </label>
            <div className="input-container">
              <Gift className="input-icon" />
              <input
                type="text"
                id="referral"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                placeholder="Enter referral code if you have one"
                className="form-input"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="submit-button"
            disabled={!name || !gender || !dateOfBirth || formSubmitted}
          >
            {formSubmitted ? 'Setting up profile...' : 'Continue'}
          </button>
        </form>
      </div>
    </div>
  );
}