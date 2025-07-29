// src/utils/api.js
import dummyCDR from '../data/dummyCDR';

export const fetchCDRByPhone = (phone) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!phone.startsWith('+91')) {
        reject(new Error('Invalid phone number format.'));
      } else {
        // Simulate filtering like real server-side logic
        const result = dummyCDR.filter(
          record => record.Caller === phone || record.Receiver === phone
        );

        if (result.length === 0) {
          reject(new Error('No records found.'));
        } else {
          resolve(result);
        }
      }
    }, 1000); // Simulated network delay
  });
};
