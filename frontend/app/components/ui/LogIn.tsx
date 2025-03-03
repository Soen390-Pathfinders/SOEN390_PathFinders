import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert,
  Linking,
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';

const LoginScreen = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // This should be a URL you've registered in Google Cloud Console
  // Example: https://auth.expo.io/@your-username/your-app-slug
  const redirectUri = "https://auth.expo.io/@znibou/campus-pilot";
  
  console.log("Redirect URI for Google OAuth:", redirectUri);

  // Your Google OAuth client ID
  const clientId = "1094661065391-76dc7skuglltgsqqu3bku6inoh5g5q2b.apps.googleusercontent.com";
  
  // Configure Google OAuth endpoints
  const authEndpoint = "https://accounts.google.com/o/oauth2/v2/auth";
  const tokenEndpoint = "https://oauth2.googleapis.com/token";
  const userInfoEndpoint = "https://www.googleapis.com/oauth2/v3/userinfo";

  // Set up the deep linking listener
  useEffect(() => {
    // Function to handle incoming links
    const handleUrl = async (event) => {
      const url = event.url;
      console.log("Received URL:", url);
      
      if (url.startsWith(redirectUri)) {
        try {
          const urlObj = new URL(url);
          const code = urlObj.searchParams.get('code');
          
          if (code) {
            console.log("Auth code received:", code);
            exchangeCodeForToken(code);
          } else if (urlObj.searchParams.get('error')) {
            const error = urlObj.searchParams.get('error');
            console.error("Authentication error:", error);
            Alert.alert("Authentication Error", error || "An error occurred during authentication");
            setIsAuthenticating(false);
          }
        } catch (error) {
          console.error("Error parsing redirect URL:", error);
          setIsAuthenticating(false);
        }
      }
    };

    // Add event listener for deep linking
    const subscription = Linking.addEventListener('url', handleUrl);

    // Check if app was opened from a deep link
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleUrl({ url });
      }
    });

    return () => {
      // Clean up the event listener
      subscription.remove();
    };
  }, []);

  const exchangeCodeForToken = async (code) => {
    try {
      console.log("Exchanging code for token...");
      
      // Prepare token request body
      const tokenParams = new URLSearchParams();
      tokenParams.append("code", code);
      tokenParams.append("client_id", clientId);
      tokenParams.append("redirect_uri", redirectUri);
      tokenParams.append("grant_type", "authorization_code");
      
      // Make POST request to get tokens
      const tokenResponse = await fetch(tokenEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: tokenParams.toString(),
      });
      
      const tokenData = await tokenResponse.json();
      
      if (tokenResponse.ok && tokenData.access_token) {
        console.log("Token exchange successful");
        getUserInfo(tokenData.access_token);
      } else {
        console.error("Token exchange failed:", tokenData);
        Alert.alert("Authentication Error", tokenData.error_description || "Failed to get access token");
      }
    } catch (error) {
      console.error("Error exchanging code for token:", error);
      Alert.alert("Error", "Failed to complete authentication");
    } finally {
      setIsAuthenticating(false);
    }
  };

  const getUserInfo = async (token) => {
    try {
      const userInfoResponse = await fetch(userInfoEndpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (!userInfoResponse.ok) {
        throw new Error(`Failed to get user info: ${userInfoResponse.status}`);
      }
      
      const userData = await userInfoResponse.json();
      console.log("User Info:", userData);
      setUserInfo(userData);
      
      // Try to fetch calendar events if needed
      fetchCalendarEvents(token);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const fetchCalendarEvents = async (token) => {
    try {
      const calendarResponse = await fetch(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events?maxResults=10",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      if (!calendarResponse.ok) {
        throw new Error(`Failed to fetch calendar: ${calendarResponse.status}`);
      }
      
      const events = await calendarResponse.json();
      console.log("Calendar Events:", events.items?.length || 0);
    } catch (error) {
      console.error("Error fetching calendar:", error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsAuthenticating(true);
      console.log("Starting authentication...");
      
      // Generate a random state for security
      const state = Math.random().toString(36).substring(2, 15);
      
      // Build the authentication URL
      const scopes = encodeURIComponent("openid profile email https://www.googleapis.com/auth/calendar.readonly");
      const authUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${scopes}&access_type=offline&state=${state}&prompt=consent`;
      
      console.log("Opening auth URL:", authUrl);
      
      // Open the browser with the authentication URL
      const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUri);
      console.log("Auth result:", result);
      
      if (result.type === 'cancel') {
        console.log("Authentication was canceled by the user");
        setIsAuthenticating(false);
      } else if (result.type === 'dismiss') {
        console.log("Authentication was dismissed");
        setIsAuthenticating(false);
      }
      
      // The actual success handling is done in the useEffect above via Linking
      
    } catch (error) {
      console.error("Error starting authentication:", error);
      setIsAuthenticating(false);
      Alert.alert("Authentication Error", "Failed to start the authentication process");
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
          
          {/* Debug info */}
          <View style={styles.debugInfo}>
            <Text style={styles.debugText}>Redirect URI: {redirectUri}</Text>
            <Text style={styles.debugText}>App Constants: {JSON.stringify(Constants.expoConfig?.extra || {})}</Text>
          </View>

          <TouchableOpacity
            style={[
              styles.googleButton,
              isAuthenticating && styles.disabledButton
            ]}
            disabled={isAuthenticating}
            onPress={handleGoogleLogin}
          >
            {isAuthenticating ? (
              <Text>Loading...</Text>
            ) : (
              <Image
                source={require('../../../assets/images/google.png')}
                style={styles.googleIcon}
              />
            )}
          </TouchableOpacity>
        </View>

        {userInfo && (
          <View style={styles.userInfoContainer}>
            <Text style={styles.userInfoText}>
              Welcome, {userInfo.name || userInfo.given_name}!
            </Text>
            {userInfo.picture && (
              <Image 
                source={{ uri: userInfo.picture }} 
                style={styles.profilePicture} 
              />
            )}
            <Text style={styles.emailText}>{userInfo.email}</Text>
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  disabledButton: {
    opacity: 0.6,
  },
  googleIcon: {
    width: 40,
    height: 40,
  },
  userInfoContainer: {
    marginTop: 20,
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  userInfoText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  profilePicture: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginVertical: 10,
  },
  emailText: {
    fontSize: 16,
    color: '#666',
  },
  debugInfo: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    marginBottom: 10,
  },
  debugText: {
    fontSize: 10,
    color: '#666',
  },
});

export default LoginScreen;