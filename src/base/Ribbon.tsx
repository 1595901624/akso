import React, { useState, useEffect, ReactNode } from "react";
import styled from "styled-components";

interface RibbonProps {
  children: ReactNode;
}

const RibbonWrapper = styled.div`
  position: relative;
  display: inline-block;
  overflow: hidden;
  border-radius: 4px;
//   box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  padding: 8px;

//   &:hover {
//     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
//     transform: translateY(-2px);
//   }

  &:active {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    // transform: translateY(1px);
    //   box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
`;

const RippleEffect = styled.span<{ top: number; left: number; size: number }>`
  position: absolute;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.2);
  transform: scale(0);
  animation: ripple 0.6s linear;
  pointer-events: none;

  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;

const Ribbon: React.FC<RibbonProps> = ({ children }) => {
  const [ripples, setRipples] = useState<
    { id: number; top: number; left: number; size: number }[]
  >([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (ripples.length > 0) {
        setRipples(ripples.slice(1));
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [ripples]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setRipples([...ripples, { id: Date.now(), top: y, left: x, size }]);
  };

  return (
    <RibbonWrapper onClick={handleClick}>
      {children}
      {ripples.map((ripple) => (
        <RippleEffect
          key={ripple.id}
          top={ripple.top}
          left={ripple.left}
          size={ripple.size}
          style={{
            top: ripple.top - ripple.size / 2,
            left: ripple.left - ripple.size / 2,
            width: ripple.size,
            height: ripple.size,
          }}
        />
      ))}
    </RibbonWrapper>
  );
};

export default Ribbon;
