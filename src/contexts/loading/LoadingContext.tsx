import { Spin } from "antd";
import { createContext, useEffect, useState } from "react";
import "./loading.scss";

interface Loading {
  isLoading: boolean;
}

const DEFAULT_STATE: Loading = {
  isLoading: false,
};

const LoadingContext = createContext<any>(DEFAULT_STATE);

const LoadingProvider = (props: any) => {
  const [state, setState] = useState(DEFAULT_STATE);

  const loading = document.querySelector("body");

  useEffect(() => {
    loading!.style.overflow = state.isLoading ? "hidden" : "auto";
  }, [loading, state.isLoading]);

  return (
    <LoadingContext.Provider value={[state, setState]}>
      {state.isLoading && (
        <div className="filter">
          <div className="spin">
            <Spin indicator={<div></div>} />
          </div>
        </div>
      )}
      {props.children}
    </LoadingContext.Provider>
  );
};
export { LoadingContext, LoadingProvider };
