
const get = async () => {
  const response = await fetch('https://api.coinstats.app/public/v1/coins?skip=0&limit=0&currency=USD', {
    method: 'GET',
    mode: 'cors',
  });
  if (!response.ok) {
    if (response.status !== 404) {
      throw new Error('Invalid response');
    }
    return null;
  }

  const json = await response.json();
  const { coins } = json;
  // if (status !== 'ok') {
  //   throw new Error(message);
  // }

  return coins;
};

const price = { get };

export default price;
