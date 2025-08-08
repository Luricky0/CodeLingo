import { View, Text } from 'react-native';

export default function Title({ children }: any) {
  return (
    <View className="items-center justify-center rounded bg-yellow-300 p-2">
      <Text className="text-l font-menlo">{children}</Text>
    </View>
  );
}
