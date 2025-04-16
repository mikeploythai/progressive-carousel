/**
 * useMediaQuery hook from shadcn/ui repo
 * https://github.com/shadcn-ui/ui/blob/d1a36d3e178a92ff2538f9e3f2c9b6f7e7e768a7/apps/www/hooks/use-media-query.tsx
 */

import { useEffect, useState } from "react";

const useMediaQuery = (query: string) => {
  const [value, setValue] = useState(false);

  useEffect(() => {
    const onChange = (event: MediaQueryListEvent) => {
      setValue(event.matches);
    };

    const result = matchMedia(query);
    result.addEventListener("change", onChange);
    setValue(result.matches);

    return () => {
      result.removeEventListener("change", onChange);
    };
  }, [query]);

  return value;
};

export default useMediaQuery;
