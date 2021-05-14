import Personal from "./Personal";
import { render, cleanup, waitFor, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../redux/store";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { initialState as InitialStateValue } from "../../redux/initialState";
import configureStore from "redux-mock-store"; 
import { setCourseData } from "../../redux/actions/actions";
import actionTypes from "../../redux/actionsTypes/StoreTypes";

jest.mock("react-i18next", () => ({
  // this mock makes sure any components using the translate HoC receive the t function as a prop
  withTranslation: () => (Component: any) => {
    Component.defaultProps = { ...Component.defaultProps, t: () => "" };
    return Component;
  },
}));

const middlewares: any = [];
const mockStore = configureStore(middlewares);

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

describe("Main Personal component works as expected", () => {
  it("Component renders without crashing", () => {
    const component = () =>
      render(
        <Personal
          title={"personal title test"}
          variant={"#94d4d0"}
          icon={faUser}
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
      <Personal
        title={"personal title test"}
        variant={"#94d4d0"}
        icon={faUser}
      />,
      { initialState: {
        ...InitialStateValue,
        personData: {
          prefix: '',
          description: '',
          name: '',
          lastname: '',
          age: 12,
          civilStatus: '',
          locationName: '',
          locationValue: '',
          profilePhoto: '',
          experience: {},
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
      } }
    );

    

    await waitFor(() => component().container);
    const { queryByTestId, getAllByRole, queryAllByTestId } = component()
    expect(component).not.toBeNull();

    const hocWrapper = screen.queryAllByTestId("hoc-wrapper")[0];
    expect(hocWrapper).not.toBeNull();
    
    fireEvent.click(hocWrapper)

    const errorComponent = queryByTestId("error-wrapper");
    expect(errorComponent).toBeNull();
    const personalData = queryAllByTestId("personal-data-container");
    expect(personalData.length).toBeGreaterThan(0);
    const personalDataValue = queryAllByTestId("personal-data-value");
    expect(personalDataValue.length).toBe(4);

  });
})