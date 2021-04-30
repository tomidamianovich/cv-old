import React from "react";

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
      return <span>'Loading...'</span>;
    case !isLoading && !hasError:
      return <>{children}</>;
    default:
      return null;
  }
};

export default AsyncLoading;
