import React, { useState } from 'react';

const RegistrationForm = () => {
  // 1. State Management
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
  });

  const [errors, setErrors] = useState({});

  // 2. Helper Functions
  const isAtLeast18 = (dobString) => {
    if (!dobString) return false;
    const dob = new Date(dobString);
    const today = new Date();
    
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    
    // If the current month is before the birth month, 
    // or it's the birth month but the day hasn't passed yet
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    
    return age >= 18;
  };

  const isValidEmail = (email) => {
    // Simple robust regex for email format
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const hasPasswordComplexity = (password) => {
    // 1 upper, 1 lower, 1 number
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    return hasUpper && hasLower && hasNumber;
  };

  // 3. Centralized Validation Logic
  const validate = () => {
    const newErrors = {};

    // Full Name
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    } else if (formData.fullName.length < 2) {
      newErrors.fullName = 'Full Name must be at least 2 characters';
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!hasPasswordComplexity(formData.password)) {
      newErrors.password = 'Password must contain at least 1 uppercase, 1 lowercase, and 1 number';
    }

    // Confirm Password
    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Date of Birth
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of Birth is required';
    } else if (!isAtLeast18(formData.dateOfBirth)) {
      newErrors.dateOfBirth = 'You must be at least 18 years old to register';
    }

    setErrors(newErrors);
    
    // Return true if no keys in newErrors
    return Object.keys(newErrors).length === 0;
  };

  // 4. Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Optional: Clear error for specific field when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const isValid = validate();
    
    if (isValid) {
    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      dateOfBirth: formData.dateOfBirth,
    };

    fetch("http://localhost:8000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json();
          throw errorData;
        }
        return res.json();
      })
      .then((data) => {
        console.log("Registration success:", data);
        alert("Registration successful!");

        setFormData({
          fullName: '',
          email: '',
          password: '',
          confirmPassword: '',
          dateOfBirth: '',
        });
      })
      .catch((err) => {
        console.error("Registration failed:", err);

        if (err.detail) {
          alert(err.detail); // backend error (409 etc.)
        } else {
          alert("Registration failed. Please try again.");
        }
      });
  } else {
      console.log('Validation Failed');
    }
  };

  return (
    <div className="form-card">
      <h2 className="form-title">Create Account</h2>
      <form onSubmit={handleSubmit} noValidate>
        
        {/* Full Name */}
        <div className="form-group">
          <label className="form-label" htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            className={`form-input ${errors.fullName ? 'error-border' : ''}`}
            value={formData.fullName}
            onChange={handleChange}
            placeholder="John Doe"
          />
          {errors.fullName && <span className="error-message">{errors.fullName}</span>}
        </div>

        {/* Email */}
        <div className="form-group">
          <label className="form-label" htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            className={`form-input ${errors.email ? 'error-border' : ''}`}
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        {/* Password */}
        <div className="form-group">
          <label className="form-label" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className={`form-input ${errors.password ? 'error-border' : ''}`}
            value={formData.password}
            onChange={handleChange}
            placeholder="******"
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>

        {/* Confirm Password */}
        <div className="form-group">
          <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className={`form-input ${errors.confirmPassword ? 'error-border' : ''}`}
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="******"
          />
          {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
        </div>

        {/* Date of Birth */}
        <div className="form-group">
          <label className="form-label" htmlFor="dateOfBirth">Date of Birth</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            className={`form-input ${errors.dateOfBirth ? 'error-border' : ''}`}
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
          {errors.dateOfBirth && <span className="error-message">{errors.dateOfBirth}</span>}
        </div>

        <button type="submit" className="submit-btn">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;