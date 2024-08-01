export function useLocalStorage() {
  function setLocalStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function getLocalStorage(key: string) {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
  }

  function removeItemLocalStorage(key: string) {
    localStorage.removeItem(key);
  }

  function clearLocalStorage() {
    localStorage.clear();
  }

  return {
    setLocalStorage,
    getLocalStorage,
    removeItemLocalStorage,
    clearLocalStorage,
  };
}
