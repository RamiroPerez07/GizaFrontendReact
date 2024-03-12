export const formatPrice = (precio) => {
  return new Intl.NumberFormat("es-CL").format(precio)
}

export const formatDate = (date) => {
  const fecha = new Date(date);
  const yyyy = fecha.getFullYear();
  let mm = fecha.getMonth() + 1; // Months start at 0!
  let dd = fecha.getDate();
  let hours = fecha.getHours();
  let minutes = fecha.getMinutes();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;
  if (hours < 10) hours = '0' + hours;
  if (minutes < 10) minutes = '0' + minutes;

  return dd + '/' + mm + '/' + yyyy + " " + hours+ ":"+minutes;

}