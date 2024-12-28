import { useEffect, useRef, RefObject } from "react";

type RefOrNull<T> = RefObject<T> | null;

export default function useClickOutside(
  callbackFn: () => void,
  refs: RefOrNull<HTMLElement>[] = []
): RefObject<HTMLDivElement> {
  const defaultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      const isClickInside = [defaultRef, ...refs].some(
        (ref) => ref?.current && ref.current.contains(event.target as Node)
      );

      if (!isClickInside) {
        callbackFn();
      }
    };

    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [callbackFn, refs]);

  return defaultRef;
}
