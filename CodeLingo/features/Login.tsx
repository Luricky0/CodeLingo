import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { login, register } from 'api/account';
import { RootStackParamList } from 'App';
import { getDB } from 'database/db';
import { createUser, getAllProgressByUserId, syncProgress } from 'database/user';
import { useState } from 'react';
import { Pressable, TextInput, View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { uploadProgress } from 'api/progressApi';
import { error } from 'console';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;
type MessageType = {
  type: string;
  content: string;
};
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<MessageType | null>(null);

  const navigator = useNavigation<LoginScreenNavigationProp>();

  const onLogin = async () => {
    if (email !== '' && password !== '') {
      try {
        const res = await login(email, password);
        if (res) {
          const db = await getDB();
          await AsyncStorage.setItem('codelingo-token', res.token);
          await AsyncStorage.setItem('codelingo-user', res.userId);
          await createUser(db, res.userId, email, res.token);
          const ps = await getAllProgressByUserId(db, res.userId);
          const shouldUpdate = await uploadProgress(ps!);
          await syncProgress(db, shouldUpdate, res.userId);
          navigator.navigate('Chapter');
        }
      } catch (error) {
        if (error instanceof Error) sendMessage('error', error.message);
      }
    } else {
      sendMessage('error', 'Please enter valid email and password.');
    }
  };

  const onRegister = async () => {
    if (email !== '' && password !== '') {
      try {
        const token = await register(email, password);
        if (token) {
          console.log('register sucessfully');
        }
      } catch (error) {
        if (error instanceof Error) sendMessage('error', error.message);
      }
    } else {
      sendMessage('error', 'Please enter valid email and password.');
    }
  };

  const sendMessage = (type: string, content: string) => {
    const newMsg = { type, content };
    setMessage(newMsg);
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  const getMessageBox = () => {
    if (message != null) {
      const basicClass =
        'rounded-xl absolute top-40 left-5 right-5 p-4 items-center justify-center z-50';
      const viewClass =
        message.type === 'error'
          ? `${basicClass} bg-red-300 border-2 border-red-400`
          : `${basicClass} bg-green-300 border-2 border-green-400`;
      return (
        <View className={viewClass}>
          <Text>{message.content}</Text>
        </View>
      );
    }
  };

  return (
    <View className="flex-1 items-center justify-center px-10">
      {getMessageBox()}
      <Text className="font-mono text-3xl">CodeLingo</Text>
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
