import * as Terra from 'terra-react';
import {Alert, Button, View} from 'react-native';
import Config from 'react-native-config';

const DEV_ID = Config.DEV_ID;
const API_KEY = Config.API_KEY;

const REF_ID = 'dnejfekfnecneo';

function App() {
  const initTerra = () => {
    Terra.initTerra(DEV_ID, REF_ID).then(() =>
      Alert.alert('Terra initialized'),
    );
  };

  const initApple = async () => {
    const res = await fetch(
      'https://api.tryterra.co/v2/auth/generateAuthToken',
      {
        method: 'POST',
        headers: {
          'dev-id': DEV_ID,
          'x-api-key': API_KEY,
        },
      },
    );
    const token = (await res.json()).token;
    const {success} = await Terra.initConnection(
      Terra.Connections.APPLE_HEALTH,
      token,
      true,
    );
    Alert.alert(`Apple health initialized with success value: ${success}`);
  };

  const checkAppleLocal = async () => {
    const {userId} = await Terra.getUserId(Terra.Connections.APPLE_HEALTH);
    Alert.alert(`User has apple health connection of userId: ${userId}`);
  };
  const checkAppleRemote = async () => {
    const {userId} = await Terra.getUserId(Terra.Connections.APPLE_HEALTH);
    var myHeaders = new Headers();
    myHeaders.append('dev-id', DEV_ID);
    myHeaders.append('X-API-Key', API_KEY);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };

    const response = await (
      await fetch(
        `https://api.tryterra.co/v2/userInfo?user_id=${userId}`,
        requestOptions,
      )
    ).json();

    Alert.alert(
      `Remote checking of apple health for userId ${userId} ise ${JSON.stringify(
        response,
      )}`,
    );
  };

  const deauthorizeAppleHealth = async () => {
    const {userId} = await Terra.getUserId(Terra.Connections.APPLE_HEALTH);
    if (userId === null) {
      Alert.alert('Cant deauthorize since userId is null');
      return;
    }
    var myHeaders = new Headers();
    myHeaders.append('dev-id', DEV_ID);
    myHeaders.append('X-API-Key', API_KEY);

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
    };

    const response = await (
      await fetch(
        `https://api.tryterra.co/v2/auth/deauthenticateUser?user_id=${userId}`,
        requestOptions,
      )
    ).json();

    Alert.alert(
      `deauthorization response of Apple Health: ${JSON.stringify(response)}`,
    );
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button title="init terra" onPress={initTerra} />
      <Button title="init apple health" onPress={initApple} />
      <Button
        title="check apple health connection locally"
        onPress={checkAppleLocal}
      />
      <Button
        title="check apple health connection from api"
        onPress={checkAppleRemote}
      />
      <Button
        title="deauthorize apple health"
        onPress={deauthorizeAppleHealth}
      />
    </View>
  );
}
export default App;
