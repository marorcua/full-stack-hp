import axios, { AxiosInstance } from 'axios'

export class AlbumService {
  constructor(private axiosClient: AxiosInstance) {}

  async fetchAlbums(artistName: string): Promise<[null, []] | [Error | any]> {
    try {
      const { data } = await this.axiosClient.get(
        `/itunes/search/:${artistName}`
      )
      return [null, data]
    } catch (error) {
      console.log(error)
      return [error]
    }
  }
}

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5005/api',
})

export const albumService = new AlbumService(axiosInstance)
