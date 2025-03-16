//This hook takes in the code as a string and returns a boolean isValid and an errorMessage if the code is not valid

const useRoomCodeValidation = () => {

       const validateRoomCode = (code) => {
      // Regex for "SOMELETTERS-SOMEDIGITS" format
      const regex = /^[A-Za-z]+-\d+$/;
      
      // Checks if the code matches the format
      const isValid = regex.test(code);
      
      // Return an object with the validation status(true/false) and the error message if there is one
      return {
        isValid,
        errorMessage: isValid ? '' : 'Invalid room code. Please enter a code in the format LETTERS-DIGITS (H-521).'
      };
    };
    
    // Return the function to validate
    return { validateRoomCode };
  };
  
  export default useRoomCodeValidation;
