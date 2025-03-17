import { useAuth } from "@/providers/AuthProvider";
import ChatProvider from "@/providers/ChatProvider";
import { Redirect, Stack } from "expo-router";
import { Chat, OverlayProvider } from "stream-chat-expo";

export default function HomeLayout () {
    const { user } = useAuth()
    
    if (!user) {
        return <Redirect href="/(auth)/login" />;
    }
    
    return (
        <ChatProvider>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
            </Stack>
        </ChatProvider>
    )
}