import LanguageSelector from "./LanguageSelector";
import { render, fireEvent } from "@testing-library/react";

jest.mock("react-i18next", () => ({
  // this mock makes sure any components using the translate HoC receive the t function as a prop
  withTranslation: () => (Component: any) => {
    Component.defaultProps = {
      ...Component.defaultProps,
      t: () => "",
      i18n: {
        changeLanguage: () => new Promise(() => {}),
        language: "es-ES",
      },
    };
    return Component;
  },
}));

describe("Main LanguageSelector component works as expected", () => {
  it("Component renders without crashing", () => {
    const component = () => render(<LanguageSelector />);
    expect(component).toBeDefined();
    const { queryByTestId } = component();
    const langSelectorComponent = queryByTestId("language-selector-wrapper");
    expect(langSelectorComponent).not.toBeNull();
    expect(langSelectorComponent?.innerHTML).toBe(
      '<span style="font-weight: 700;" class="sc-dkPtyc jSqCEm">ES</span>' +
        '<span data-testid="en-selector" style="font-weight: 100;" class="sc-dkPtyc jSqCEm">EN</span>'
    );

    const enSelector = queryByTestId("en-selector");
    expect(enSelector).not.toBeNull();
    if (enSelector) fireEvent.click(enSelector);
  });
});
