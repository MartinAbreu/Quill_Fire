export const createdOnDateTime = (date: string) => {
  const createdOnIsoString = date;

  const createdOnDate = new Date(createdOnIsoString);

  const formattedDate = createdOnDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = createdOnDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return `Created on ${formattedDate} at ${formattedTime}`;
};
