import { useEffect, useState } from "react";

export const useDebouncedSearch = (searchValue: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<string>(searchValue);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchValue);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [searchValue, delay]);
  return debouncedValue;
};