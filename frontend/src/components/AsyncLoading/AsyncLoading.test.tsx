import AsyncLoading from "./AsyncLoading";
import { render } from "@testing-library/react";

describe("Main AsyncLoading component works as expected", () => {
  it("Component renders without crashing", () => {
    const component = () =>
      render(
        <AsyncLoading
          children={<div data-testid="child-component">Sample Child</div>}
          isLoading={false}
          hasError={false}
        />
      );
    expect(component).toBeDefined();
    const { queryAllByTestId } = component();
    const childComponent = queryAllByTestId("child-component");
    expect(childComponent.length).toBe(1);
  });

  it("Error component is not showed when no error happened", async () => {
    const component = () =>
      render(
        <AsyncLoading
          children={<div data-testid="child-component">Sample Child</div>}
          isLoading={true}
          hasError={false}
        />
      );
    expect(component).toBeDefined();
    const { queryAllByTestId } = component();
    const loadingSpinner = queryAllByTestId("loading-spinner");
    expect(loadingSpinner.length).toBe(1);
  });
});
