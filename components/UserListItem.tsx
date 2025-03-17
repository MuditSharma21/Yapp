import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useChatContext } from 'stream-chat-expo'
import { useAuth } from '@/providers/AuthProvider'
import { router } from 'expo-router'

const UserListItem = ({ user }: any) => {
    const { client } = useChatContext()
    const { user: me } = useAuth()
    
    const onPress = async () => {
        const channel = client.channel('messaging', {
            members: [me?.id, user.id]
        })
        await channel.watch()
        router.replace(`/(home)/channel/${channel.cid}`)
    }
    
  return (
    <TouchableOpacity style={{ padding: 10, backgroundColor: '#b4a39b', borderRadius: 20, marginHorizontal: '1.5%' }} onPress={onPress}>
      <Text style={{ fontWeight: '600', color: 'white', padding: 10 }}>{user.full_name}</Text>
    </TouchableOpacity>
  )
}

export default UserListItem