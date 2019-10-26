function pad(num) {
  const norm = Math.floor(Math.abs(num));
  return (norm < 10 ? '0' : '') + norm;
};

export function toIsoWithOffset(date: Date) {
  const tzo = -date.getTimezoneOffset(),
    dif = tzo >= 0 ? '+' : '-',
    year = date.getFullYear(),
    month = pad(date.getMonth() + 1),
    day = pad(date.getDate()),
    hour = pad(date.getHours()),
    min = pad(date.getMinutes()),
    sec = pad(date.getSeconds()),
    offset = `${dif}${pad(tzo / 60)}${pad(tzo % 60)}`;

  return `${year}-${month}-${day}T${hour}:${min}:${sec}${offset}`;
}
