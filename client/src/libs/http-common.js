import axios from 'axios'

console.log(`API_BASE_URL: ${process.env.API_BASE_URL}`)

export const HTTP = axios.create({
  baseURL: process.env.API_BASE_URL
})
