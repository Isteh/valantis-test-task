import CryptoJS from 'crypto-js';

const API_PASSWORD = 'Valantis';

export const getApiAccesKey = () => {
  const timestampUTC = new Date()
    .toISOString()
    .slice(0, 10)
    .replaceAll('-', '');

  return CryptoJS.MD5(
    `${API_PASSWORD}_${timestampUTC}`
  ).toString();
};
