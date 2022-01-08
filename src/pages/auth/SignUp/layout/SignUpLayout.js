import React, { useState } from 'react';
import { Alert, SafeAreaView, Text } from 'react-native';

import Button from '../../../../components/Button';
import Input from '../../../../components/Input';

import styles from './SignUpLayout.styles';

export default function SignIn({ onSignUp, onGoBack }) {
  const [signData, setSignData] = useState({
    email: '',
    userName: '',
    userSurname: '',
    password: '',
    repassword: '',
  });

  function handleSignUp() {
    if (signData.password !== signData.repassword) {
      Alert.alert('RUN', 'Passwords are not matched');
      return;
    }

    onSignUp(signData);
  }

  return (
    <SafeAreaView>
      <Input
        label="Email"
        autoCapitalize="none"
        onChangeText={email => setSignData({ ...signData, email })}
      />
      <Input
        label="Name"       
        onChangeText={userName => setSignData({ ...signData, userName })}
      />
      <Input
        label="Surname"
        onChangeText={userSurname => setSignData({ ...signData, userSurname })}
      />
      <Input
        label="Password"
        autoCapitalize="none"
        secureTextEntry
        onChangeText={password => setSignData({ ...signData, password })}
      />
      <Input
        label="Password Again"
        autoCapitalize="none"
        secureTextEntry
        onChangeText={repassword => setSignData({ ...signData, repassword })}
      />
      <Button label="Sign Up" onPress={handleSignUp} />
      <Button label="Back" theme="outline" onPress={onGoBack} />
    </SafeAreaView>
  );
}