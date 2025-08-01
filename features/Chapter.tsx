import { View, Text, Pressable } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'App';
import { JSX, useEffect, useState } from 'react';
import { ChapterType } from '../types/Chapter';
import { getChapter } from 'database/chapter';
import { getDB } from 'database/db';
import { getChapterProgress, getUnitProgress, UnitProgressType } from 'database/user';
import { Book, Library, BookOpenCheck } from 'lucide-react-native';

export default function Chapter() {
  type ChapterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Chapter'>;
  const navigation = useNavigation<ChapterScreenNavigationProp>();
  const [chapter, setChapter] = useState<ChapterType>();
  const [progressMap, setProgressMap] = useState<Record<string, UnitProgressType>>({});
  const [isShowChapterSelectionMenu, setIsShowChapterSelectionMenu] = useState(false);
  const [chapterSelectionView, setChapterSelectionView] = useState<JSX.Element[] | null>(null);
  const isFocused = useIsFocused();
  const [themeColor, setThemeColor] = useState('');

  const setThemeColorByChapterNo = (no: number) => {
    const n = no % 6;
    switch (n) {
      case 0:
        setThemeColor('bg-red');
        break;
      case 1:
        setThemeColor('bg-blue');
        break;
      case 2:
        setThemeColor('bg-green');
        break;
      case 3:
        setThemeColor('bg-yellow');
        break;
      case 4:
        setThemeColor('bg-orange');
        break;
      case 5:
        setThemeColor('bg-purple');
        break;
    }
  };

  async function start() {
    setThemeColorByChapterNo(1);
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

  useEffect(() => {
    getChapterButton();
  }, [isShowChapterSelectionMenu]);

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
            className={`text-bold font-menlo text-4xl ${textColor}`}
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

  const getChapterButton = async () => {
    const db = await getDB();
    const chapterProgress = await getChapterProgress(db, 'java', 1);
    console.log(chapterProgress);
    const views = chapterProgress.map((p, index) => {
      const isUnlocked = p.is_unlocked;

      const baseStyle = 'm-3 flex h-8 w-8 items-center justify-center rounded-full p-1';
      const bgColor = isUnlocked ? `${themeColor}-400` : 'bg-gray-400';
      const textColor = isUnlocked ? 'text-white' : 'text-gray-300';
      return (
        <View key={p.unit_id} className={`${baseStyle} ${bgColor}`}>
          <Text className={`text-bold text-l font-menlo ${textColor}`}>{index + 1}</Text>
        </View>
      );
    });
    setChapterSelectionView(views);
  };

  return (
    <>
      <View className={`flex-1 flex-row  ${themeColor}-50`}>
        {isShowChapterSelectionMenu && (
          <View className="flex-1 items-center justify-center px-2 py-20">
            <View className="h-full rounded-xl bg-white">
              <View className="h-8 items-center justify-center">
                <Text>Java</Text>
              </View>
              {chapterSelectionView}
            </View>
          </View>
        )}

        <View className={`${isShowChapterSelectionMenu ? 'flex-4' : 'flex-1'}`}>
          <View className={` h-36 flex-col-reverse items-center`}>
            <View className={`w-96 flex-row justify-between rounded-2xl ${themeColor}-200 p-2`}>
              <View>
                <Text className=" text-l font-menlo">
                  {chapter?.lang.toLocaleUpperCase()} Chapter {chapter?.no}
                </Text>
                <Text className=" font-menlo text-2xl">{chapter?.title}</Text>
              </View>
              <Pressable
                className="mx-1 items-center justify-center p-1"
                onPress={() => setIsShowChapterSelectionMenu(!isShowChapterSelectionMenu)}>
                <Book size={38} className="white" />
              </Pressable>
            </View>
          </View>

          <View className="my-2 flex-1 items-center">{getUnitButton()}</View>
        </View>
      </View>
    </>
  );
}
