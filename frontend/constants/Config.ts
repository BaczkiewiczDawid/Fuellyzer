if (!process.env?.SERVER_URL) {
    console.warn('SERVER_URL is not set in environment variables. Using default localhost URL.');
}

export const SERVER_URL = process.env.EXPO_PUBLIC_SERVER_URL || "http://localhost:4000"