import { TouchableOpacity, View, Text } from 'react-native';
import { Tips } from '../types/Question';
import { ArrowRight } from 'lucide-react-native';
import Title from '../components/Title';

export default function TipsView({ tips, onNext }: { tips: Tips; onNext: any }) {
  return (
    <View className="flex-1 justify-between p-6">
      <Title>{tips.title}</Title>
      <View className="flex">
        {tips.content.example.map((item, i) => (
          <View key={i} className="my-2">
            <View className="flex flex-row flex-wrap rounded bg-gray-200 p-2">
              {item.map((s, index) => {
                if (s.type === 'point') {
                  return (
                    <View
                      key={index}
                      className="mx-1 flex items-center justify-center rounded bg-red-300 p-1">
                      <Text key={index}>{s.word}</Text>
                    </View>
                  );
                }
                return (
                  <View key={index} className="mx-1 flex justify-center rounded">
                    <Text key={index}>{s.word}</Text>
                  </View>
                );
              })}
            </View>
            <Text key={i} className="mx-1">
              {tips.content.explanation[i]}
            </Text>
          </View>
        ))}
      </View>
      <View className="items-end">
        <TouchableOpacity className="rounded-md px-4 py-2" onPress={() => {}} activeOpacity={0.8}>
          <ArrowRight size={48} color="black" onPress={() => onNext()} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
