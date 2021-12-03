<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <input v-model="artist" placeholder="search artist" />
    <button v-on:click="fetchAlbums">Search artist</button>
    <div class="margin-15">
      <input
        :filter="filteredAlbums"
        v-if="originalAlbums.length > 0"
        v-model="search"
        placeholder="search album"
      />
    </div>
    <div class="grid-display">
      <div v-for="album in albums" :key="album.collectionId" class="margin-15">
        <div class="grid">
          <!-- <div>{{ album.artistName }}</div> -->
          <div>{{ album.collectionName }}</div>
          <img :src="album.artworkUrl60" alt="album" />
        </div>
      </div>
    </div>
    <span>{{ error }}</span>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { albumService } from '../sevices/AlbumService'

@Options({
  props: {
    msg: String,
  },
  computed: {
    filterArray: function () {
      if (this.search) {
        console.log(this.search, 'hello search')
      } else {
        console.log('aqui')
      }
    },
  },
})
export default class AlbumList extends Vue {
  private albums: any[] | undefined = []
  private originalAlbums: any[] | undefined = []
  private artist = ''
  private search = ''
  private error = ''
  fetchAlbums(): void {
    this.originalAlbums = this.albums = []
    this.artist === ''
      ? (this.error = 'Search is empty')
      : albumService
          .fetchAlbums(this.artist)
          .then((response) => {
            console.log(response)
            this.artist = ''
            return (this.albums = this.originalAlbums = response[1])
          })
          .catch((err) => {
            this.originalAlbums = this.albums = []
            console.log(err)
          })
  }
  get filteredAlbums(): any[] | undefined {
    const searchArray = this.originalAlbums?.filter((elm) => {
      return elm.collectionName
        .toLowerCase()
        .includes(this.search.toLowerCase())
    })
    console.log('searcharray', searchArray)
    this.albums = searchArray
    return searchArray
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  margin: 40px 0 0;
}
.grid-display {
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  justify-content: center;
}
.grid {
  width: 100px;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: space-between;
}
.grid > img {
  height: 60px;
}
.grid > div {
  width: 100%;
}
.margin-15 {
  margin: 15px;
}
</style>
