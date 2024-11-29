import { useState, useEffect, useCallback, useLayoutEffect } from "react";

function useLocalStorageSync<T>(
  key: string,
  defaultValue: T
): [T, (data: T) => void] {
  // const [isUpdate,setIsUpdate]=useState(false)
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
    // setIsUpdate(prev=>!prev)
    setData((prevData) => {
      if (JSON.stringify(prevData) !== JSON.stringify(newData)) {
        console.log("Updating state from:", prevData, "to:", newData,newData===prevData);
        localStorage.setItem(key, JSON.stringify(newData));
        return newData;
      }
      return prevData;
    });
  }, [key]);

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

  // useLayoutEffect(() => {
  //   console.log("useLayoutEffect: data updated:", data);
  // }, [data]);

  // useEffect(() => {
  //   console.log("useEffect: data updated:", isUpdate);
  // }, [isUpdate]);

  return [data, updateData];
}

export default useLocalStorageSync;
