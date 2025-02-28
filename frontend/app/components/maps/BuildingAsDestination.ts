import { Alert } from "react-native";






const buildingAsDestination = (onSuccess) =>


  Alert.alert(


    "BuildingAsDestination",


    "Would you like to set this building as your destination?",


    [


      {


        text: "No",


        onPress: () => Alert.alert("Cancel Pressed"),


        style: "cancel",


      },


      {


        text: "Yes",


        onPress: () => {


          onSuccess(true); // Call the callback with `true`


        },


      },


    ],


    {


      cancelable: true,


      onDismiss: () =>


        Alert.alert(


          "This alert was dismissed by tapping outside of the alert dialog."


        ),


    }


  );





export default buildingAsDestination;


