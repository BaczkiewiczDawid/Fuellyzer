import * as React from 'react'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import { Button, View, Text } from 'react-native'
import { useEffect, useState } from 'react'
import * as AuthSession from 'expo-auth-session'

WebBrowser.maybeCompleteAuthSession()

export default function GoogleLogin() {
  const [userInfo, setUserInfo] = useState(null)

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
    scopes: ['profile', 'email'],
    redirectUri: AuthSession.makeRedirectUri({
      scheme: 'fuellyzer',
      path: 'oauth2redirect/google'
    }),
  })

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response
      if (authentication?.accessToken) {
        fetchUserInfo(authentication.accessToken)
      }
    }
  }, [response])

  const fetchUserInfo = async (token: string) => {
    const res = await fetch('https://www.googleapis.com/userinfo/v2/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
    const user = await res.json()
    setUserInfo(user)
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        title="Sign in with Google"
        disabled={!request}
        onPress={() => promptAsync()}
      />
      {userInfo && (
        <View style={{ marginTop: 20 }}>
          {/* <Text>Welcome {userInfo.name}</Text>
          <Text>Email: {userInfo.email}</Text> */}
        </View>
      )}
    </View>
  )
} 