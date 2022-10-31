const getDate = (timestamp) => {
  const date = new Date(timestamp).toLocaleDateString("en-US", {
    dateStyle: "full",
  });
  const today = new Date().toLocaleDateString("en-US", {
    dateStyle: "full",
  });
  if (date === today) return "Today";

  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let wd = weekday[new Date(timestamp).getDay()];
  let m = month[new Date(timestamp).getMonth()];
  let d = new Date(timestamp).getDate();
  if (d > 3 && d < 21) d += "th";
  else if (d % 10 === 1) d += "st";
  else if (d % 10 === 2) d += "nd";
  else if (d % 10 === 3) d += "rd";
  else d += "th";

  return `${wd}, ${m} ${d}`;
};

export default getDate;
