import { useState } from 'react';
import { Check, Calendar, X } from 'lucide-react';
import './ProfileSetupForm.css';

export default function ProfileSetupForm() {
  const [nickname, setNickname] = useState('');
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [showGenderSelect, setShowGenderSelect] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  
  const handleNicknameChange = (e) => {
    const value = e.target.value;
    setNickname(value);
    setIsNicknameValid(value.length >= 3);
  };
  
  const handleWhoAreYouClick = () => {
    setShowGenderSelect(true);
  };
  
  const handleGenderSelect = (selectedGender) => {
    setGender(selectedGender);
    setShowGenderSelect(false);
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateSelect = (date) => {
    setBirthDate(date);
    setShowCalendar(false);
  };

  // Simple calendar component
  const DatePicker = () => {
    const today = new Date();
    const [viewDate, setViewDate] = useState(today);
    const [, setSelectedDate] = useState(null);
    
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const getDaysInMonth = (year, month) => {
      return new Date(year, month + 1, 0).getDate();
    };
    
    const getFirstDayOfMonth = (year, month) => {
      return new Date(year, month, 1).getDay();
    };
    
    const handlePrevMonth = () => {
      setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
    };
    
    const handleNextMonth = () => {
      setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
    };
    
    const handleSelectDate = (day) => {
      const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
      setSelectedDate(date);
      const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      handleDateSelect(formattedDate);
    };
    
    const renderCalendarDays = () => {
      const days = [];
      const daysInMonth = getDaysInMonth(viewDate.getFullYear(), viewDate.getMonth());
      const firstDay = getFirstDayOfMonth(viewDate.getFullYear(), viewDate.getMonth());
      
      // Add empty cells for days before the first day of the month
      for (let i = 0; i < firstDay; i++) {
        days.push(<div key={`empty-${i}`} className="calendar-day-empty"></div>);
      }
      
      // Add days of the month
      for (let day = 1; day <= daysInMonth; day++) {
        days.push(
          <div 
            key={`day-${day}`}
            onClick={() => handleSelectDate(day)}
            className="calendar-day"
          >
            {day}
          </div>
        );
      }
      
      return days;
    };
    
    return (
      <div className="calendar-container">
        <div className="calendar-header">
          <button onClick={handlePrevMonth} className="calendar-nav-button">
            &lt;
          </button>
          <div>
            {months[viewDate.getMonth()]} {viewDate.getFullYear()}
          </div>
          <button onClick={handleNextMonth} className="calendar-nav-button">
            &gt;
          </button>
        </div>
        
        <div className="calendar-grid">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
            <div key={index} className="calendar-weekday">
              {day}
            </div>
          ))}
          {renderCalendarDays()}
        </div>
      </div>
    );
  };
  
  return (
    <div className="profile-setup-container">
      <h1 className="profile-setup-title">Set Profile</h1>
      
      <div className="form-container">
        {/* Nickname field */}
        <div className="form-field-container">
          <div className={`input-field ${isNicknameValid ? 'valid' : ''}`}>
            <input
              type="text"
              placeholder="Nick-name"
              value={nickname}
              onChange={handleNicknameChange}
              className="input-control"
            />
            {isNicknameValid && (
              <Check className="valid-icon" size={24} />
            )}
          </div>
          {isNicknameValid && (
            <p className="valid-text">Perfect!</p>
          )}
        </div>
        
        {/* Who are you dropdown */}
        <div 
          onClick={handleWhoAreYouClick}
          className="select-field"
        >
          <span className={gender ? "selected-text" : "placeholder-text"}>
            {gender === 'girl' ? 'Girl' : gender === 'boy' ? 'Boy' : 'Who are you?'}
          </span>
          <span className="select-action-text">
            {gender ? 'Change' : 'Select'}
          </span>
        </div>
        
        {/* Date of Birth field */}
        <div className="form-field-container">
          <div 
            className="select-field"
            onClick={toggleCalendar}
          >
            <span className={birthDate ? "selected-text" : "placeholder-text"}>
              {birthDate || "Date of Birth"}
            </span>
            <div className="calendar-icon-container">
              <Calendar size={20} className="calendar-icon" />
            </div>
          </div>
          
          {showCalendar && (
            <div className="calendar-dropdown">
              <DatePicker />
            </div>
          )}
        </div>
        
        {/* Referral code option */}
        <p className="referral-code-text">I have referral code</p>
        
        {/* Submit button */}
        <div className="submit-container">
          <button className="submit-button">
            Submit
          </button>
          
          <p className="terms-text">
            By proceeding I accept the <span className="terms-bold">Community Guidelines, Terms of use</span>
          </p>
        </div>
      </div>
      
      {/* Gender selection modal */}
      {showGenderSelect && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2 className="modal-title">Select your true gender</h2>
              <p className="modal-subtitle">
                Wrong Gender = Life Ban <X className="ban-icon" size={18} />
              </p>
            </div>
            
            <div className="gender-options">
              <div 
                onClick={() => handleGenderSelect('girl')}
                className="gender-option female"
              >
                {/* Female silhouette */}
                <div className="gender-icon-container">
                  <svg viewBox="0 0 100 100" className="gender-icon female-icon">
                    <path d="M50,20 C60,20 70,30 70,45 C70,55 65,65 50,65 C35,65 30,55 30,45 C30,30 40,20 50,20 Z" fill="#FFF" />
                    <path d="M35,62 L35,85 L45,85 L45,70 L55,70 L55,85 L65,85 L65,62 C65,62 60,70 50,70 C40,70 35,62 35,62 Z" fill="#FFF" />
                  </svg>
                </div>
                <p className="gender-label female-label">I am Girl</p>
              </div>
              
              <div 
                onClick={() => handleGenderSelect('boy')}
                className="gender-option male"
              >
                {/* Male silhouette */}
                <div className="gender-icon-container">
                  <svg viewBox="0 0 100 100" className="gender-icon male-icon">
                    <path d="M50,20 C60,20 70,30 70,45 C70,55 65,65 50,65 C35,65 30,55 30,45 C30,30 40,20 50,20 Z" fill="#FFF" />
                    <path d="M42,65 L42,85 L58,85 L58,65 C58,65 55,70 50,70 C45,70 42,65 42,65 Z" fill="#FFF" />
                  </svg>
                </div>
                <p className="gender-label male-label">I am Boy</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}