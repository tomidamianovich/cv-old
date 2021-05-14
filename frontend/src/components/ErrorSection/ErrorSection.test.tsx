import ErrorSection from "./ErrorSection";
import { render } from "@testing-library/react";

jest.mock("react-i18next", () => ({
  // this mock makes sure any components using the translate HoC receive the t function as a prop
  withTranslation: () => (Component: any) => {
    Component.defaultProps = {
      ...Component.defaultProps,
      t: () => "Un error ocurrio al intentar obtener esta información.",
    };
    return Component;
  },
}));

describe("Main ErrorSection component works as expected", () => {
  it("Component renders without crashing", () => {
    const component = () => render(<ErrorSection />);
    expect(component).toBeDefined();
    const { queryByTestId } = component();
    const errorComponent = queryByTestId("error-wrapper");
    expect(errorComponent).not.toBeNull();
    expect(errorComponent?.textContent).toBe(
      "Un error ocurrio al intentar obtener esta información."
    );
  });
});
