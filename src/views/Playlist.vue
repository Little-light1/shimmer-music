<template>
  <div>
    <!-- 主体内容 头部 -->
    <div class="top">
      <div class="top-head">
        <van-icon name="arrow-left" size="25" @click="$router.back()" />
        <p class="p">歌单♫</p>
      </div>
      <van-card
        :desc="playlistInfo.description"
        :title="playlistInfo.name"
        :thumb="playlistInfo.coverImgUrl"
        @click="show = true"
      />
    </div>
    <!-- 中间 -->
    <div class="mid">
      <p>（共{{ playlistInfo.trackCount }}首）</p>
      <p>播放次数：{{ playlistInfo.playCount }}</p>
    </div>

    <!-- 底部 歌曲信息 -->
    <div class="bottom">
      <ul class="songslist">
        <li
          class="songsinfo"
          v-for="(item, index) in songsInfo"
          :key="index"
          @click="playSongs(item.id)"
        >
          <p class="songsName">{{ item.name }}</p>
          <p class="singer">{{ item.ar[0].name }}</p>
        </li>
      </ul>
    </div>
    <!-- 歌单信息遮罩层 -->
    <van-overlay :show="show" @click="show = false">
      <div class="playlistDetail">
        <van-image :src="playlistInfo.coverImgUrl" />
        <p class="p1">{{ playlistInfo.name }}</p>
        <p class="p2">{{ playlistInfo.description }}</p>
      </div>
    </van-overlay>
  </div>
</template>

<script>

export default {
  data () {
    return {
      show: false,
      playlistInfo: [],
      songsInfo: [],
      songsUrl: '',
      songsId: []
    }
  },
  created () {
    this.getPlaylistInfo()
    // this.getSongsDetail()
  },
  methods: {
    async getPlaylistInfo () {
      // const id = window.sessionStorage.getItem('playlistId')
      const res = await this.$http.get(`/playlist/detail`, {
        params: {
          id: this.$route.query.q
        }
      })
      // console.log(res);
      this.playlistInfo = res.data.playlist
      // 把歌曲id存到songsId中
      let arr = []
      for (let i = 0; i < res.data.playlist.trackIds.length; i++) {
        arr.push(res.data.playlist.trackIds[i].id)
      }
      this.songsId = arr.join(',')

      // 歌单歌曲详细数据
      const res1 = await this.$http.get(`/song/detail`, {
        params: {
          ids: this.songsId
        }
      })
      // console.log(res);
      this.songsInfo = res1.data.songs
    },
    async playSongs (id) {
      const res = await this.$http.get(`/song/url`, {
        params: { id: id }
      })
       const res1 = await this.$http.get(`/song/detail`, {
        params: {
          ids: id
        }
      })
      console.log(res);
      this.$parent.imgUrl = res1.data.songs[0].al.picUrl
      this.$parent.singer = res1.data.songs[0].ar[0].name
      this.$parent.songName = res1.data.songs[0].name
      this.$parent.musicUrl = res.data.data[0].url
      this.$parent.songsId = res.data.data[0].id
    }
  }
}
</script>

<style lang="less" scoped>
.van-card .van-card__desc {
  margin-top: 2.778vw;
}
.van-card .van-card__title {
  margin-top: 1.389vw;
  font-size: 15px;
}
.playlistDetail .van-image {
  width: 100px;
  height: 100px;
  top: 50%;
  left: 50%;
  margin-left: -50px;
  margin-top: 50px;
}
.playlistDetail .p1 {
  font-size: 18px;
  color: white;
  text-align: center;
}
.playlistDetail .p2 {
  margin: 10px 10px 10px 10px;
  font-size: 14px;
  color: white;
  text-align: center;
}
.mid {
  display: flex;
  justify-items: center;
  justify-content: space-around;
  background-color: #fff;
  font-size: 10px;
  color: rgb(175, 169, 169);
  border-bottom: 1px solid #e7e7e7;
}
.songsinfo {
  background-color: #fff;
  line-height: 20px;
  border-bottom: 1px solid #e7e7e7;
  .songsName {
    color: black;
    font-size: 14px;
    width: 300px;
    white-space: nowrap;
    margin: 0 10px 0 10px;
    overflow: hidden;
  }
  .singer {
    font-size: 10px;
    color: #aaa3a3;
    margin-left: 10px;
  }
}
.top-head {
  height: 30px;
  display: flex;
  justify-items: center;
  background-color: #fff;
  .van-icon {
    margin-left: 5px;
    margin-right: 20px;
  }
  .p {
    font-size: 16px;
    margin-top:1px ;
  }
}
.top .van-card {
  margin-top: -5px;
}
</style>
