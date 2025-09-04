export function isValidDate(dateStr: string): boolean {
    
  const regex = /^(\d{2})[\/-](\d{2})[\/-](\d{4})$/;
  const match = dateStr.match(regex);

  if (!match) return false;

  const day = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  const year = parseInt(match[3], 10);

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();

  if (month < 1 || month > 12) return false;

  const daysInMonth = new Date(year, month, 0).getDate(); 
  if (day < 1 || day > daysInMonth) return false;


  if (year > currentYear) return false;


  if (year === currentYear && month > currentMonth) return false;


  if (year === currentYear && month === currentMonth && day > currentDay) return false;

  return true;
}
