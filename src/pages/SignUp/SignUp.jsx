import { useState } from "react";
import loadGif from "../../assets/images/slack-animation.gif";
import logo from "../../assets/images/slack-logo.gif";
import logoSVG from "../../assets/images/Slack_RGB.svg";
import "./SignUp.scss";
import Password from "../../components/Password/Password";
import Email from "../../components/Email/Email";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors([]);
    const body = { email, password, password_confirmation: confirmPassword };
    fetch("http://206.189.91.54/api/v1/auth/", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((result) => {
        setIsLoading(false);
        if (result.status === "error") {
          setErrors(result.errors.full_messages);
        } else {
          setIsSuccessful(true);
        }
      });
  };

  return (
    <div className="sign-up">
      <div className={!isSuccessful ? "main" : "main disabled"}>
        <img src={logo} alt="" onClick={() => navigate("/")} />
        <p className="hr">Sign Up to Slack</p>
        {isLoading && <img src={loadGif} alt="" />}
        {!isLoading && (
          <form onSubmit={handleSubmit}>
            <Email label={"Email"} email={email} setEmail={setEmail} />
            <Password
              label={"Password"}
              password={password}
              setPassword={setPassword}
            />
            <Password
              label={"Confirm Password"}
              placeholder={"re-type password"}
              password={confirmPassword}
              setPassword={setConfirmPassword}
            />
            <button type="submit">Continue</button>
          </form>
        )}
        {errors.map((error, idx) => {
          return (
            <p key={idx} className="error">
              {error}
            </p>
          );
        })}
      </div>
      {isSuccessful && (
        <div className="modal">
          <img src={logoSVG} alt="" />
          <p>
            Thanks for signing up! Your account has been successfully created.
          </p>
          <button onClick={() => navigate("/signin")}>SIGN IN</button>
        </div>
      )}
    </div>
  );
};

export default SignUp;
