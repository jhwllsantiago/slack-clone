import { useState } from "react";
import loadGif from "../../assets/images/slack-animation.gif";
import logo from "../../assets/images/slack-logo.gif";
import "./SignIn.scss";
import Password from "../../components/Password/Password";
import Email from "../../components/Email/Email";
import { useNavigate } from "react-router-dom";
import setHeaders from "../../util/setHeaders";
import { auth } from "../../api/post";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors([]);
    const payload = { email, password };
    const response = await auth("auth/sign_in", payload);
    if (response.status === 200) {
      localStorage.setItem("signedIn", response.data.data.id);
      setHeaders(response.headers);
      setIsLoading(false);
      navigate("/client");
    } else {
      setIsLoading(false);
      setErrors(response.errors);
    }
  };

  return (
    <div className="sign-up">
      <div className="main">
        <img src={logo} alt="" onClick={() => navigate("/")} />
        <p className="hr">Sign In to Slack</p>
        {isLoading && <img src={loadGif} alt="" />}
        {!isLoading && (
          <form onSubmit={handleSubmit}>
            <Email label={"Email"} email={email} setEmail={setEmail} />
            <Password
              label={"Password"}
              password={password}
              setPassword={setPassword}
            />
            <button type="submit">Continue</button>
            {errors &&
              errors.map((error, idx) => {
                return (
                  <p key={idx} className="error">
                    {error}
                  </p>
                );
              })}
          </form>
        )}
      </div>
    </div>
  );
};

export default SignIn;
