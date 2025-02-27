import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';


WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userInfo, setUserInfo] = useState(null);

  // Google OAuth configuration
  const discovery = {
    authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
    tokenEndpoint: "https://oauth2.googleapis.com/token",
    userInfoEndpoint: "https://www.googleapis.com/oauth2/v3/userinfo",
  };

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: "1094661065391-dnk33i66mtkmln41mt51v0q5b5dpbqlo.apps.googleusercontent.com",
      scopes: ["openid", "profile", "email"],
      redirectUri: AuthSession.makeRedirectUri({
        native: "myapp://redirect",
        useProxy: false,
        scheme: "myapp",
      }),
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      getUserInfo(authentication.accessToken);
    }
  }, [response]);

  const getUserInfo = async (token) => {
    const response = await fetch(discovery.userInfoEndpoint, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const user = await response.json();
    setUserInfo(user);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.loginTitle}>Login</Text>

        <Image
          source={require('../../../assets/images/LogIn.png')}
          style={styles.illustration}
          resizeMode="contain"
        />

        <View style={styles.form}>

          <Text style={styles.orText}>Continue with Google</Text>

          <TouchableOpacity
            style={styles.googleButton}
            onPress={() => {
              promptAsync({ useProxy: false, showInRecents: true });
            }}
          >
            <Image
              source={require('../../../assets/images/google.png')}
              style={styles.googleIcon}
            />
          </TouchableOpacity>
        </View>

        {userInfo && (
          <View>
            <Text style={styles.userInfoText}>Welcome, {userInfo.name}!</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  loginTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    alignSelf: 'center',
    color: '#000',
  },
  illustration: {
    width: '100%',
    height: 350,
    marginBottom: 40,
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    color: '#000',
  },
  input: {
    width: '100%',
    height: 55,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    color: '#000',
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#0072A8',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  orText: {
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#666',
    fontSize: 18,
  },
  googleButton: {
    width: 90,
    height: 90,
    borderRadius: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 15,
    elevation: 3,
  },
  googleIcon: {
    width: 40,
    height: 40,
  },
  userInfoText: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
  },
});

export default LoginScreen;
