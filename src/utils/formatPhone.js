/**
 * Formats a raw phone number string into a more readable format.
 * @param raw {string} - The raw phone number input, which may contain non-numeric characters.
 * @returns {string} - The formatted phone number, split into parts for better readability.
 */
export function formatPhone(raw) {
  raw = (raw || '').replace(/\D/g, '').slice(0, 11);
  const parts = [];
  if (raw.length > 0) parts.push(raw.slice(0, 3));
  if (raw.length > 3) parts.push(raw.slice(3, 6));
  if (raw.length > 6) parts.push(raw.slice(6, 8));
  if (raw.length > 8) parts.push(raw.slice(8, 10));
  return parts.join(' ');
}
