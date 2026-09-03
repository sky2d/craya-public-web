"use client";

import { CompletionResult } from "components/src/interfaces";
import React, { useEffect, useState } from "react";

interface ProgressBarProps {
  status: CompletionResult;
}

const helperFunction = (status: CompletionResult, stepName: string): boolean => {
  // Safely check if the step exists in the `completed` list
  return status?.details.completed?.includes(stepName) ?? false;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ status }) => {
  const steps = ["Make Profile", "Add Products", "Design Storefront", "Download Seller UI"];

  const [currentStep, setCurrentStep] = useState(2); // Default to step 2
  const [dynamicSteps, setDynamicSteps] = useState(steps);

  useEffect(() => {
    if (!status?.details?.store?.completed) return;

    const updatedSteps = [...steps];
    let newStep = currentStep;

    // Check if "Add Loops" exists and update the step
    if (helperFunction(status, "Add Loops")) {
      updatedSteps[3] = "Download Seller UI";
      newStep = Math.max(newStep, 3);
    }

    setDynamicSteps(updatedSteps);
    setCurrentStep(newStep);
  }, [status]); // Re-run when `status` changes

  // Calculate the percentage of progress based on the current step
  const progress = (currentStep / (steps.length - 1)) * 100;

  // start the progress bar for mid of the  first circle
  // empty space of the progress bar should be filled with light yellow color
  // put the circles on the progress bar

  return (
    <div className="relative">
      {/* Progress Bar */}
      <div className="relative h-2 w-4/5 rounded-full bg-brand-color2">
        {/* Filler Bar */}
        <div className="absolute left-0 top-0 h-2 rounded-full bg-brand-color3 transition-all duration-1000" style={{ width: `${progress}%` }}></div>
      </div>

      {/* Steps Circles */}
      <div className="relative flex justify-between">
        {dynamicSteps.map((step, index) => (
          <div key={index} className="relative flex w-full items-center">
            {/* Step Circle Positioned Above Progress Bar */}
            <div
              className={`absolute -top-4 flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                index <= currentStep ? "text-white border-brand-color3 bg-brand-color3" : "border-yellow-500 bg-yellow-500 text-white-light4"
              } transition-all duration-500`}
            >
              <div className="h-3 w-3 rounded-full bg-white-light4"></div>
            </div>

            {/* Step Label */}
            <div className="mt-4 flex items-center">
              <p className="w-11/12 text-black-dark1 transition-all duration-300 body-sm-semibold">{step}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
