export function obtenerTiempoActual() {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentSecond = now.getSeconds();

  const formattedTime = `${currentHour}:${currentMinute}:${currentSecond}`;

  return formattedTime;
}

export function obtenerFechaActual(): string {
  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  const formattedDate = `${day} ${month} ${year}`;

  return formattedDate;
}
