<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
    <AlbumList />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
import AlbumList from '@/components/AlbumList.vue'

@Options({
  components: {
    HelloWorld,
    AlbumList,
  },
})
export default class Home extends Vue {}
</script>
