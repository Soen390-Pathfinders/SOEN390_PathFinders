// Floor data for the Floorplan component
export const floors = ["H1", "H4", "H5", "H6", "H8", "H9"];

// Fix path resolution by using the correct relative path from the data file
export const floorplanImages = {
  H1: require("../../assets/floorplans/H1.png"),
  H4: require("../../assets/floorplans/H4.jpg"),
  H5: require("../../assets/floorplans/H5.jpg"),
  H6: require("../../assets/floorplans/H6.jpg"),
  H8: require("../../assets/floorplans/H8.jpg"),
  H9: require("../../assets/floorplans/H9.jpg"),
};

// Default floor to show initially
export const defaultFloor = "H5"; 