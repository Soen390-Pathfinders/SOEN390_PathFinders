import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  const [userInfo, setUserInfo] = useState(null);

  // Google OAuth configuration
  const discovery = {
    authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
    tokenEndpoint: "https://oauth2.googleapis.com/token",
    userInfoEndpoint: "https://www.googleapis.com/oauth2/v3/userinfo",
  };

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: "1094661065391-76dc7skuglltgsqqu3bku6inoh5g5q2b.apps.googleusercontent.com",
      scopes: [
        "openid",
        "profile",
        "email",
        "https://www.googleapis.com/auth/calendar.readonly"
      ],
      redirectUri: "https://auth.expo.io/@znibou/campus-pilot"
      ,
    },
    discovery
  );

  useEffect(() => {
    console.log("OAuth Response:", response);
    if (response?.type === "success") {
      const { authentication } = response;
      console.log("Access Token:", authentication?.accessToken);
      if (authentication?.accessToken) {
        getUserInfo(authentication.accessToken);
      } else {
        console.error("Authentication failed: No access token");
      }
    } else if (response?.type === "error") {
      console.error("Google Login Error:", response.error);
    }
  }, [response]);

  const getUserInfo = async (token) => {
    try {
      // Fetch user profile
      const response = await fetch(discovery.userInfoEndpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = await response.json();
      console.log("User Info:", user);
      setUserInfo(user);

      // Fetch calendar events (class schedule)
      const eventsResponse = await fetch(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const events = await eventsResponse.json();
      console.log("User's Calendar Events:", events.items);
    } catch (error) {
      console.error("Error fetching user info or calendar:", error);
    }
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
              promptAsync();
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
