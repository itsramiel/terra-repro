import * as Terra from 'terra-react';
import {useEffect} from 'react';
import {Button, View} from 'react-native';

const DEV_ID = '';
const API_KEY = '';

const REF_ID = 'dnejfekfne';

const FROM_DATE = new Date();
FROM_DATE.setDate(FROM_DATE.getDate() - 1);
const TO_DATE = new Date();

function App() {
  useEffect(() => {
    Terra.initTerra(DEV_ID, REF_ID).then(async args => {
      console.log(args);
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
      Terra.initConnection(Terra.Connections.APPLE_HEALTH, token, true);
    });
  }, []);

  const getBodyData = () => {
    Terra.getBody(Terra.Connections.APPLE_HEALTH, FROM_DATE, TO_DATE, false)
      .then(result => {
        console.log(result);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const getMestruationData = () => {
    Terra.getMenstruation(
      Terra.Connections.APPLE_HEALTH,
      FROM_DATE,
      TO_DATE,
      false,
    )
      .then(result => {
        console.log(result);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const getSleepData = () => {
    Terra.getSleep(Terra.Connections.APPLE_HEALTH, FROM_DATE, TO_DATE, false)
      .then(result => {
        console.log(result);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button title="get body data" onPress={getBodyData} />
      <Button title="get mestruation data" onPress={getMestruationData} />
      <Button title="get sleep data" onPress={getSleepData} />
    </View>
  );
}
export default App;
