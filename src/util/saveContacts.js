const saveContacts = ({ name, email, id, bg }) => {
  const signedIn = localStorage.getItem("signedIn");
  const contacts = localStorage.getItem(`${signedIn}-contacts`)
    ? JSON.parse(localStorage.getItem(`${signedIn}-contacts`))
    : [];

  localStorage.setItem(
    `${signedIn}-contacts`,
    JSON.stringify([...contacts, { name, email, id, bg }])
  );
};

export default saveContacts;
