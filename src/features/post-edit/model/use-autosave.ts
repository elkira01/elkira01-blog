import { useRef, useCallback, useEffect } from "react";

type AutosaveOptions<T> = {
  onSave: (value: T) => Promise<void> | void;
  delay?: number;
};

export function useAutosave<T>({ onSave, delay = 1500 }: AutosaveOptions<T>) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const latestValueRef = useRef<T | null>(null);

  const trigger = useCallback(
    (value: T) => {
      latestValueRef.current = value;

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        if (latestValueRef.current !== null) {
          void Promise.resolve(onSave(latestValueRef.current)).catch(() => undefined);
          latestValueRef.current = null;
        }
      }, delay);
    },
    [onSave, delay],
  );

  const flush = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (latestValueRef.current !== null) {
      void Promise.resolve(onSave(latestValueRef.current)).catch(() => undefined);
      latestValueRef.current = null;
    }
  }, [onSave]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return { trigger, flush };
}
