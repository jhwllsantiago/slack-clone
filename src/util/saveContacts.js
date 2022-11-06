const saveContacts = (id, name) => {
  const signedIn = localStorage.getItem("signedIn");
  const contacts = localStorage.getItem(`${signedIn}-contacts`)
    ? JSON.parse(localStorage.getItem(`${signedIn}-contacts`))
    : [];

  localStorage.setItem(
    `${signedIn}-contacts`,
    JSON.stringify([...contacts, { id, name }])
  );
};

export default saveContacts;
