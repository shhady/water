import { useState, useEffect, useRef } from 'react'

/**
* takes initial state of component in @initialIsVisible and the alternate state of the component 
* in @changeIsVisible, and returns a ref to put in the components' returned jsx, a helper function to
* set the state of the component, and the state itself
*
* @function useComponentVisible
* @param initialIsVisible  - A boolean or string.
* @param changeIsVisible  - A boolean or string.
*/

export function useComponentVisible(initialIsVisible, changeIsVisible) {
  const [isComponentVisible, setIsComponentVisible] = useState(
    initialIsVisible
  );
  const ref = useRef(null);
  const activateRef = useRef(null);

  const handleHide = (event) => {
    if (event.key === "Escape") {
      setIsComponentVisible(initialIsVisible);
    }
  };

  const handleClick = (e) => {
    if (isComponentVisible === initialIsVisible) {
      activateRef.current = e.target;
      setIsComponentVisible(changeIsVisible);
    }
    else {
      setIsComponentVisible(initialIsVisible);
    }
  }

  const handleClickOutside = event => {
    if (isComponentVisible === initialIsVisible) {
      document.removeEventListener("keydown", handleHide, true);
      document.removeEventListener("click", handleClickOutside, true);
    }

    if (ref.current && !ref.current.contains(event.target) && activateRef.current !== event.target) {
      setIsComponentVisible(initialIsVisible);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleHide, true);
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("keydown", handleHide, true);
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [isComponentVisible]);

  return { ref, isComponentVisible, handleClick };
}
