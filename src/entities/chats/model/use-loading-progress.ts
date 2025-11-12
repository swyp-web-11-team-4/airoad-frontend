import { useEffect, useState } from "react";
import { LOADING_STEPS, STEP_TRANSITION_INTERVAL } from "./chats.constants";

interface UseLoadingProgressProps {
  isCompleted: boolean;
}

export const useLoadingProgress = ({ isCompleted }: UseLoadingProgressProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (isCompleted) {
      setCurrentStep(LOADING_STEPS.length);
      return;
    }

    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < LOADING_STEPS.length - 1) return prev + 1;
        return prev;
      });
    }, STEP_TRANSITION_INTERVAL);

    return () => clearInterval(timer);
  }, [isCompleted]);

  return { currentStep };
};
