export const createRandomKey = (link: string) => {
  const shortLink = link.slice(0, 10);
  return `${crypto.randomUUID().split("-").splice(0, 2).join("-")}`;
};
