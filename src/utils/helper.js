export const handleLoadImageError = (event) => {
  event.currentTarget.src = `${import.meta.env.BASE_URL}/img/cars/no-car.png`;
};

export function getTime(date) {
  if (!date) {
    return "";
  }
  const time = new Date(date);
  let hours = time.getHours() + ""; hours = hours.length < 2 ? "0" + hours : hours;
  let minutes = time.getMinutes() + ""; minutes = minutes.length < 2 ? "0" + minutes : minutes;

  // return time.toJSON().slice(0, 10).replace(/-/g, "/") !=
  //   new Date().toJSON().slice(0, 10).replace(/-/g, "/")
  //   ? time.toJSON().slice(0, 10).replace(/-/g, "/")
  //   : time.getHours() + ":" + time.getMinutes();
  return time.toJSON().slice(0, 10).replace(/-/g, "/") + "  " + hours + ":" + minutes;
}

export function priceFormat(num) {
  if (/[\d]+/.test(num) == false) return null;
  num = Math.floor(num);
  return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
