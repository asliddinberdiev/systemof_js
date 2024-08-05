export function useLocalStorage() {
  function setLocalStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function getLocalStorage(key: string): string {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      const parsedValue = JSON.parse(storedValue);
      return typeof parsedValue === "string" ? parsedValue : "";
    }
    return "";
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
