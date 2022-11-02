import { useState } from "react";
import loadGif from "../../assets/images/slack-animation.gif";
import logo from "../../assets/images/slack-logo.gif";
import "./SignIn.scss";
import Password from "../../components/Password/Password";
import Email from "../../components/Email/Email";
import { useNavigate } from "react-router-dom";
import setHeaders from "../../util/setHeaders";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors([]);
    const body = { email, password };
    fetch("http://206.189.91.54/api/v1/auth/sign_in", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          setHeaders(response.headers);
        }
        return response.json();
      })
      .then((result) => {
        setIsLoading(false);
        if (result.success === false) {
          setErrors(result.errors);
        } else {
          localStorage.setItem("signedIn", result.data.id);
          navigate("/client");
        }
      });
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
