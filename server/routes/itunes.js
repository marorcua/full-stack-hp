const router = require('express').Router()
const axios = require('axios')
const mongoose = require('mongoose')

function filterAlbumByName(arrayToFilter) {
  return arrayToFilter.filter((album, ind, albumArray) => {
    return (
      ind ===
      albumArray.findIndex((elm) => elm.collectionName === album.collectionName)
    )
  })
}

router.get('/search/:artistName', (req, res) => {
  const { artistName } = req.params
  const path = `https://itunes.apple.com/search?term=${artistName}&entity=musicArtist`
  axios
    .get(path)
    .then((response) => {
      const { artistId } = response.data.results[0]
      const albumSearch = `https://itunes.apple.com/lookup?id=${artistId}&entity=album`
      axios
        .get(albumSearch)
        .then((response) => {
          let uniqueArray = filterAlbumByName(response.data.results)
          const uniqueOnlyAlbums = uniqueArray.filter(
            (elm) => elm.wrapperType === 'collection'
          )
          return res.json(uniqueOnlyAlbums)
        })
        .catch((error) => {
          console.log(error)
        })
    })
    .catch((error) => {
      console.log(error)
    })
})

module.exports = router
