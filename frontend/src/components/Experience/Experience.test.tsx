import Experience from "./Experience";
import {
  render,
  cleanup,
  waitFor,
  screen,
  fireEvent,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { initialState as InitialStateValue } from "../../redux/initialState";
import reducer from "../../redux/reducers/reducers";
import { createStore } from "redux";
import configureStore from "redux-mock-store";
import { setExperienceData } from "../../redux/actions/actions";
import actionTypes from "../../redux/actionsTypes/StoreTypes";
import { getFormattedDate } from "../../utils/handlers";

const middlewares: any = [];
const mockStore = configureStore(middlewares);

export function renderWithRedux(
  ui: any,
  { initialState = InitialStateValue } = {}
) {
  const actions: any = [];
  const store = createStore(reducer, initialState);
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
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    ...utils,
  };
}

afterEach(cleanup);

describe("Main Experience component works as expected", () => {
  it("Component renders without crashing", () => {
    const component = () =>
      render(
        <Experience
          title={"education title test"}
          variant={"#94d4d0"}
          icon={faBookmark}
        />
      );
    expect(component).toBeDefined();
  });

  it("Component should dispatch action", () => {
    // Initialize mockstore with empty state
    const store = mockStore(InitialStateValue);

    const actionPayload = {
      id: "6092b10b6eed5b0e3c96c158",
      jobTitle: "Senior Front End Engineer",
      jobDescription: "REACT, STYLED COMPONENTS, JEST, NODE, BEM, STORYBOOK",
      startDate: "2021-05-17T00:00:00.244Z",
      endDate: "2021-05-17T00:00:00.244Z",
      person_id: "60927d23c4dbd94394299dae",
      place: {
        name: "Universidad Tecnologica Nacional - FRLP",
        image: "utn.png",
      },
    };

    // Dispatch the action
    store.dispatch(setExperienceData(actionPayload));

    // Test if your store dispatched the expected actions
    const actions = store.getActions();
    const expectedPayload = {
      type: actionTypes.SET_EXPERIENCE_DATA,
      payload: actionPayload,
    };
    expect(actions).toEqual([expectedPayload]);
  });

  it("Error component is not showed when no error happened", async () => {
    const actionPayload = {
      id: "6092b10b6eed5b0e3c96c158",
      jobTitle: "Senior Front End Engineer",
      jobDescription: "REACT, STYLED COMPONENTS, JEST, NODE, BEM, STORYBOOK",
      startDate: "2021-05-17T00:00:00.244Z",
      endDate: "2021-05-17T00:00:00.244Z",
      person_id: "60927d23c4dbd94394299dae",
      place: {
        name: "Universidad Tecnologica Nacional - FRLP",
        image: "utn.png",
      },
    };

    const experienceDataPayload = [
      actionPayload,
      actionPayload,
      actionPayload,
    ];

    const component = () =>
      renderWithRedux(
        <Experience
          title={"education title test"}
          variant={"#94d4d0"}
          icon={faBookmark}
        />,
        {
          initialState: {
            ...InitialStateValue,
            experienceData: experienceDataPayload,
          },
        }
      );

    await waitFor(() => component().container);
    const { queryByTestId, queryAllByTestId, getByText } = component();
    expect(component).not.toBeNull();

    const errorComponent = queryByTestId("error-wrapper");
    expect(errorComponent).toBeNull();

    const hocWrapper = screen.queryAllByTestId("hoc-wrapper")[0];
    expect(hocWrapper).not.toBeNull();
    fireEvent.click(hocWrapper);

    const educationContainer = queryAllByTestId("education-container-item");
    expect(educationContainer).not.toBeNull();
    expect(educationContainer.length).toBe(experienceDataPayload.length);

    const educationImageContainer = educationContainer[0].querySelector(
      "div .image-container img"
    );
    expect(educationImageContainer?.getAttribute("src")).toBe(
      `/images/places/${experienceDataPayload[0].place.image}`
    );

    const { jobTitle, jobDescription, place, startDate, endDate } = experienceDataPayload[0];

    const educationText = `${jobTitle} (${jobDescription}) ${getFormattedDate(startDate)} - Actualidad${place.name}`

    expect(educationContainer[0].textContent).toBe(educationText)
  });

  it("Component shows sections and not error page when using a valid store data", async () => {
    const component = () =>
      render(
        <Provider store={createStore(reducer, InitialStateValue)}>
          <Experience
            title={"education title test"}
            variant={"#94d4d0"}
            icon={faBookmark}
          />
        </Provider>
      );

    await waitFor(() => component().container);
    const { queryByTestId, queryAllByTestId } = component();
    const errorComponent = queryByTestId("error-wrapper");
    expect(errorComponent).toBeNull();
  });
});
