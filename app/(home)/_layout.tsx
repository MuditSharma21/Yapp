import { useAuth } from "@/providers/AuthProvider";
import ChatProvider from "@/providers/ChatProvider";
import { Redirect, Stack } from "expo-router";

export default function HomeLayout () {
    const { user } = useAuth()
    
    if (!user) {
        return <Redirect href="/(auth)/login" />;
    }
    
    return (
        <ChatProvider>
            <Stack >
                <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
                <Stack.Screen name="users" options={{ headerTitle: 'Users', headerTitleStyle: { fontFamily: 'SpaceMono' } }}/>
                <Stack.Screen name="channel" options={{ headerTitle: '' }}/>
            </Stack>
        </ChatProvider>
    )
}