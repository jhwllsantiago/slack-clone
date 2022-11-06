const assignName = ({ email, id }) => {
  const username = email.slice(0, email.indexOf("@"));
  let fullname = username
    .replace(/[^a-zA-Z_.]/g, "")
    .replace(/[_.]/g, " ")
    .trim();
  fullname = fullname[0]?.toUpperCase() + fullname?.slice(1);
  fullname = fullname !== "undefined" ? fullname : `Guest ${id}`;
  return fullname;
};

export default assignName;
