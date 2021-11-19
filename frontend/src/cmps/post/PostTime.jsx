import { formatDistance } from 'date-fns';

export function PostTime({ createdAt }) {
  const formatted = formatDistance(Date.now(), new Date(createdAt.slice(0, 10)));
  return <time>{formatted} ago</time>;
}
