import { renderHook, act } from "@testing-library/react-native";
import useDirectionLogic from "@/app/hooks/useDirectionLogic";
import { LocationProvider } from "@/app/components/context/userLocationContext";
import { useLocation } from "@/app/components/context/userLocationContext";
import { Alert } from "react-native";

//First mock the dependencies the useDirectionLogic hook uses
//mock useLocation Context , setting the location To SGW Hall building
jest.mock("@/app/components/context/userLocationContext", () => ({
  useLocation: jest.fn(),
}));

//Track the calls to the references for start location and destination
const startLocationRef = { current: { setAddressText: jest.fn() } };
const destinationRef = { current: { setAddressText: jest.fn() } };

describe("useDirectionLogic hook", () => {
  //before each test
  beforeEach(() => {
    //Mock the value returned by useLocation
    useLocation.mockReturnValue({
      userLocation: {
        latitude: 45.49749523766439, // Hall building location
        longitude: -73.57898588896131,
      },
    });

    //reset the alert mock
    jest.clearAllMocks(); // Clear any calls to mocks
    jest.spyOn(Alert, "alert").mockImplementation(() => {}); // Mock Alert for each test
  });

  test("handleGoPress shows alert when startLocation or destination is null", () => {
    // Render the hook to use the function
    const { result } = renderHook(() => useDirectionLogic());

    //set the start location and destination to null
    act(() => {
      result.current.setStartLocation(null);
      result.current.setDestination(null);
    });

    // call the method and test for the alert
    act(() => {
      result.current.handleGoPress();
    });

    // Verify Alert was called
    expect(Alert.alert).toHaveBeenCalledWith(
      "Missing Information",
      "Please fill in both the Start Location and Destination.",
      [{ text: "OK", style: "default" }]
    );
  });

  test("handleGoPress shows alert when startLocation only is null", () => {
    // Render the hook to use the function
    const { result } = renderHook(() => useDirectionLogic());

    //set the start location and destination
    act(() => {
      result.current.setStartLocation(null);
      result.current.setDestination({
        latitude: -73.57907171854552,
        longitude: 45.49749147752672,
      });
    });

    // call the method and test for the alert
    act(() => {
      result.current.handleGoPress();
    });

    // Verify Alert was called
    expect(Alert.alert).toHaveBeenCalledWith(
      "Missing Information",
      "Please fill in both the Start Location and Destination.",
      [{ text: "OK", style: "default" }]
    );
  });

  test("handleGoPress shows alert when destination only is null", () => {
    // Render the hook to use the function
    const { result } = renderHook(() => useDirectionLogic());

    //set the start location and destination to null
    act(() => {
      result.current.setStartLocation({
        latitude: -73.57907171854552,
        longitude: 45.49749147752672,
      });
      result.current.setDestination(null);
    });

    // call the method and test for the alert
    act(() => {
      result.current.handleGoPress();
    });

    // Verify Alert was called
    expect(Alert.alert).toHaveBeenCalledWith(
      "Missing Information",
      "Please fill in both the Start Location and Destination.",
      [{ text: "OK", style: "default" }]
    );
  });

  test("handleGoPress does not show alert when destination and startLocation are both not null", () => {
    // Render the hook to use the function
    const { result } = renderHook(() => useDirectionLogic());

    //set the start location and destination to non-null values
    act(() => {
      result.current.setStartLocation({
        latitude: -73.57764257156214,
        longitude: 45.495280338359244,
      });
      result.current.setDestination({
        latitude: -73.57907171854552,
        longitude: 45.49749147752672,
      });
    });

    // call the method and test for the alert
    act(() => {
      result.current.handleGoPress();
    });

    // Verify Alert was not called
    expect(Alert.alert).not.toHaveBeenCalled();
  });
});
