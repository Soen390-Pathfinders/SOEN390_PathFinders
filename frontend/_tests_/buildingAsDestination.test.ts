import { Alert } from 'react-native';
import buildingAsDestination from '../app/components/maps/BuildingAsDestination';

jest.spyOn(Alert, 'alert'); // Mock native Alert

describe('buildingAsDestination', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows the correct alert with expected title and message', () => {
    const onSuccess = jest.fn();
    buildingAsDestination(onSuccess);

    expect(Alert.alert).toHaveBeenCalledWith(
      'BuildingAsDestination',
      'Would you like to set this building as your destination?',
      expect.any(Array),
      expect.objectContaining({
        cancelable: true,
        onDismiss: expect.any(Function),
      })
    );
  });

  it('calls onSuccess(true) when Yes is pressed', () => {
    const onSuccess = jest.fn();
    buildingAsDestination(onSuccess);

    const buttons = (Alert.alert as jest.Mock).mock.calls[0][2];
    const yesButton = buttons?.find((btn) => btn.text === 'Yes');

    yesButton?.onPress();
    expect(onSuccess).toHaveBeenCalledWith(true);
  });

  it('triggers cancel alert when No is pressed', () => {
    const onSuccess = jest.fn();
    buildingAsDestination(onSuccess);

    const buttons = (Alert.alert as jest.Mock).mock.calls[0][2];
    const noButton = buttons?.find((btn) => btn.text === 'No');

    noButton?.onPress();
    expect(Alert.alert).toHaveBeenCalledWith('Cancel Pressed');
  });

  it('triggers dismiss alert when alert is dismissed', () => {
    const onSuccess = jest.fn();
    buildingAsDestination(onSuccess);

    const options = (Alert.alert as jest.Mock).mock.calls[0][3];
    options?.onDismiss();

    expect(Alert.alert).toHaveBeenCalledWith(
      'This alert was dismissed by tapping outside of the alert dialog.'
    );
  });
});
