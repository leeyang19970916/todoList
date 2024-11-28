import { useState, useEffect } from "react";

function useLocalStorageSync<T>(key: string, defaultValue: T): [T, (data: T) => void] {
  const [data, setData] = useState<T>(() => {
    const storedData = localStorage.getItem(key);
    try {
      return storedData ? (JSON.parse(storedData) as T) : defaultValue; 
    } catch {
      console.error("Failed to parse localStorage data");
      return defaultValue;
    }
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const storedData = localStorage.getItem(key);
      try {
        if (storedData) {
          setData(JSON.parse(storedData) as T);
        }
      } catch {
        console.error("Failed to parse localStorage data on storage event");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key]);

  const updateData = (newData: T) => {
    setData(newData);
    localStorage.setItem(key, JSON.stringify(newData));
  };

  return [data, updateData];
}

export default useLocalStorageSync;
