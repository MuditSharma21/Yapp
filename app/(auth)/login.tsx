import React, { useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { Button, Input } from '@rneui/themed'
import { supabase } from '@/lib/supabase'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loadingSignIn, setLoadingSignIn] = useState(false)
  const [loadingSignUp, setLoadingSignUp] = useState(false)

  async function signInWithEmail() {
    setLoadingSignIn(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoadingSignIn(false)
  }

  async function signUpWithEmail() {
    setLoadingSignUp(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    if (!session) Alert.alert('Please check your inbox for email verification!')
    setLoadingSignUp(false)
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Email"
          leftIcon={{ type: 'font-awesome5', name: 'mail', color: 'gray' }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="Enter email"
          autoCapitalize={'none'}
          inputContainerStyle={styles.input}
          labelStyle={{marginLeft: 10}}
          inputStyle={{ color: 'gray' }}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Password"
          leftIcon={{ type: 'font-awesome5', name: 'lock', color: 'gray' }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Enter password"
          autoCapitalize={'none'}
          inputContainerStyle={styles.input}
          labelStyle={{marginLeft: 10}}
          inputStyle={{ color: 'gray' }}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button title="Sign in" loading={loadingSignIn} onPress={() => signInWithEmail()} buttonStyle={styles.button} />
      </View>
      <View style={styles.verticallySpaced}>
        <Button title="Sign up" loading={loadingSignUp}  onPress={() => signUpWithEmail()} buttonStyle={styles.button}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12
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
    backgroundColor: '#b4a39b',
    color: 'white',
    padding: 14
  },
  input: {
    borderBottomWidth: 4,
    borderTopWidth: 4,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#b4a39b',
    borderRadius: 100,
    padding: 10,
    marginTop: 5
  }
})