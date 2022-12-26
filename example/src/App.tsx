import * as React from 'react';
import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  canUseRecaptcha,
  executeAction,
  initializeRecaptcha,
} from 'react-native-recaptcha-enterprise';
import { ConfigItem } from './ConfigurationItem';

export default function App() {
  const [siteKeyValue, setSiteKeyValue] = useState(
    Platform.select({
      android: '6Lcyo5ojAAAAAIj2liksaNOEFZBdUcDDt8u8FQ6C',
      ios: '6LdQ_5sjAAAAAMlHSiERnl10P-HTtYHoKLDXYlTC22',
      default: '',
    })
  );
  const [actionName, setActionName] = useState('login');
  const [token, setToken] = useState<string>('');
  const [isInit, setInit] = useState(false);
  const [canUse, setCanUse] = useState<boolean | null>(null);

  const [error, setError] = useState<any>();
  const [inProgress, setInProgress] = useState(false);

  const checkAvailability = useCallback(async () => {
    try {
      setInProgress(true);
      const canUseResult = await canUseRecaptcha();

      if (canUseResult.result) {
        setCanUse(true);
        return;
      }

      setCanUse(false);
      Alert.alert(
        'ReCaptcha Availability',
        'Google ReCaptcha can not be used. Reason: ' + canUseResult.reason
      );
    } catch (e: any) {
      setError(`${e?.message}[code: ${e?.code}]`);
    } finally {
      setInProgress(false);
    }
  }, []);

  const initializeCaptcha = useCallback(async () => {
    try {
      setInProgress(true);
      await initializeRecaptcha(siteKeyValue);
      setInit(true);
      setError('');
      setCanUse(true);
    } catch (e: any) {
      setError(`${e?.message}[code: ${e?.code}]`);
    } finally {
      setInProgress(false);
    }
  }, [siteKeyValue]);

  const onExecute = useCallback(async () => {
    try {
      setInProgress(true);
      const executeResult = await executeAction(actionName);
      setToken(executeResult);
      setError('');
      console.info('Token verify: ', executeResult);
    } catch (e: any) {
      setError(`${e?.message}[code: ${e?.code}]`);
      setToken('');
    } finally {
      setInProgress(false);
    }
  }, [actionName]);

  const onSiteKeyChanged = useCallback((value: string) => {
    setInit(false);
    setError(
      '!WARNING! You need to re-load app and change site key to initialize with new SiteKey!'
    );
    setToken('');
    setSiteKeyValue(value);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        stickyHeaderIndices={[0]}
        contentContainerStyle={styles.scrollView}
      >
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>
            Is initialized: {JSON.stringify(isInit)}
          </Text>
          <Text style={styles.availabilityText}>
            Availability: {JSON.stringify(canUse)}
          </Text>
          <Text style={styles.statusRequestText}>{`Execution status: ${
            isInit ? (inProgress ? 'In Progress' : 'Idle') : 'Not executed'
          }`}</Text>
          <Text style={styles.errorText}>
            {error ? `Error: ${error}` : ' '}
          </Text>
        </View>
        <View style={styles.container}>
          <Text>Put your action name and Site Key</Text>
          <ConfigItem
            containerStyles={styles.configItem}
            label={'Action Name'}
            value={actionName}
            onChangeText={setActionName}
          />
          <ConfigItem
            containerStyles={styles.configItem}
            label={'Site Key'}
            value={siteKeyValue}
            onChangeText={onSiteKeyChanged}
          />

          {inProgress ? (
            <ActivityIndicator color={'orange'} />
          ) : (
            <Text>{`Token:\n ${token}`}</Text>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <Button title={'Initialize'} onPress={initializeCaptcha} />
          <Button title={'Availability check'} onPress={checkAvailability} />
          <Button title={'Execute action'} onPress={onExecute} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flexGrow: 1,
  },
  statusContainer: {
    flex: 0,
    borderWidth: 1,
    borderStyle: 'dotted',
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: 8,
  },
  buttonContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 8,
  },
  configItem: {
    marginVertical: 5,
  },

  statusText: {
    fontSize: 20,
    textAlign: 'left',
    color: 'orange',
    marginBottom: 2,
  },
  availabilityText: {
    fontSize: 20,
    textAlign: 'left',
    color: 'black',
    marginBottom: 2,
  },

  statusRequestText: {
    fontSize: 20,
    textAlign: 'left',
    color: 'green',
    marginBottom: 2,
  },

  errorText: {
    fontSize: 20,
    textAlign: 'left',
    color: 'red',
    marginBottom: 2,
  },
});
