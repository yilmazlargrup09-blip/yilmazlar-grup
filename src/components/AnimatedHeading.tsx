'use client';
import React, { useEffect, useState, useRef } from 'react';

interface DynamicHeaderProps {
  text?: string;
  highlightedWord?: string;
}

const DynamicHeader: React.FC<DynamicHeaderProps> = ({ text = '', highlightedWord = '' }) => {
  const [isActive, setIsActive] = useState(false);
  const [highlightedWordWidth, setHighlightedWordWidth] = useState(0);
  const highlightedWordRef = useRef<HTMLSpanElement | null>(null);  // Reference for the highlighted word

  useEffect(() => {
    const timer = setTimeout(() => setIsActive(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Measure the width of the highlighted word when it's set
    if (highlightedWordRef.current) {
      setHighlightedWordWidth(highlightedWordRef.current.offsetWidth);
    }
  }, [highlightedWord]);  // Recalculate width when the highlighted word changes

  const words = text.split(' '); // Split the text into words
  const highlightedWordIndex = words.findIndex(word => word.toLowerCase() === highlightedWord.toLowerCase()); // Find the index of the highlighted word

  return (
    <h2 className="relative z-[99] font-black text-3xl md:text-4xl font-bold text-center mb-4  text-gray-900 tracking-[-0.0245em] leading-tight text-center dark:text-white ">
      {words.map((word, index) => (
        <React.Fragment key={index}>
          {index === highlightedWordIndex ? (
            <span className="relative z-[9] inline-block" ref={highlightedWordRef}>
              {word} {/* Highlighted word */}
              <span 
                className={`absolute bottom-0 left-0 bg-[#e92121] h-[15px] z-[-1] transition-all duration-[1000ms]  ${isActive ? 'w-full' : 'w-0'}`}
                style={{ width: isActive ? `${highlightedWordWidth+5}px` : '0' }}
                aria-hidden="true"
              ></span>
            </span>
          ) : (
            <span>{' '} {word} </span> // Other words with space between them
          )}
        </React.Fragment>
      ))}
    </h2>
  );
};

export default DynamicHeader;
