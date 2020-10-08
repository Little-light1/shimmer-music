<template>
  <div>
    <!-- 主体 -->
    <div>
      <div class="myInfo">
        <van-image width="50" height="50" round :src="imgUrl" />
        <h3 class="name">{{ name }}</h3>
        <van-button type="primary" size="mini" round
          >等级{{ level }}</van-button
        >
        <van-button type="danger" size="mini" round
          @click="toLogin">退出</van-button
        >
      </div>
      <!-- 我的歌单 -->
      <div class="items">
        <h3>我的歌单</h3>
        <div class="item" v-for="(item, index) in playlist" :key="index">
          <van-card
            :desc="item.description"
            :title="item.name"
            :thumb="item.coverImgUrl"
            @click="toPlaylist(item.id)"
          />
        </div>
      </div>
      <!-- 基本信息 -->
      <h3>基本信息</h3>
      <p>村龄：{{ createDays }}天</p>
      <p>已听歌曲：{{ listenSongs }}首</p>
    </div>
  </div>
</template>

<script>

export default {
name: 'Myself',
  data () {
    return {
      name: '',
      imgUrl: '',
      level: '',
      playlist: [],
      createDays: '',
      listenSongs: ''
    }
  },
  created () {
    this.getUserInfo()
    this.getUserPlaylist()
  },
  methods: {
    async getUserInfo () {
      const id = window.sessionStorage.getItem("userId")
      const res = await this.$http.get(`/user/detail`, {
        params: {
          uid: id
        }
      })
      // console.log(res);
      this.imgUrl = res.data.profile.avatarUrl
      this.name = res.data.profile.nickname
      this.level = res.data.level
      this.createDays = res.data.createDays
      this.listenSongs = res.data.listenSongs
    },
    async getUserPlaylist () {
      const id = window.sessionStorage.getItem('userId')
      const res = await this.$http.get(`/user/playlist`, {
        params: {
          uid: id
        }
      })
      // console.log(res);
      this.playlist = res.data.playlist
    },
    toPlaylist (id) {
      this.$router.push(`./playlist?q=${id}`)
    },
    toLogin () {
      this.$router.push('/')
      window.sessionStorage.clear('token')
      window.sessionStorage.clear('userId')
    }
  }
}
</script>

<style lang="less" scoped>
.myInfo {
  display: flex;
  justify-items: center;
  margin-top: 10px;
  background-color: #fff;
  .van-image {
    margin-top: 5px;
    margin-left: 20px;
  }
  .name {
    margin-left: 20px;
    text-align: center;
  }
  .van-button {
    margin-left: 10px;
    margin-right: 20px;
    margin-top: 20px;
  }
}
.items .item .van-card {
  height: 80px;
}
.items .item .van-card .van-card__thumb {
  width: 60px;
  height: 60px;
}
.items .item .van-card .van-card__desc {
  margin-top: 8px;
}
</style>
