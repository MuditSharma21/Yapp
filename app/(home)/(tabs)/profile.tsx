import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { StyleSheet, View, Alert, ScrollView } from 'react-native'
import { Button, Input } from '@rneui/themed'
import { useAuth } from '@/providers/AuthProvider'
import Avatar from '@/components/Avatar'

export default function ProfileScreen() {
    const { session  } = useAuth()
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState('')
  const [fullname, setFullname] = useState('')
  const [website, setWebsite] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')

  useEffect(() => {
    if (session) getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url, full_name`)
        .eq('id', session?.user.id)
        .single()
      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
        setFullname(data.full_name)
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({
    username,
    website,
    avatar_url,
    full_name
  }: {
    username: string
    website: string
    avatar_url: string
    full_name: string
  }) {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      const updates = {
        id: session?.user.id,
        username,
        website,
        avatar_url,
        full_name,
        updated_at: new Date(),
      }

      const { error } = await supabase.from('profiles').upsert(updates)

      if (error) {
        throw error
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <View  style={styles.container}>
        <ScrollView>
        <View style={{ alignItems: 'center' }}>
            <Avatar
                size={200}
                url={avatarUrl}
                onUpload={(url: string) => {
                setAvatarUrl(url)
                updateProfile({ username, website, avatar_url: url, full_name: fullname })
                }}
            />
        </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input label="Email" value={session?.user?.email} disabled inputContainerStyle={styles.input} labelStyle={{marginLeft: 10}}
          inputStyle={{ color: 'black' }}/>
      </View>
      <View style={styles.verticallySpaced}>
        <Input label="Fullname" value={fullname || ''} onChangeText={(text) => setFullname(text)} inputContainerStyle={styles.input} labelStyle={{marginLeft: 10}}
          inputStyle={{ color: 'black' }}/>
      </View>
      <View style={styles.verticallySpaced}>
        <Input label="Username" value={username || ''} onChangeText={(text) => setUsername(text)} inputContainerStyle={styles.input} labelStyle={{marginLeft: 10}}
          inputStyle={{ color: 'black' }}/>
      </View>
      <View style={styles.verticallySpaced}>
        <Input label="Website" value={website || ''} onChangeText={(text) => setWebsite(text)} inputContainerStyle={styles.input} labelStyle={{marginLeft: 10}}
          inputStyle={{ color: 'black' }}/>
      </View>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title={loading ? 'Loading ...' : 'Update'}
          onPress={() => updateProfile({ username, website, avatar_url: avatarUrl, full_name: fullname })}
          loading={loading}
          buttonStyle={styles.button} 
        />
      </View>

      <View style={styles.verticallySpaced}>
        <Button title="Sign Out" onPress={() => supabase.auth.signOut()} buttonStyle={styles.button} />
      </View>
    </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  button: {
    borderRadius: 100,
    backgroundColor: '#2379b3',
    color: 'white',
    padding: 14
  },
  input: {
    borderBottomWidth: 4,
    borderTopWidth: 4,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#2379b3',
    borderRadius: 100,
    padding: 10,
    marginTop: 5,
    backgroundColor: 'lightgray'
  }
})