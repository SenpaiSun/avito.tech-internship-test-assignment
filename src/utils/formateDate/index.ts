export const formatDate = (date: string) => {
  const months = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
  ];

  const dateConvert = new Date(date);
  const day = dateConvert.getDate();
  const month = months[dateConvert.getMonth()];
  const year = dateConvert.getFullYear();
  const hours = String(dateConvert.getHours()).padStart(2, '0');
  const minutes = String(dateConvert.getMinutes()).padStart(2, '0');

  return `${day} ${month} ${year} в ${hours}:${minutes}`;
};