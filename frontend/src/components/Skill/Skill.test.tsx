import Skill from "./Skill";
import { render, cleanup, waitFor, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { initialState as InitialStateValue } from "../../redux/initialState";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
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

describe("Main Skill component works as expected", () => {
  it("Component renders without crashing", () => {
    const component = () =>
      render(
        <Skill title={"skill section"} variant={"#da80cf"} icon={faBookmark} />
      );
    expect(component).toBeDefined();
  });

  it("Error component is not showed when no error happened", async () => {

    const skillDataPlaceholder = [
      {
        id: "a1asd65a6sd1sa6dsda",
        name: "Skill test name 1",
        percentage: 23,
      },
      {
        id: "a1asd65a6sd1sa6dsda231",
        name: "Skill test name 2",
        percentage: 96,
      },
      {
        id: "a1asd65a6sd1sa6dsda42",
        name: "Skill test name 3",
        percentage: 62,
      },
    ]
    
    const component = () =>
      renderWithRedux(
        <Skill title={"skill section"} variant={"#da80cf"} icon={faBookmark} />,
        {
          initialState: {
            ...InitialStateValue,
            skillData: skillDataPlaceholder
          }
        }
      );

    await waitFor(() => component().container);
    const { queryByTestId, getAllByRole, queryAllByTestId } = component();
    expect(component).not.toBeNull();

    const errorComponent = queryByTestId("error-wrapper");
    expect(errorComponent).toBeNull();
    
    const hocWrapper = screen.queryAllByTestId("hoc-wrapper")[0];
    expect(hocWrapper).not.toBeNull();
    
    fireEvent.click(hocWrapper)
    
    const skillContainer = queryAllByTestId("skill-container");
    expect(skillContainer.length).toBeGreaterThanOrEqual(1);
    
    const skillPercentage = queryAllByTestId("skill-percentage");
    expect(skillPercentage[0]).not.toBeNull();
    expect(skillPercentage[0].textContent).toBe(`${skillDataPlaceholder[0].percentage}%`);
    
    const skillName = queryAllByTestId("skill-name");
    expect(skillName[0]).not.toBeNull();
    expect(skillName[0].textContent).toBe(skillDataPlaceholder[0].name);
  });
});

describe("Main Skill component shows loading spinner when loading", () => {
  it("Component renders without crashing", () => {
    const component = () =>
      render(
        <Skill title={"skill section"} variant={"#da80cf"} icon={faBookmark} />
      );
    expect(component).toBeDefined();
  });

  it("Error component is not showed when no error happened", async () => {

    const component = () =>
      renderWithRedux(
        <Skill title={"skill section"} variant={"#da80cf"} icon={faBookmark} />,
        {
          initialState: InitialStateValue
        }
      );

    await waitFor(() => component().container);
    const { queryByTestId, getAllByRole, queryAllByTestId } = component();
    expect(component).not.toBeNull();

    const errorComponent = queryByTestId("error-wrapper");
    expect(errorComponent).toBeNull();
    
    const loadingSpinner = queryAllByTestId("loading-spinner");
    expect(loadingSpinner).not.toBeNull();
    
    
  });
});