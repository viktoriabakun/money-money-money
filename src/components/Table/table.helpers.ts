/**
 * Format a date to a 'dd/mm/yyyy' string
 */
export const formatDate = function (date: Date | string) {
  if (typeof date === 'string') {
    date = new Date(date);
  }

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};