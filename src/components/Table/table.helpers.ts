/**
 * Format a date to a 'dd/mm/yyyy' string
 */
const formatter = new Intl.DateTimeFormat('en-UK');
export const formatDate = function (date: Date | string) {
  if (typeof date === 'string') {
    date = new Date(date);
  }

  return formatter.format(date);
};