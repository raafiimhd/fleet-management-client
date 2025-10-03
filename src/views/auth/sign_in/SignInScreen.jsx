import { useState } from 'react';
import "./SignInScreen.css";
import CustomTextField from '../../../components/custom_input_field/CustomInputField';
function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login:", { email, password });
  };

  return (
    <div className="signin-container">
      <div className="signin-box">
        <h1 className="signin-title">Login</h1>

        <form onSubmit={handleSubmit} className="signin-form">
          <CustomTextField
            title="Email"
            type="email"
            hintText="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <CustomTextField
            title="Password"
            type="password"
            hintText="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="signin-button">
            Log In
          </button>
        </form>

        <div className="signin-footer">
          <button className="forgot-btn">Forgot password?</button>
        </div>
      </div>
    </div>
  );
}

export default SignInScreen;