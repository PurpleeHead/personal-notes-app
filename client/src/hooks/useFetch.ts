import { useReducer, useEffect } from "react";

export type FetchState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: string };

type FetchEvent<T> =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: T }
  | { type: "FETCH_ERROR"; payload: string }
  | { type: "RESET" };

const createInitialState = <_T,>(): FetchState<_T> => ({ status: "idle" });

export function fetchReducer<_T>(
  state: FetchState<_T>,
  event: FetchEvent<_T>
): FetchState<_T> {
  switch (event.type) {
    case "FETCH_START":
      return { status: "loading" };
    case "FETCH_SUCCESS":
      return { status: "success", data: event.payload };
    case "FETCH_ERROR":
      return { status: "error", error: event.payload };
    case "RESET":
      return createInitialState<_T>();
    default:
      return state;
  }
}

interface UseFetchOptions<T> {
  url: string;
  fetchOptions?: RequestInit;
  immediate?: boolean;
}

interface UseFetchResult<T> {
  state: FetchState<T>;
  execute: () => Promise<void>;
  reset: () => void;
}

export function useFetch<T>(
  { url, fetchOptions = {}, immediate = true }: UseFetchOptions<T>
): UseFetchResult<T> {
  const [state, dispatch] = useReducer(fetchReducer<T>, createInitialState<T>());

  const execute = async () => {
    dispatch({ type: "FETCH_START" });

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.text();
        dispatch({ type: "FETCH_ERROR", payload: error || "Ошибка запроса" });
        return;
      }

      const data = await response.json();
      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Неизвестная ошибка";
      dispatch({ type: "FETCH_ERROR", payload: errorMessage });
    }
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [url]);

  return { state, execute, reset };
}
