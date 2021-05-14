import React from "react";
import Spinner from "../Spinner";
import ErrorSection from "../ErrorSection";

type Props = {
  children: JSX.Element;
  isLoading: boolean;
  hasError: boolean;
};

const AsyncLoading: React.FC<Props> = ({ children, isLoading, hasError }) => {
  switch (true) {
    case hasError:
      return <ErrorSection />;
    case isLoading:
      return <Spinner data-testid="loading-spinner" />;
    case !isLoading && !hasError:
      return <>{children}</>;
    default:
      return null;
  }
};

export default AsyncLoading;
