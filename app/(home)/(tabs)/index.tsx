import { ThemedView } from "@/components/ThemedView";
import { useAuth } from "@/providers/AuthProvider";
import { FontAwesome5 } from "@expo/vector-icons";
import { Link, Redirect, router, Stack } from "expo-router";
import { ScrollView } from "react-native";
import { ChannelList } from "stream-chat-expo";

export default function MainTabScreen() {    
    const { profile } = useAuth()
    
    return (
        <>
        <Stack.Screen options={{ headerRight: () => (
            <Link href={'/(home)/users'} asChild>
                <FontAwesome5 name='users' size={24} color='gray' style={{ marginHorizontal: 15 }} />
            </Link>
        ) }}/>
                <ChannelList 
                    onSelect={(channel) => router.push(`/channel/${channel.cid}`)}
                    filters={{ members: {$in: [profile.id]} }}
                    additionalFlatListProps={{
                        style: {borderRadius: 20}
                    }}
                />
        </>
    )
}