import { Dispatch, SetStateAction, useEffect, useState } from 'react';

function useLocalStorageState<T>(
  key: string,
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>] {
  // Get the stored value from local storage (if it exists)
  const getStoredValue = (): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
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
