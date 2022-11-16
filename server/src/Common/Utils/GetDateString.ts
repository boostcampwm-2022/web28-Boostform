function getDateString(date: Date): string {
  const yearString = `${date.getFullYear()}`;
  const monthString = date.getMonth() + 1 >= 10 ? `${date.getMonth() + 1}` : `0${date.getMonth() + 1}`;
  const dateString = date.getDate() >= 10 ? `${date.getDate()}` : `0${date.getDate()}`;
  return `${yearString}-${monthString}-${dateString}`;
}

export default getDateString;
