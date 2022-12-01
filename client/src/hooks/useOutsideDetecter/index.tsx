import React, { useRef, useEffect } from "react";
import OutsideDetecterProps from "./type";

function assertIsNode(e: EventTarget | null): asserts e is Node {
  if (!e || !("nodeType" in e)) {
    throw new Error(`Node expected`);
  }
}

function OutsideDetecter({ children, callback }: OutsideDetecterProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = ({ target }: MouseEvent) => {
      assertIsNode(target);
      if (wrapperRef.current && wrapperRef.current.parentNode && !wrapperRef.current.parentNode.contains(target)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef, callback]);

  return <div ref={wrapperRef}>{children}</div>;
}

export default OutsideDetecter;
