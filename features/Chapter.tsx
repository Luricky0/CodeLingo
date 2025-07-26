import { View, Text } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'App';
import { useEffect, useState } from 'react';
import { ChapterType } from '../types/Chapter';
import { getChapter } from 'database/chapter';
import { getDB } from 'database/db';
import { getUnitProgress, UnitProgressType } from 'database/user';

export default function Chapter() {
  type ChapterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Chapter'>;
  const navigation = useNavigation<ChapterScreenNavigationProp>();
  const [chapter, setChapter] = useState<ChapterType>();
  const [progressMap, setProgressMap] = useState<Record<string, UnitProgressType>>({});
  const isFocused = useIsFocused();
  async function start() {
    const db = await getDB();
    const res = await getChapter(db, 'java', 1);
    const progress = await getUnitProgress(db, 'java', '1');

    if (res) setChapter(res);
    const map: Record<string, UnitProgressType> = {};
    if (progress) {
      for (const p of progress) {
        map[p.unit_id] = p;
      }
      setProgressMap(map);
    }
  }
  useEffect(() => {
    if (isFocused) start();
  }, [isFocused]);

  const getUnitButton = () => {
    if (!chapter) return null;

    return chapter.units.map((item, index) => {
      const unitProgress = progressMap[item.id];
      const isUnlocked = unitProgress?.is_unlocked;

      const baseStyle = 'm-3 flex h-24 w-24 items-center justify-center rounded-full p-1';
      const bgColor = isUnlocked ? 'bg-blue-400' : 'bg-gray-400';
      const textColor = isUnlocked ? 'text-white' : 'text-gray-300';

      return (
        <View key={item.id} className={`${baseStyle} ${bgColor}`}>
          <Text
            className={`text-bold font-mono text-4xl ${textColor}`}
            onPress={() => {
              if (isUnlocked) {
                navigation.navigate('Unit', { unit: item });
              }
            }}>
            {index + 1}
          </Text>
        </View>
      );
    });
  };

  return (
    <>
      <View className="flex-1 bg-blue-50">
        <View className="h-40 w-full items-center justify-center">
          <Text className=" font-mono text-2xl">{chapter?.title}</Text>
        </View>
        <View className="my-2 flex-1 items-center">{getUnitButton()}</View>
      </View>
    </>
  );
}
