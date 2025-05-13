import { useState } from 'react';

function useInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  function handleValueChange(event) {
    setValue(event.target.value);
  }

  return [value, setValue];
}

export default useInput;
