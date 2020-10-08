<template>
  <div>
    <!-- 轮播图 -->
    <div class="banner">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in bannerInfo" :key="index">
          <img class="img" :src="item.pic" alt="" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!--人气歌单推荐-->
    <div class="songsList">
      <p>人气歌单推荐</p>
      <van-grid :gutter="10" :icon-size="60" :column-num="3" clickable>
        <van-grid-item
          v-for="(item, index) in playlist"
          :key="index"
          :icon="item.coverImgUrl"
          :text="item.name"
          @click="toPlaylist(item.id)"
        />
      </van-grid>
    </div>
    <!-- 新歌曲推荐 -->
    <div class="newSongs">
      <p>人气新歌推荐</p>
      <van-grid :gutter="10" :icon-size="60" :column-num="2" clickable>
        <van-grid-item
          v-for="(item, index) in newsongs"
          :key="index"
          :icon="item.picUrl"
          :text="item.name"
          @click="playSongs(item.id)"
        >
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 新Mv推荐 -->
    <div class="newMv">
      <p>人气MV推荐</p>
      <van-grid
        :column-num="2"
        :border="false"
        :gutter="10"
        :icon-size="150"
        clickable
      >
        <van-grid-item
          v-for="(item, index) in newMv"
          :key="index"
          :icon="item.picUrl"
          :text="item.name"
          @click="toMv(item.id)"
        />
      </van-grid>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Main',
  data () {
    return {
      bannerInfo: [],
      playlist: [],
      newsongs: [],
      newMv: []
    }
  },
  created () {
    this.getBanner()
    this.getPlaylist()
    this.getNewSongs()
    this.getNewMv()
  },
  methods: {
    // 获取轮播图数据
    async getBanner () {
      const res = await this.$http.get('/banner', {
        params: {
          type: 1
        }
      })
      this.bannerInfo = res.data.banners
    },
    // 获取的单列表
    async getPlaylist () {
      const res = await this.$http.get(`/top/playlist`, {
        params: { limit: 6 }
      })

      // console.log(res);
      this.playlist = res.data.playlists
    },
    // 获取最新歌曲
    async getNewSongs () {
      const res = await this.$http.get(`/personalized/newsong`)
      // console.log(res);
      this.newsongs = res.data.result
    },
    // 获取Mv数据
    async getNewMv () {
      const res = await this.$http.get(`/personalized/mv`, {
        params: {}
      })
      //  console.log(res);
      this.newMv = res.data.result
    },
    toPlaylist (id) {
      // window.sessionStorage.setItem('playlistId',id)
      this.$router.push(`./playlist?q=${id}`)
    },
    // 获取歌曲播放Url
    async playSongs (id) {
       const res = await this.$http.get(`/song/url`, {
        params: { id: id }
      })
       const res1 = await this.$http.get(`/song/detail`, {
        params: {
          ids: id
        }
      })
      // console.log(res1);
      this.$parent.imgUrl = res1.data.songs[0].al.picUrl
      this.$parent.singer = res1.data.songs[0].ar[0].name
      this.$parent.songName = res1.data.songs[0].name
      this.$parent.musicUrl = res.data.data[0].url
      this.$parent.songsId = res.data.data[0].id

    },
    // 去播放页面
    toMv(id) {
       this.$router.push(`/mv?q=${id}`)
    }
  }
}
</script>

<style lang="less" scoped>
.banner {
  background-color: #fff;
  height: 41.667vw;
}
.my-swipe .van-swipe-item .img {
  width: 100%;

  height: 41.667vw;
}

.songsList {
  margin-top: 5.556vw;
}
.newSongs {
  margin: 5.556vw 0 0 0;
}
.newMv {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
