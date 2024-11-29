import { useState, useEffect } from "react";

function useLocalStorageSync<T>(
  key: string,
  defaultValue: T
): [T, (data: T) => void] {
  const [data, setData] = useState<T>(() => {
    try {
      const storedData = localStorage.getItem(key);
      return storedData ? (JSON.parse(storedData) as T) : defaultValue;
    } catch {
      console.error("Failed to parse localStorage data");
      return defaultValue;
    }
  });

  const updateData = (newData: T) => {
    console.log("1newData:",newData)
    setData(() => {
      localStorage.setItem(key, JSON.stringify(newData)); // 同步到 localStorage
      return newData; // 确保返回更新后的数据
    });
  };

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.newValue) {
        try {
          const parsedData = JSON.parse(event.newValue) as T;
          setData(parsedData);
        } catch {
          console.error("Failed to parse localStorage data on storage event");
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key]);

  console.log("2oldData need to update:",data)
  return [data, updateData];
}

export default useLocalStorageSync;
