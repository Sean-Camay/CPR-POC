import { Configuration, LogLevel } from '@azure/msal-browser'

export const msalConfig: Configuration = {
  auth: {
    clientId: 'dfc0d61c-691e-4c78-a193-cf8c8ea75c16', // Application (client) ID from Azure portal
    authority:
      'https://login.microsoftonline.com/ed20081e-9387-41f1-9929-a839e35a86a8', // Directory (tenant) ID
    redirectUri: 'http://localhost:51170', // Your app's redirect URI
  },
  cache: {
    cacheLocation: 'sessionStorage', // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set to true if you're having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message)
            return
          case LogLevel.Info:
            console.info(message)
            return
          case LogLevel.Verbose:
            console.debug(message)
            return
          case LogLevel.Warning:
            console.warn(message)
            return
        }
      },
    },
  },
}

export const loginRequest = {
  scopes: ['openid', 'profile', 'email'], // Add any additional scopes you need
}

export const b2cPolicies = {
  names: {
    signUpSignIn: {
      authority:
        'https://ed20081e-9387-41f1-9929-a839e35a86a8.b2clogin.com/ed20081e-9387-41f1-9929-a839e35a86a8.onmicrosoft.com/YOUR_SIGNIN_POLICY',
    },
    forgotPassword: {
      authority:
        'https://ed20081e-9387-41f1-9929-a839e35a86a8.b2clogin.com/ed20081e-9387-41f1-9929-a839e35a86a8.onmicrosoft.com/YOUR_PASSWORD_RESET_POLICY',
    },
    editProfile: {
      authority:
        'https://ed20081e-9387-41f1-9929-a839e35a86a8.b2clogin.com/ed20081e-9387-41f1-9929-a839e35a86a8.onmicrosoft.com/YOUR_EDIT_PROFILE_POLICY',
    },
  },
}
