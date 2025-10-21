// utils/timeAgo.js
export function timeAgo(dateString) {
  if (!dateString) return '방금 전';
  const now = new Date();
  const past = new Date(dateString);
  const diff = Math.floor((now - past) / 1000); // 초 단위 차이
  if (diff < 60) return '방금 전';
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  return `${Math.floor(diff / 86400)}일 전`;
}
