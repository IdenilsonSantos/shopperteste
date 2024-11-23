export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const formattedDate = date.toLocaleString("pt-BR", options);

  return formattedDate;
};

export const formatDuration = (duration: string): string => {
  const regex =
    /(?:(\d+)\s*month[s]?)?(?:\s*(\d+)\s*week[s]?)?(?:\s*(\d+)\s*day[s]?)?(?:\s*(\d+)\s*hour[s]?)?(?:\s*(\d+)\s*min[s]?)?/i;
  const match = duration.match(regex);

  if (!match) return duration;

  const months = match[1] || "0";
  const weeks = match[2] || "0";
  const days = match[3] || "0";
  const hours = match[4] || "0";
  const minutes = match[5] || "0";

  const parts: string[] = [];

  if (months !== "0") {
    parts.push(`${months} mês${months !== "1" ? "es" : ""}`);
  }
  if (weeks !== "0") {
    parts.push(`${weeks} semana${weeks !== "1" ? "s" : ""}`);
  }
  if (days !== "0") {
    parts.push(`${days} dia${days !== "1" ? "s" : ""}`);
  }
  if (hours !== "0") {
    parts.push(`${hours} hora${hours !== "1" ? "s" : ""}`);
  }
  if (minutes !== "0") {
    parts.push(`${minutes} minuto${minutes !== "1" ? "s" : ""}`);
  }

  return parts.join(" ");
};
