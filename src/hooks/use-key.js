import { useState, useEffect } from 'react';

function useKey(key) {
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    function match(event) {
      return key.toLowerCase() === event.key.toLowerCase();
    }

    function onDown(event) {
      if (match(event)) setPressed(true);
    }

    function onUp(event) {
      if (match(event)) setPressed(false);
    }

    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup', onUp);

    return () => {
      window.removeEventListener('keydown', onDown);
      window.removeEventListener('keyup', onUp);
    };
  }, [key]);

  return pressed;
}

export default useKey;
