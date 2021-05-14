import ListItem from "./ListItem";
import {
  render
} from "@testing-library/react";

describe("Main ListItem component works as expected", () => {
  const itemData = {
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

  const { degree, description, startDate, endDate, place } = itemData;

  it("Component renders without crashing", () => {
    const component = () =>
      render(
        <ListItem
          imageValue={place.image}
          imageName={place.name}
          title={`${degree} (${description}) `}
          subtitle={"Actualidad"}
          description={place.name}
          loading={false}
        />
      );
    expect(component).toBeDefined();
    const { queryAllByTestId, getByTestId } = component();
    const childComponent = queryAllByTestId("education-container-item");
    expect(childComponent.length).toBe(1);
  });

  it("Error component is not showed when no error happened", async () => {
    const component = () =>
      render(
        <ListItem
          imageValue={place.image}
          imageName={place.name}
          title={`${degree} (${description}) `}
          subtitle={"Actualidad"}
          description={place.name}
          loading={true}
        />
      );
    expect(component).toBeDefined();
    const { getByTestId } = component();
    const InfoWrapper = getByTestId("info-wrapper");
    expect(InfoWrapper.innerHTML).toBe(
      '<div class="sc-bdvvaa hVHhOa">'
      +'<p class="sc-eCImvq sc-jRQAMF eRRset Lohxw">Ingeniero en sistemas de información (Finalizado) </p></div>'
      +'<div class="sc-bdvvaa hVHhOa"><p class="sc-eCImvq eRRset">Actualidad</p></div><div class="sc-bdvvaa hVHhOa">'
      +'<p class="sc-eCImvq eRRset">Universidad Tecnologica Nacional - FRLP</p></div>'
    );
  });
});
