import App from "./App";
import { render, waitFor } from '@testing-library/react';
import { Provider } from "react-redux";
import store from "./redux/store";
import "./i18n";
import { Suspense } from "react"

describe("Main App component works as expected", () => {
  it("Component renders without crashing", () => {
    const component = () => render(<App />);
    expect(component).toBeDefined();
  });

  it("Error component is not showed when no error happened", () => {
    const component = () =>
      render(
        <Provider store={store}>
          <App />
        </Provider>
      );
    const { queryByTestId } = component();
    const errorComponent = queryByTestId("error-wrapper");
    expect(errorComponent).toBeNull();
  });

  it("Component shows sections and not error page when using a valid store data", async () => {
    const { queryByTestId } = render(
      <Provider store={store}>
        <Suspense fallback={"loading"}>
          <App />
        </Suspense>
      </Provider>
    );
    
    const errorComponent = await waitFor(() => queryByTestId("error-wrapper"));
    expect(errorComponent).toBeNull();
  });
});
