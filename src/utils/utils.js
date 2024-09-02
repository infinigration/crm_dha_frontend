import moment from "moment-timezone";

export const convertTimeToPKT = (utime) => {
  let convertedTime = moment(utime)
    .tz("Asia/Karachi")
    .format("YYYY-MM-DD hh:mm:ss A");

  console.log(convertedTime);
  let time = `${convertedTime.split(" ")[1]} ${convertedTime.split(" ")[2]}`;
  let date = convertedTime.split(" ")[0];
  return { date, time };
};
