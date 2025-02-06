import React from "react";
import renderer from "react-test-renderer";
import outdoorMap from "../app/components/maps/outdoorMap.tsx";
import OutdoorNav from "@/app/OutdoorNav/OutdoorNavigation";

test("renders correctly", () => {
  const tree = renderer.create(<OutdoorNav />).toJSON();
  expect(tree).toMatchSnapshot();
});
