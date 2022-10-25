import "./Email.scss";

const Email = ({ label, email, setEmail }) => {
  return (
    <div className="email">
      <label className="email-label">{label}</label>
      <input
        className="email-input"
        type="email"
        required
        autoFocus={true}
        spellCheck={false}
        placeholder="name@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value.replace(/ /g, ""))}
      />
    </div>
  );
};

export default Email;
