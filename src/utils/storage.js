import { initialDummyData } from './dummyData';

export const initializeStorage = () => {
  Object.keys(initialDummyData).forEach(key => {
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, JSON.stringify(initialDummyData[key]));
    }
  });
};

export const getStorage = (key) => {
  try {
    const item = localStorage.getItem(key);
    if (!item) return initialDummyData[key] || null;
    const parsed = JSON.parse(item);
    return parsed === null ? (initialDummyData[key] || null) : parsed;
  } catch {
    return initialDummyData[key] || null;
  }
};

export const setStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
