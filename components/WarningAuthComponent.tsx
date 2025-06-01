import { View, Text, Animated } from 'react-native';
import { CloudCog, CloudLightning, Cross, Info, Plus } from 'lucide-react-native';

const WarningAuthComponent = () => {
  
  return (
    <Animated.View className="mx-auto m-3 w-[89%]  flex-row items-center justify-between gap-2 rounded-md border border-gray-700 p-4" 
    >
      <View className="flex-row items-center gap-3">
        <View className="h-[15px] w-[15px] flex-row items-center justify-center rounded-full border border-red-500">
          <Plus
            size={10}
            color="red"
            strokeWidth={1.5}
            style={{ transform: [{ rotate: '45deg' }] }}
          />
        </View>
        <Text className="text-md text-gray-300">Authentification requise</Text>
      </View>
      <View className='flex-row items-center gap-2'>
        <View className='flex-row'>
          <View className='w-[30px] h-[30px] bg-white rounded-full flex-row items-center justify-center -mr-[10px]'>
            <CloudCog size={10} color="red" strokeWidth={1.5} />
          </View>
          <View className='w-[30px] h-[30px] bg-white rounded-full flex-row items-center justify-center -mr-[10px]'>
            <CloudLightning size={10} color="red" strokeWidth={1.5} />
          </View>
          <View className='w-[30px] h-[30px] bg-zinc-800 rounded-full flex-row items-center justify-center -mr-[10px]'>
            <Text className='text-white text-sm'>+1</Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

export default WarningAuthComponent;
