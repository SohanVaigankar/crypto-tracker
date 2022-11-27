import { useLayoutEffect, useState } from "react";

const useResolution = () => {
  //   state to store screen resolution
  const [size, setSize] = useState(null);

  useLayoutEffect(() => {
    function updateResolution() {
      setSize(window.innerWidth);
    }

    window.addEventListener("resize", updateResolution);

    updateResolution();

    // cleanup fn
    return () => window.removeEventListener("resize", updateResolution);
  }, []);
  return size;
};

export default useResolution;
