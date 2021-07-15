import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(duration);
dayjs.extend(relativeTime);

const GetHumanizedTime = (createdAt) => {
  let now = dayjs();
  let memberSince = dayjs(createdAt).format('YYYY/MM/DD');
  return dayjs(memberSince).from(now);
};

export default GetHumanizedTime;
