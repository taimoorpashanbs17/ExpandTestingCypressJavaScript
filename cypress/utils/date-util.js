function getCurrentDate() {
  var now = new Date();
  var year = now.getFullYear();
  var day = now.getDate();
  var hour = now.getHours();
  var minute = now.getMinutes();
  if (day.toString().length == 1) {
    day = "0" + day;
  }
  if (hour.toString().length == 1) {
    hour = "0" + hour;
  }
  if (minute.toString().length == 1) {
    minute = "0" + minute;
  }

  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const d = new Date();
  let name = month[d.getMonth()];
  var dateTime = name + " " + day + ", " + year + " at " + hour + ":" + minute;
  return dateTime;
}
