const saveContacts = (email, id, bg) => {
  const signedIn = localStorage.getItem("signedIn");
  const contacts = localStorage.getItem(`${signedIn}-contacts`)
    ? JSON.parse(localStorage.getItem(`${signedIn}-contacts`))
    : [];

  const checker = contacts.some((contact) => contact.email === email);
  if (!checker) {
    localStorage.setItem(
      `${signedIn}-contacts`,
      JSON.stringify([...contacts, { name: null, email, id, bg }])
    );
  }
};

export default saveContacts;
