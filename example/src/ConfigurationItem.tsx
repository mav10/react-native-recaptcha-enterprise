import * as React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';

type ConfigurationItemProps = {
  label: string;
  containerStyles?: StyleProp<ViewStyle>;
} & TextInputProps;

export const ConfigItem: React.FC<ConfigurationItemProps> = (
  props: ConfigurationItemProps
) => {
  const { label, containerStyles, ...rest } = props;

  return (
    <View style={[styles.container, containerStyles]}>
      <Text style={styles.label}>{label}:</Text>
      <TextInput
        {...rest}
        multiline={true}
        style={[styles.textInput, rest.style]}
        blurOnSubmit={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
  },
  label: {
    fontSize: 20,
    textTransform: 'uppercase',
    color: 'LightGray',
  },
  textInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'Blue',
    borderRadius: 10,
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    backgroundColor: '#fefefe',
    paddingHorizontal: 8,
  },
});
