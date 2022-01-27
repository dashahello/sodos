function getPrettyDateTimeString(dateObjectOrString) {
  const date =
    typeof dateObjectOrString === 'string'
      ? new Date(dateObjectOrString)
      : dateObjectOrString;

  // getFullYear;
  // getDate;
  // getMonth + 1;
  // getHours;
  // getMinutes;

  return `${date.getHours().toString().padStart(2, 0)}:${date
    .getMinutes()
    .toString()
    .padStart(2, 0)} - ${date.getDate().toString().padStart(2, 0)}/${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, 0)}/${date.getFullYear()}`;
}

export default getPrettyDateTimeString;
