
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Text, Button } from "react-native";
import { LocationProvider, useLocation } from "../app/components/context/userLocationContext";


const TestComponent: React.FC = () => {
  const { userLocation, updateUserLocation } = useLocation();
  return (
    <>
      <Text testID="locationText">
        {`${userLocation.latitude}, ${userLocation.longitude}`}
      </Text>
      <Button
        testID="updateButton"
        title="Update Location"
        onPress={() => updateUserLocation(10, 20)}
      />
    </>
  );
};


describe("LocationContext", () => {
  it("provides the initial location to its children", () => {

    const { getByTestId } = render(
      <LocationProvider>
        <TestComponent />
      </LocationProvider>
    );

    expect(getByTestId("locationText").props.children).toEqual(
      "-73.57907171854552, 45.49749147752672"
    );
  });

  it("updates the location when updateUserLocation is called", () => {
    const { getByTestId } = render(
      <LocationProvider>
        <TestComponent />
      </LocationProvider>
    );


    fireEvent.press(getByTestId("updateButton"));
    expect(getByTestId("locationText").props.children).toEqual("10, 20");
  });

  it("throws an error when useLocation is used outside a LocationProvider", () => {

    const ComponentUsingHook: React.FC = () => {

      useLocation();
      return <Text>Should not render</Text>;
    };

    expect(() => render(<ComponentUsingHook />)).toThrow(
      "useLocation must be used within a LocationProvider"
    );
  });
});
