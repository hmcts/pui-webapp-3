import axios, { AxiosInstance } from 'axios'
import { errorInterceptor, successInterceptor, requestInterceptor } from '../lib/interceptors'

export const http: AxiosInstance = axios.create({})

http.interceptors.request.use(requestInterceptor)
http.interceptors.response.use(successInterceptor, errorInterceptor)
