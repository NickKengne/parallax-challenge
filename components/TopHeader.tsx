import { View, Text, TouchableOpacity } from 'react-native'
import { EyeIcon, UserRound } from 'lucide-react-native'
import { LinearGradient } from 'expo-linear-gradient'

export default function TopHeader() {
  return (
    <View className="flex-row justify-between items-center p-4">
        <View className='w-[40px] h-[40px] bg-zinc-900 rounded-full items-center justify-center'>
            <UserRound size={18} color="white" strokeWidth={1.5}/>
        </View>
        <View className='flex-row items-center gap-[18px]'>
            <EyeIcon size={18} color="white" strokeWidth={1.5}/>
            <TouchableOpacity className='rounded-full overflow-hidden'>
                <LinearGradient
                    colors={['#7F5AF0', '#23235B','#FFDC52']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ paddingHorizontal: 20, paddingVertical: 12, borderRadius: 999, alignItems: 'center', justifyContent: 'center' }}
                >
                    <Text className='text-white text-sm font-bold'>METTRE A JOUR</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    </View>
  )
}