import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useState } from "react";
import "./Password.scss";

const Password = ({
  label,
  placeholder = "password",
  password,
  setPassword,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="password">
      <label className="password-label">{label}</label>
      <div className="password-container">
        <input
          className="password-input"
          type={showPassword ? "text" : "password"}
          required
          autoComplete="true"
          minLength={6}
          spellCheck={false}
          placeholder={placeholder}
          value={password}
          onChange={(e) => setPassword(e.target.value.replace(/ /g, ""))}
        />
        {showPassword && (
          <AiOutlineEye
            className="eye"
            onClick={() => setShowPassword(!showPassword)}
          />
        )}
        {!showPassword && (
          <AiOutlineEyeInvisible
            className="eye"
            onClick={() => setShowPassword(!showPassword)}
          />
        )}
      </div>
    </div>
  );
};

export default Password;
