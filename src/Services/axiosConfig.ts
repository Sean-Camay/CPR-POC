// src/services/axiosConfig.ts
import axios from 'axios'
import { PublicClientApplication } from '@azure/msal-browser'
import { msalConfig, loginRequest } from '../authConfig'

const msalInstance = new PublicClientApplication(msalConfig)

// Create an axios instance
const api = axios.create({
  baseURL: 'https://your-api-base-url.com',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add a request interceptor to inject the token
api.interceptors.request.use(
  async (config) => {
    const accounts = msalInstance.getAllAccounts()
    if (accounts.length > 0) {
      try {
        const tokenResponse = await msalInstance.acquireTokenSilent({
          ...loginRequest,
          account: accounts[0],
        })

        config.headers.Authorization = `Bearer ${tokenResponse.accessToken}`
      } catch (error) {
        console.error('Error acquiring token silently', error)
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default api
