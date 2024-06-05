import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const useDebounce = ({ value, delay }) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};

useDebounce.propTypes = {
  value: PropTypes.string.isRequired,
  delay: PropTypes.number,
};

useDebounce.defaultProps = {
  delay: 1000,
};

export default useDebounce;
