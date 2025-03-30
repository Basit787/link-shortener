export const createRandomKey = () => {
  return `${crypto.randomUUID().split("-").splice(0, 3).join("")}`;
};
