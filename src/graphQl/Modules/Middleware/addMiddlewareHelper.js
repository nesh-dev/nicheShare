
export
const getResolvers = (obj, type) => Object.keys(obj[`${type}`]);

export const addMiddlewareToResolvers = (resolvers, middleware, type) => {
  const arrayTracker = [];
  let subArray = [];
  resolvers.map((item) => {
    subArray = getResolvers(item, type);
    subArray.map((subItem) => arrayTracker.push(subItem));
    return arrayTracker;
  });
  
  const mappedResolver = arrayTracker.reduce((map, resolver) => ({
    ...map,
    [resolver]: middleware
  }), {});

  return mappedResolver;
};
