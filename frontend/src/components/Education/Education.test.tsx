import Education from "./Education";
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
import { setEducationalData } from "../../redux/actions/actions";
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

describe("Main Education component works as expected", () => {
  it("Component renders without crashing", () => {
    const component = () =>
      render(
        <Education
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
      degree: "",
      description: "",
      startDate: "",
      endDate: "",
      place_id: "",
      person_id: "",
      place: {
        name: "",
        image: "",
      },
    };

    // Dispatch the action
    store.dispatch(setEducationalData(actionPayload));

    // Test if your store dispatched the expected actions
    const actions = store.getActions();
    const expectedPayload = {
      type: actionTypes.SET_EDUCATION_DATA,
      payload: actionPayload,
    };
    expect(actions).toEqual([expectedPayload]);
  });

  it("Error component is not showed when no error happened", async () => {
    const actionPayload = {
      degree: "Ingeniero en sistemas de información",
      description: "Finalizado",
      startDate: "2013-01-01T00:00:00.244Z",
      endDate: "2019-01-01T00:00:00.244Z",
      place_id: "6092adcf1809fe098bc68219",
      person_id: "60927d23c4dbd94394299dae",
      place: {
        name: "Universidad Tecnologica Nacional - FRLP",
        image: "utn.png",
      },
    };

    const educationalDataPayload = [
      actionPayload,
      actionPayload,
      actionPayload,
    ];

    const component = () =>
      renderWithRedux(
        <Education
          title={"education title test"}
          variant={"#94d4d0"}
          icon={faBookmark}
        />,
        {
          initialState: {
            ...InitialStateValue,
            educationalData: educationalDataPayload,
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
    expect(educationContainer.length).toBe(educationalDataPayload.length);

    const educationImageContainer = educationContainer[0].querySelector(
      "div .image-container img"
    );
    expect(educationImageContainer?.getAttribute("src")).toBe(
      `/images/places/${educationalDataPayload[0].place.image}`
    );

    const { degree, description, place, startDate, endDate } = educationalDataPayload[0];

    const educationText = `${degree} (${description}) ${getFormattedDate(startDate)} - ${getFormattedDate(endDate)}${place.name}`

    expect(educationContainer[0].textContent).toBe(educationText)
  });

  it("Component shows sections and not error page when using a valid store data", async () => {
    const component = () =>
      render(
        <Provider store={createStore(reducer, InitialStateValue)}>
          <Education
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
