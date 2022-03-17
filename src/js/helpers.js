import { TIMEOUT_SEC } from './config.js';

export const AJAX = async function (url, dataToSend = undefined) {
  try {
    const fetchPost = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend),
    };
    const fetchPro = dataToSend ? fetch(url, fetchPost) : fetch(url);
    const res = await Promise.race([fetchPro, timeOut(TIMEOUT_SEC)]);
    console.log(res);
    if (!res.ok) throw new Error(`${res.statusText} ${res.status}`);
    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};

// export const getJSON = async function (url) {
//   try {
//     const res = await Promise.race([fetch(url), timeOut(TIMEOUT_SEC)]);
//     console.log(res);
//     if (!res.ok) throw new Error(`${res.statusText} ${res.status}`);
//     const data = await res.json();
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };

// export const sendJSON = async function (url, dataToSend) {
//   try {
//     const fetchPost = {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(dataToSend),
//     };
//     const res = await Promise.race([
//       fetch(url, fetchPost),
//       timeOut(TIMEOUT_SEC),
//     ]);
//     console.log(res);
//     if (!res.ok) throw new Error(`${res.statusText} ${res.status}`);
//     const data = await res.json();
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };

export const timeOut = function (seconds) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(
        new Error(`Request took too long! Timeout after ${seconds} second`)
      );
    }, seconds * 1000);
  });
};
