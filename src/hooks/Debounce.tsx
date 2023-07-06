import { useRef } from "react";

export const useDebouncedValue = (
  callback: (value: string) => void,
  delay: number
) => {
  const timeoutRef = useRef<number>();

  const debouncedCallback = (value: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => callback(value), delay);
  };

  return debouncedCallback;
};
