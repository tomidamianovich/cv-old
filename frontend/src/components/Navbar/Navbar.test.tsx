import Navbar from "./Navbar";
import {
  render,
  waitFor
} from "@testing-library/react";
import { Provider } from "react-redux";
import { initialState as InitialStateValue } from "../../redux/initialState";
import { createStore } from "redux";
import configureStore from "redux-mock-store"; 
import reducer from "../../redux/reducers/reducers";
import { setPersonalData } from "../../redux/actions/actions";
import actionTypes from "../../redux/actionsTypes/StoreTypes";

const middlewares: any = [];
const mockStore = configureStore(middlewares);

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

describe("Main Navbar component works as expected", () => {
  it("Component should dispatch action", () => {
    // Initialize mockstore with empty state
    const store = mockStore(InitialStateValue);

    const actionPayload = {
      prefix: "",
      description: "",
      name: "",
      lastname: "",
      age: 0,
      civilStatus: "",
      locationName: "",
      locationValue: "",
      profilePhoto: "",
      experience: {
        title: "",
        place: "",
      },
      social: {
        _id: "",
        instagram: "",
        facebook: "",
        telephone: "",
        mail: "",
        linkedIn: "",
        person_id: "",
      },
    };

    // Dispatch the action
    store.dispatch(setPersonalData(actionPayload));

    // Test if your store dispatched the expected actions
    const actions = store.getActions();
    const expectedPayload = {
      type: actionTypes.SET_PERSONAL_DATA,
      payload: actionPayload,
    };
    expect(actions).toEqual([expectedPayload]);
  });

  it("Component renders without crashing", async () => {

    const actionPayload = {
      prefix: "ing",
      description: "description title",
      name: "tomas",
      lastname: "damianovich reddy",
      age: 26,
      civilStatus: "soltero",
      locationName: "la plata",
      locationValue: "la plata",
      profilePhoto: "test profile photo",
      experience: {
        title: "sr frontend developer",
        place: "mercadolibre",
      },
      social: {
        _id: "asdsa",
        instagram: "adsasd",
        facebook: "asdd",
        telephone: "ads",
        mail: "asd",
        linkedIn: "asd",
        person_id: "das",
      },
    };

    const component = () =>
      renderWithRedux(<Navbar />, {
        initialState: {
          ...InitialStateValue,
          personData: actionPayload
        }
    });
    await waitFor(() => component().container);
    expect(component).toBeDefined();
    const { queryAllByTestId, getByTestId } = component();
    const navbarContainer = queryAllByTestId("navbar-container");
    expect(navbarContainer).not.toBeNull();

    const educationImageContainer = navbarContainer[0]?.querySelector("div img");
    expect(educationImageContainer?.getAttribute("src")).toBe(
      "/images/profile-picture.jpeg"
    );

    const InfoWrapper = queryAllByTestId("info-wrapper")[0];
    expect(InfoWrapper.innerHTML).toBe(
      '<div class="sc-bdvvaa jzeCmk">'+
      '<h1 class="sc-furvIG biWwts">ing damianovich reddy tomas</h1>'+
      '</div><div class="sc-bdvvaa jzeCmk">'+
      '<h3 class="sc-pVTma cZrJkt">sr frontend developer - mercadolibre</h3>'+
      '</div><div class="sc-bdvvaa jzeCmk"><h4 class="sc-jrQzUz ijMlfX">description title</h4></div>'
    )
    
  });
});
