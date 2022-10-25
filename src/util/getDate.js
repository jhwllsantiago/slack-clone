const getDate = (timestamp) => {
  const date = new Date(timestamp)
    .toLocaleDateString("en-US", {
      dateStyle: "medium",
    })
    .toUpperCase();

  return date;
};

export default getDate;
