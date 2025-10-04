import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../sign_up/SignUp.css";
import { supabase } from "../../../services/SupabaseClient";
import CustomTextField from "../../../components/custom_input_field/CustomInputField";

export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setSuccess(false);

    if (!validate()) return;

    setLoading(true);

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
        },
      });

      if (signUpError) throw signUpError;

      if (data?.user) {
        setSuccess(true);
        setFullName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setErrors({});
      }
    } catch (err) {
      setErrors({ general: err.message || "An error occurred during sign up" });
    } finally {
      setLoading(false);
    }
  };

  // 👇 Clear specific field errors as user types
  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
    if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: "" }));
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password) setErrors((prev) => ({ ...prev, password: "" }));
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (errors.confirmPassword)
      setErrors((prev) => ({ ...prev, confirmPassword: "" }));
  };

  const handleLogInClick = () => {
    navigate("/");
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1 className="signup-title">Create Account</h1>

        <form onSubmit={handleSignUp} className="signup-form">
          <CustomTextField
            title="Full Name"
            hintText="Enter your full name"
            value={fullName}
            onChange={handleFullNameChange}
            required
          />
          {errors.fullName && <p className="error-text">{errors.fullName}</p>}

          <CustomTextField
            title="Email"
            type="email"
            hintText="Enter your email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          {errors.email && <p className="error-text">{errors.email}</p>}

          <CustomTextField
            title="Password"
            type="password"
            hintText="Enter your password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          {errors.password && <p className="error-text">{errors.password}</p>}

          <CustomTextField
            title="Confirm Password"
            type="password"
            hintText="Re-enter your password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
          {errors.confirmPassword && (
            <p className="error-text">{errors.confirmPassword}</p>
          )}

          {errors.general && (
            <div className="error-message">{errors.general}</div>
          )}
          {success && (
            <div className="success-message">
              Account created successfully!
            </div>
          )}

          <button type="submit" disabled={loading} className="signup-button">
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <div className="login-link">
          <p>Already have an account?</p>
          <button onClick={handleLogInClick} className="login-button">
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}
