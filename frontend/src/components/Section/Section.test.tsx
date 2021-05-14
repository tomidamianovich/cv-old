import Section from "./Section";
import { render, cleanup, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../redux/store";
import { initialState as InitialStateValue } from "../../redux/initialState";

jest.mock("react-i18next", () => ({
  // this mock makes sure any components using the translate HoC receive the t function as a prop
  withTranslation: () => (Component: any) => {
    Component.defaultProps = { ...Component.defaultProps, t: () => "" };
    return Component;
  },
}));

export function renderWithRedux(ui:any, { initialState = InitialStateValue } = {}) {
  const actions:any = [];
  const utils = {
    dispatch(action:any) {
      return store.dispatch(action);
    },
    getDispatchedActions() {
      return actions;
    },
    getState() {
      return store.getState();
    },
  };
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    ...utils,
  };
}

afterEach(cleanup);

describe("Main Section component works as expected", () => {
  it("Component renders without crashing", () => {
    const component = () =>
      render(
        <Section />
      );
    expect(component).toBeDefined();
  });


  it("Error component is not showed when no error happened", async () => {

    const component = () =>
     renderWithRedux(
      <Section />,
      { initialState: InitialStateValue }
    );

    await waitFor(() => component().container);
    const { queryByTestId, getAllByRole, queryAllByTestId } = component()
    expect(component).not.toBeNull();

    const errorComponent = queryByTestId("error-wrapper");
    expect(errorComponent).toBeNull();
    const sectionData = queryAllByTestId("section-container");
    expect(sectionData.length).toBeGreaterThan(0);

  });
})