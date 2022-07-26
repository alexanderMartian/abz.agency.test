import instance from './instance.js';

export const getUsers = async (filter) => {
  const result = await instance.get('users'+filter);
  console.log(result)
  return result;
}