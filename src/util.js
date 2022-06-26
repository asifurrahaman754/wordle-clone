export const encryptedGlobalObject = {};

export function encryptSolution(solution) {
  const key = "_" + Math.random().toString(36).substr(2, 9) + Date.now();
  encryptedGlobalObject[key] = solution;
  return key;
}

export function decryptSolution(key) {
  return encryptedGlobalObject[key];
}
