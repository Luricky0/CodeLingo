import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { login, register } from 'api/account';
import { RootStackParamList } from 'App';
import { getDB } from 'database/db';
import { createUser } from 'database/user';
import { useState } from 'react';
import { Pressable, TextInput, View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigator = useNavigation<LoginScreenNavigationProp>();

  const onLogin = async () => {
    if (email !== '' && password !== 'null') {
      const res = await login(email, password);
      if (res) {
        const db = await getDB();
        await AsyncStorage.setItem('codelingo-token', res.token);
        await AsyncStorage.setItem('codelingo-user', res.userId);
        await createUser(db, res.userId, email, res.token);
        navigator.navigate('Chapter');
      }
    }
  };

  const onRegister = async () => {
    if (email !== '' && password !== 'null') {
      const token = await register(email, password);
      if (token) {
        console.log('register sucessfully');
      }
    }
  };

  return (
    <View className="flex-1 items-center justify-center px-10">
      <TextInput
        placeholder="email"
        className="m-2 w-full rounded-xl border-2 px-2 py-2"
        autoCorrect={false}
        value={email}
        onChangeText={(text) => setEmail(text)}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="password"
        className="m-2 w-full rounded-xl border-2 px-2 py-2"
        value={password}
        onChangeText={(text) => setPassword(text)}
        autoCorrect={false}
        autoCapitalize="none"
      />
      <Pressable
        className="m-2 items-center justify-center rounded-xl bg-blue-400 px-10 py-2"
        onPress={() => onLogin()}>
        <Text>Login</Text>
      </Pressable>
      <Pressable
        className="m-2 items-center justify-center rounded-xl bg-gray-400 px-8 py-2"
        onPress={() => onRegister()}>
        <Text>Register</Text>
      </Pressable>
    </View>
  );
};
export default Login;
