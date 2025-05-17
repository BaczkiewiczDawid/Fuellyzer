import 'dotenv/config';

export default {
  expo: {
    name: "Fuellyzer",
    slug: "Fuellyzer",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "fuellyzer",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    owner: "dawson22",
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.dawson22.Fuellyzer"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.dawson22.Fuellyzer"
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png"
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          "image": "./assets/images/splash-icon.png",
          "imageWidth": 200,
          "resizeMode": "contain",
          "backgroundColor": "#ffffff"
        }
      ]
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      router: {
        origin: false
      },
      eas: {
        projectId: "74a78766-0e65-49b3-b043-e07026f654bc"
      },
      SERVER_URL: process.env.SERVER_URL,
      googleClientId: process.env.GOOGLE_CLIENT_ID,
      googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }
  }
}; 