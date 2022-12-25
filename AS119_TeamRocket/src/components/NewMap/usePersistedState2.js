import { useState, useEffect } from "react";
import { get, set, clear } from "idb-keyval";

const usePersistedState = (key, defaultValue) => {
  const value = JSON.parse(localStorage.getItem(key)) || [defaultValue];
  const [state, setState] = useState(() => value[0]);
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify([state]));
  }, [key, state]);
  return [state, setState];
};





const useStoredState = (key, defaultValue) => {
  const [state, setState] = useState(defaultValue);

  useEffect(() => {
    (async () => {
      const value = await get(key);
      setState(value);
    })();
  }, [key]);

  useEffect(() => {
    (async () => {
      if (state !== undefined) await set(key, state);
      else {
        await set(key, defaultValue);
        setState(defaultValue);
      }
    })();
    return () => clear();
  }, [state, key, defaultValue]);

  return [state, setState];
};

export { usePersistedState, useStoredState };
