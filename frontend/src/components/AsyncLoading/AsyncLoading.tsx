import React from "react";
import Spinner from "../Spinner"

type Props = {
  children: JSX.Element;
  isLoading: boolean;
  hasError: boolean;
};

const AsyncLoading: React.FC<Props> = ({ children, isLoading, hasError }) => {
  switch (true) {
    case hasError:
      return <span>'Error...'</span>;
    case isLoading:
      return <Spinner width="20px" height="20px" />
    case !isLoading && !hasError:
      return <>{children}</>;
    default:
      return null;
  }
};

export default AsyncLoading;
