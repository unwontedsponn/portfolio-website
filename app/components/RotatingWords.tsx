"use client"
import React, { useState, useEffect } from 'react';

interface RotatingWordsProps{
  words: string[];
  intervalDuration?: number;
  className?: string;
}

const RotatingWords: React.FC<RotatingWordsProps> = ({ words, intervalDuration = 1500, className }) => {
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWord(currentWord => (currentWord + 1) % words.length);
    }, intervalDuration);

    return () => clearInterval(intervalId);
  }, [words.length, intervalDuration]); // Include intervalDuration in the dependency array

  if (words.length === 0) return null; // Return null if words array is empty

  return (
    <p className={className}>
      {words[currentWord]}
    </p>
  );
}
export default RotatingWords;