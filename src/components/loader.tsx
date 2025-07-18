import React, { useState, useEffect } from "react";

const DEFAULT_LOADER_CHARACTERS = '|[●▪▪●]|';
const DEFAULT_LOADER_SPEED_MS = 200;

interface ILoaderProps {
  speed?: number;
  characters?: string;
}

function Loader({ speed, characters }: ILoaderProps): React.ReactElement {
  const chars = characters || DEFAULT_LOADER_CHARACTERS;
  const [tick, setTick] = useState<number>(0);

  const nextStep = function (): void {
    setTick((tick + 1) % chars.length);
  };

  useEffect(() => {
    const interval = setInterval(nextStep, speed || DEFAULT_LOADER_SPEED_MS);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <span className="inline-block align-middle ml-4 font-mono">doing math ... {chars[tick]}</span>
  );
}

export default Loader;
