import { useState, useEffect, useCallback, useLayoutEffect } from "react";

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

  const updateData = useCallback((newData: T) => {
    if (JSON.stringify(data) !== JSON.stringify(newData)) {
      localStorage.setItem(key, JSON.stringify(newData));
      setData(newData);
    }
  }, [data, key]);
  

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
//   useEffect(()=>{
// console.log("應該為立即更新的data",data);
//   },[data])
//   useLayoutEffect(()=>{

// console.log("useLayoutEffect,應該為立即更新的data",data);
//   },[data])

  // console.log("2oldData need to update:",data)
  return [data, updateData];
}
export default useLocalStorageSync