import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export const timeFromNow = (time) => {
  return dayjs(time).fromNow(); // 22 years ago
};
