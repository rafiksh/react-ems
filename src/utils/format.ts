/** Formats phone numbers  */
export const formatPhone = (pan: string | number | undefined): string =>
  `${pan}`.replace(/\D+/g, "").replace(/\W/gi, "").trim();

/** First capital */
export const capitalize = (s: string) =>
  s.charAt(0).toUpperCase() + s.slice(1)?.toLowerCase();
