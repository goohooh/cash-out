import { useState, useCallback } from "react"

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  const toggleModal = useCallback(() => {
    setIsShowing(s => !s);
  }, [])

  return { isShowing, toggleModal };
}

export default useModal;