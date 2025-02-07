import React from "react";
import renderer from "react-test-renderer";
import CampusMap from "@/app/screens/OutdoorNav/CampusMap";

test("Campus Map renders correctly", () => {
  const tree = renderer.create(<CampusMap />).toJSON();
  expect(tree).toMatchSnapshot();
});
