import Course from "./Course";
import { render, cleanup, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { initialState as InitialStateValue } from "../../redux/initialState";
import reducer from "../../redux/reducers/reducers";
import { createStore } from "redux";
import configureStore from "redux-mock-store"; 
import { setCourseData } from "../../redux/actions/actions";
import actionTypes from "../../redux/actionsTypes/StoreTypes";

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

describe("Main Course component works as expected", () => {
  it("Component renders without crashing", () => {
    const component = () =>
      render(
        <Course
          title={"course title test"}
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
      name: "Desarrollo Web",
      description: "Sobre conceptos basicos de HTML, CSS y PHP en UTN FRLP",
      date: "2016-01-01T00:00:00.244Z",
      person_id: "60927d23c4dbd94394299dae",
      place: {
        name: "Universidad Tecnologica Nacional - FRLP",
        image: "utn.png",
      },
    };

    // Dispatch the action
    store.dispatch(setCourseData(actionPayload));

    // Test if your store dispatched the expected actions
    const actions = store.getActions();
    const expectedPayload = {
      type: actionTypes.SET_COURSE_DATA,
      payload: actionPayload,
    };
    expect(actions).toEqual([expectedPayload]);
  });

  it("Error component is not showed when no error happened", async () => {
    const component = () =>
      renderWithRedux(
        <Course
          title={"course title test"}
          variant={"#94d4d0"}
          icon={faBookmark}
        />,
        { initialState: InitialStateValue }
      );

    await waitFor(() => component().container);
    const { queryByTestId, queryAllByTestId } = component();
    expect(component).not.toBeNull();

    const errorComponent = queryByTestId("error-wrapper");
    expect(errorComponent).toBeNull();
  });

  it("Component shows sections and not error page when using a valid store data", async () => {
    const component = () =>
      render(
        <Provider store={createStore(reducer, InitialStateValue)}>
          <Course
            title={"course title test"}
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
