import { View, Text } from 'react-native';
import { useState } from 'react';
import Unit from './Unit';
import { chapter } from 'assets/java/chapter1';

export default function Chapter() {
  const [chapterIndex, setChapterIndex] = useState(-1);
  const getUnitButton = () => {
    return chapter.units.map((item, index) => (
      <View
        key={index}
        className="m-3 flex h-24 w-24 items-center justify-center rounded-full bg-orange-400 p-1">
        <Text
          key={index}
          className="text-bold font-mono text-4xl color-white"
          onPress={() => setChapterIndex(index)}>
          {index + 1}
        </Text>
      </View>
    ));
  };
  const backToUnitChoosing = () => {
    setChapterIndex(-1);
  };
  return (
    <>
      {chapterIndex === -1 ? (
        <View className="flex-1">
          <View className="h-40 w-full items-center justify-center">
            <Text className=" font-mono text-2xl">{chapter.title}</Text>
          </View>
          <View className="my-2 flex-1 items-center">{getUnitButton()}</View>
        </View>
      ) : (
        <Unit unit={chapter.units[chapterIndex]} back={backToUnitChoosing} />
      )}
    </>
  );
}
