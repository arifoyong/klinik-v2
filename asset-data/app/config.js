import getConfig from 'next/config'
const { publicRuntimeConfig: config } = getConfig()

export const API = config.BACKEND_API || "http://domain:8080/api"