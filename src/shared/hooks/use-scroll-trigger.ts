import { useState, useEffect, useCallback } from "react";

interface UseScrollTriggerOptions {
  threshold?: number;
  disableHysteresis?: boolean;
  target?: Window | HTMLElement;
  resetOnBlur?: boolean;
}

function useScrollTrigger({
  threshold = 100,
  disableHysteresis = false,
  target = window,
  resetOnBlur = false,
}: UseScrollTriggerOptions = {}): boolean {
  const [trigger, setTrigger] = useState(false);

  const handleScroll = useCallback(() => {
    const scrollTop =
      target instanceof Window ? target.pageYOffset : target.scrollTop;
    const shouldTrigger = scrollTop > threshold;

    if (shouldTrigger !== trigger) {
      if (!disableHysteresis || (disableHysteresis && !trigger)) {
        setTrigger(shouldTrigger);
      }
    }
  }, [trigger, threshold, disableHysteresis, target]);

  useEffect(() => {
    if (target) {
      target.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (target) {
        target.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll, target]);

  useEffect(() => {
    if (resetOnBlur) {
      const handleBlur = () => setTrigger(false);
      window.addEventListener("blur", handleBlur);
      return () => {
        window.removeEventListener("blur", handleBlur);
      };
    }
  }, [resetOnBlur]);

  return trigger;
}

export default useScrollTrigger;
