const getTime = (timestamp) => {
  const time = new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h11",
  });

  return time;
};

export default getTime;
