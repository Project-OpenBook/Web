import { ChangeEvent, FormEvent, useState } from "react";

interface Props<T> {
  init: T;
  submitCallback: (value: T) => void;
  validateCallback?: (value: T) => boolean | undefined;
}

export function useInput<T>({
  init,
  submitCallback,
  validateCallback,
}: Props<T>) {
  const [value, setValue] = useState<T>(init);
  const [error, setError] = useState(Boolean);

  const onchange = (event: ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setValue(event.target.value as T);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (value === "") return setError(true);

    if (!!validateCallback && validateCallback(value) === false)
      return setError(true);

    setValue(init);
    submitCallback(value);
  };

  return { handleSubmit, value, onchange, error };
}
