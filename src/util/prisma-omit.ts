// @ts-ignore
export default function exclude(user, keys) {
  if (!user) return;
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => !keys.includes(key))
  );
}
