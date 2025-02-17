import axios from 'axios'

export const ergastAPI = axios.create({
  baseURL: 'https://ergast.com/api/f1/',
  timeout: 5000,
})

export const getCurrentRace = async () => {
  const response = await ergastAPI.get('current/last/results.json')
  return response.data.MRData.RaceTable.Races[0]
}