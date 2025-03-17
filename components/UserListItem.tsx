import { Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useChatContext } from 'stream-chat-expo'
import { useAuth } from '@/providers/AuthProvider'
import { router } from 'expo-router'
import { supabase } from '@/lib/supabase'
import { FontAwesome5 } from '@expo/vector-icons'
 
const UserListItem = ({ user }: any) => {
    const { client } = useChatContext()
    const { user: me } = useAuth()
    const publicURL = supabase.storage
      .from('avatars')
      .getPublicUrl(user.avatar_url).data.publicUrl;       
    
    const onPress = async () => {
        const channel = client.channel('messaging', {
            members: [me?.id, user.id]
        })
        await channel.watch()
        router.replace(`/(home)/channel/${channel.cid}`)
    }
    
  return (
    <TouchableOpacity 
      style={{
        padding: 10,
        backgroundColor: '#2379b3',
        borderRadius: 20,
        marginHorizontal: '1.5%',
        flexDirection: 'row',
        alignItems: 'center'
      }} 
      onPress={onPress}
    >
      <Image
        source={{ uri: publicURL }} 
        style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }}
        alt='NO image'
      />
      <View style={{ padding: 10 }}>
        <Text style={{ fontWeight: '600', color: 'white'}}>{user.full_name || 'Anonymous User'}</Text>
        <Text style={{ fontWeight: '600', color: 'white' }}>@{user.username || 'anonymous_user'}</Text>
        </View>
    </TouchableOpacity>
  )
}

export default UserListItem