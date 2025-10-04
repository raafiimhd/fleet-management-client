import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignInScreen.css";
import CustomTextField from "../../../components/custom_input_field/CustomInputField";

function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Login:", { email, password });
      // TODO: Add login logic (Supabase/API)
    }
  };

  // 👇 Clear only that field's error when user types
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password) setErrors((prev) => ({ ...prev, password: "" }));
  };

  const handleCreateAccount = () => {
    navigate("/signup");
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <h1 className="signin-title">Login</h1>

        <form onSubmit={handleSubmit} className="signin-form">
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

          <button type="submit" className="signin-button">
            Log In
          </button>
        </form>

        <div className="signin-footer">
          <button className="forgot-btn">Forgot password?</button>
        </div>

        <div className="create-account-container">
          <p>Don’t have an account?</p>
          <button
            onClick={handleCreateAccount}
            className="create-account-button"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignInScreen;
