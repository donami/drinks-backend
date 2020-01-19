export const normalize = (items: any[]) => {
  return items.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {});
};
