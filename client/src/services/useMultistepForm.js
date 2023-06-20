import {  useState,useMemo } from "react"

/**
 * A hook that returns the current step and the steps array.           
 * @param {Array<Step>} steps - The steps array.           
 * @returns {Object} - The current step and the steps array.           
 */
export function useMultistepForm(steps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const valid=useMemo(()=>{
    let res=true
    const {validate}= steps[currentStepIndex]
    if(!validate) return true
    validate?.forEach(element => {
      if (element) res=false
    })
    return res
  },[steps[currentStepIndex]])

  function next() {
    setCurrentStepIndex(i => {
      if (i >= steps.length - 1) return i
      return i + 1
    })
  }

  function back() {
    setCurrentStepIndex(i => {
      if (i <= 0) return i
      return i - 1
    })
  }

  function goTo(index) {
    setCurrentStepIndex(index)
  }

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    steps,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    goTo,
    next,
    back,
    valid
  }
}