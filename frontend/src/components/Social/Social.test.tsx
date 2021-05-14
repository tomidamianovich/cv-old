import Social from "./Social";
import { render, cleanup, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { initialState as InitialStateValue } from "../../redux/initialState";
import { createStore } from "redux";
import reducer from "../../redux/reducers/reducers";

jest.mock("react-i18next", () => ({
  // this mock makes sure any components using the translate HoC receive the t function as a prop
  withTranslation: () => (Component: any) => {
    Component.defaultProps = { ...Component.defaultProps, t: () => "" };
    return Component;
  },
}));

export function renderWithRedux(
  ui: any,
  { initialState = InitialStateValue } = {}
) {
  const actions: any = [];
  const utils = {
    dispatch(action: any) {
      return store.dispatch(action);
    },
    getDispatchedActions() {
      return actions;
    },
    getState() {
      return store.getState();
    },
  };
  const store = createStore(reducer, initialState);
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    ...utils,
  };
}

afterEach(cleanup);

describe("Main Social component works as expected", () => {
  it("Component renders without crashing", () => {
    const component = () =>
      render(
        <Social />
      );
    expect(component).toBeDefined();
  });

  it("Error component is not showed when no error happened", async () => {

    const socialDataPlaceholder = {
      prefix: '',
      description: '',
      name: '',
      lastname: '',
      age: 0,
      civilStatus: '',
      locationName: '',
      locationValue: '',
      profilePhoto: '',
      experience: {
        title: '',
        place: '',
      },
      social: {
        _id: '',
        instagram: '',
        facebook: '',
        telephone: '',
        mail: '',
        linkedIn: '',
        person_id: '',
      }
    }
    
    const component = () =>
      renderWithRedux(
        <Social />,
        {
          initialState: {
            ...InitialStateValue,
            personalData: socialDataPlaceholder
          }
        }
      );

    await waitFor(() => component().container);
    const { queryByTestId, getAllByRole, queryAllByTestId } = component();
    expect(component).not.toBeNull();

    const errorComponent = queryByTestId("error-wrapper");
    expect(errorComponent).toBeNull();
    
    const socialContainer = queryAllByTestId("social-container");
    expect(socialContainer.length).toBeGreaterThanOrEqual(1);
    
    const socialPercentage = queryAllByTestId("social-percentage");
    expect(socialPercentage[0]).not.toBeNull();
    
    const socialName = queryAllByTestId("social-name");
    expect(socialName[0]).not.toBeNull();
  });
});

describe("Main Social component shows loading spinner when loading", () => {
  it("Component renders without crashing", () => {
    const component = () =>
      render(
        <Social />
      );
    expect(component).toBeDefined();
  });

  it("Error component is not showed when no error happened", async () => {

    const component = () =>
      renderWithRedux(
        <Social />,
        {
          initialState: InitialStateValue
        }
      );

    await waitFor(() => component().container);
    const { queryByTestId, queryAllByTestId } = component();
    expect(component).not.toBeNull();

    const errorComponent = queryByTestId("error-wrapper");
    expect(errorComponent).toBeNull();
    
    const loadingSpinner = queryAllByTestId("loading-spinner");
    expect(loadingSpinner).not.toBeNull();
    
    const socialItem = queryAllByTestId("social-item");
    expect(socialItem.length).toBeGreaterThan(0);
    
  });
});