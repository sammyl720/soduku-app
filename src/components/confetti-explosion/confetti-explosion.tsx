import React, { useEffect, useRef, useState } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

interface ConfettiExplosionProps {
  active: boolean;
  duration?: number; // Duration in milliseconds
}

const ConfettiExplosion: React.FC<ConfettiExplosionProps> = ({
  active,
  duration = 5000,
}) => {
  const { width, height } = useWindowSize();
  const [show, setShow] = useState<boolean>(active);
  const timer: React.MutableRefObject<ReturnType<typeof setTimeout> | null> =
    useRef(null);

  useEffect(() => {
    if (active) {
      setShow(true);
      timer.current = setTimeout(() => {
        setShow(false);
        if (timer.current) {
          clearTimeout(timer.current);
          timer.current = null;
        }
      }, duration);
    }
  }, [active, duration]);

  return show ? <Confetti width={width} height={height} /> : null;
};

export default ConfettiExplosion;
