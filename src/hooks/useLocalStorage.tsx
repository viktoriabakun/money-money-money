import dayjs from 'dayjs';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const dayjsReviver = (_: string, value: unknown) => {
  if (typeof value === 'string') {
    // Check if the string matches the ISO 8601 format
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value)) {
      return dayjs(value); // Convert the string to a dayjs object
    }
  }
  return value; // Return the original value for other properties
};

function useLocalStorageState<T>(
  key: string,
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>] {
  // Get the stored value from local storage (if it exists)
  const getStoredValue = (): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item, dayjsReviver) : initialValue;
    } catch (error) {
      console.error('Error retrieving data from local storage:', error);
      return initialValue;
    }
  };

  // Initialize the state with the stored value or the initial value
  const [state, setState] = useState<T>(getStoredValue);

  // Update local storage whenever the state changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error('Error storing data in local storage:', error);
    }
  }, [key, state]);

  return [state, setState];
}

export default useLocalStorageState;
