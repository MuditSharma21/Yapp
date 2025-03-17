import { PropsWithChildren, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { StreamChat } from 'stream-chat'
import { Chat, OverlayProvider } from "stream-chat-expo";
import { useAuth } from "./AuthProvider";
import { supabase } from "@/lib/supabase";
import { tokenProvider } from "@/utils/tokenProvider";

const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY as string);

export default function ChatProvider({ children }: PropsWithChildren) {
    const [isReady, setIsReady] = useState(false)
    const { profile } = useAuth()

    useEffect(() => {
        if (!profile) {
            return
        }
        const connect = async () => {   
            await client.connectUser(
                {
                  id: profile.id,
                  name: profile.full_name,
                  image: supabase.storage.from('avatars').getPublicUrl(profile.avatar_url).data.publicUrl,
                },
                tokenProvider
            );

            setIsReady(true)
            
            // const channel = client.channel("messaging", "the_park", {
            //     name: "The Park",
            // });
            // await channel.watch()
        }
        connect()

        //Cleanup function
        return () => {
            client.disconnectUser()
            setIsReady(false)
        }
    }, [profile?.id])

    if (!isReady) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator />
            </View>
        )
    }
    
    return (
        <OverlayProvider>
            <Chat client={client}>{children}</Chat>
        </OverlayProvider>
    )
}