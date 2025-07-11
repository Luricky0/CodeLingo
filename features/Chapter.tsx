import { View, Text } from 'react-native';
import { useState } from 'react';
import Unit from './Unit';
import { chapter } from 'assets/java/chapter1';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'App';

export default function Chapter() {
  type ChapterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Chapter'>;
  const navigation = useNavigation<ChapterScreenNavigationProp>();
  const getUnitButton = () => {
    return chapter.units.map((item, index) => (
      <View
        key={index}
        className="m-3 flex h-24 w-24 items-center justify-center rounded-full bg-blue-400 p-1">
        <Text
          key={index}
          className="text-bold font-mono text-4xl color-white"
          onPress={() => {
            navigation.navigate('Unit', { unit: chapter.units[index] });
          }}>
          {index + 1}
        </Text>
      </View>
    ));
  };
  return (
    <>
      <View className="flex-1 bg-blue-50">
        <View className="h-40 w-full items-center justify-center">
          <Text className=" font-mono text-2xl">{chapter.title}</Text>
        </View>
        <View className="my-2 flex-1 items-center">{getUnitButton()}</View>
      </View>
    </>
  );
}
