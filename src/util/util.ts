export function timeAgo(date: Date): string {
  const seconds: number = Math.floor(
    (new Date().getTime() - date.getTime()) / 1000
  );

  const intervalYears: number = Math.floor(seconds / 31536000);
  if (intervalYears > 1) {
    return intervalYears + " years ago";
  }
  if (intervalYears === 1) {
    return intervalYears + " year ago";
  }

  const intervalMonths: number = Math.floor(seconds / 2628000);
  if (intervalMonths > 1) {
    return intervalMonths + " months ago";
  }
  if (intervalMonths === 1) {
    return intervalMonths + " month ago";
  }

  const intervalDays: number = Math.floor(seconds / 86400);
  if (intervalDays > 1) {
    return intervalDays + " days ago";
  }
  if (intervalDays === 1) {
    return intervalDays + " day ago";
  }

  const intervalHours: number = Math.floor(seconds / 3600);
  if (intervalHours > 1) {
    return intervalHours + " hours ago";
  }
  if (intervalHours === 1) {
    return intervalHours + " hour ago";
  }

  const intervalMinutes: number = Math.floor(seconds / 60);
  if (intervalMinutes > 1) {
    return intervalMinutes + " minutes ago";
  }
  if (intervalMinutes === 1) {
    return intervalMinutes + " minute ago";
  }

  return "just now";
}
