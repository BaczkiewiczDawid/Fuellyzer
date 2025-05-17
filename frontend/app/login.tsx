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
    clientId: '148413152474-8eiq89r6pmusd7gub38v6crqdtt654ui.apps.googleusercontent.com',
    scopes: ['profile', 'email'],
    redirectUri: AuthSession.makeRedirectUri({
      scheme: 'fuellyzer'
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
        title="Zaloguj się przez Google"
        disabled={!request}
        onPress={() => promptAsync()}
      />
      {userInfo && (
        <View style={{ marginTop: 20 }}>
          <Text>Bruh</Text>
        </View>
      )}
    </View>
  )
}
