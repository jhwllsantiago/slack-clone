const saveContacts = (email, id) => {
  const signed_in = localStorage.getItem("signed_in");
  const contacts = localStorage.getItem(`${signed_in}-contacts`)
    ? JSON.parse(localStorage.getItem(`${signed_in}-contacts`))
    : [];

  const checker = contacts.some((contact) => contact.email === email);
  if (!checker) {
    localStorage.setItem(
      `${signed_in}-contacts`,
      JSON.stringify([...contacts, { name: null, email, id }])
    );
  }
};

export default saveContacts;
