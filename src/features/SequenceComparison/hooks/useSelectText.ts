import { RefObject, useEffect } from "react";

export const useSelectText = (
  containerRef: RefObject<HTMLDivElement | null>,
  cb?: (selectedText?: string) => void
) => {
  useEffect(() => {
    const handler = () => {
      const selection = window.getSelection();
      const selectedText = selection?.toString().trim();

      if (!selectedText) {
        return null;
      }

      const range = selection?.getRangeAt(0);
      const container = containerRef.current;

      if (
        container &&
        container.contains(range?.commonAncestorContainer ?? null)
      ) {
        navigator.clipboard
          .writeText(selectedText)
          .then(() => {
            cb?.(selectedText);
          })
          .catch(() => {
            //empty
          });
      }
    };
    document.addEventListener("mouseup", handler);

    return () => document.removeEventListener("mouseup", handler);
  }, []);
};
