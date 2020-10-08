<template>
  <div>
    <van-search
      v-model="value"
      placeholder="请输入搜索关键词"
      @search="getSongsInfo"
      @clear="show = false"
    />
    <!-- 搜索内容主体 -->
    <div class="searchDetail" v-show="show">
      <van-tabs v-model="activeName" type="card" class="tabs">
        <!-- 歌曲搜索结果 -->
        <van-tab title="单曲" name="songs">
          <ul class="songslist">
            <li
              class="songsinfo"
              v-for="(item, index) in resultslist"
              :key="index"
              @click="playSongs(item.id)"
            >
              <p class="songsName">{{ item.name }}</p>
              <p class="singer">{{ item.artists[0].name }}</p>
            </li>
          </ul>
        </van-tab>
        <!-- 歌单搜索结果 -->
        <van-tab title="歌单" name="playlists">
          <van-grid :gutter="10" :icon-size="60" :column-num="3" clickable>
            <van-grid-item
              v-for="(item, index) in playlist"
              :key="index"
              :icon="item.coverImgUrl"
              :text="item.name"
              @click="toPlaylist(item.id)"
            />
          </van-grid>
        </van-tab>
        <!--mv搜索结果-->
        <van-tab title="MV" name="mvs">
          <van-grid
            :column-num="2"
            :border="false"
            :gutter="10"
            :icon-size="150"
            clickable
          >
            <van-grid-item
              v-for="(item, index) in mvlist"
              :key="index"
              :icon="item.cover"
              :text="item.name"
              @click="toMv(item.id)"
            />
          </van-grid>
        </van-tab>
      </van-tabs>
      <!-- 分页 -->
      <van-pagination
        v-model="currentPage"
        :total-items="total"
        :items-per-page="num"
        force-ellipses
        @change="change"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  data () {
    return {
      value: '',
      activeName: 'songs',
      resultslist: [],
      playlist: [],
      mvlist: [],
      limit: 10,
      num: 10,
      currentPage: 1,
      total: 0,
      show: false
    }
  },
  watch: {
    activeName () {
      let type = 1
      switch (this.activeName) {
        case 'songs':
          type = 1
          break
        case 'playlists':
          type = 1000
          break
        case 'mvs':
          type = 1004
          break
      }
      // 判断当前是哪一个tab标签页
      if (type == 1) {
        this.limit = 10
        this.num = 10
        this.getSongsInfo()
      } else if (type == 1000) {
        this.limit = 9
        this.num = 9
        this.getPlaylistInfo()
      } else {
        this.limit = 8
        this.num = 8
        this.getMvInfo()
      }

    }
  },
  methods: {
    async getSongsInfo () {
      const res = await this.$http.get(`/search`, {
        params: {
          keywords: this.value,
          type: 1,
          limit: this.limit,
          offset: (this.currentPage - 1) * this.limit
        }
      })
      // console.log(res);
      this.total = res.data.result.songCount
      this.resultslist = res.data.result.songs
      this.show = true
    },
    async getPlaylistInfo () {
      const res = await this.$http.get(`/search`, {
        params: {
          keywords: this.value,
          type: 1000,
          limit: this.limit,
          offset: (this.currentPage - 1) * this.limit
        }
      })
      // console.log(res);
      this.total = res.data.result.playlistCount
      this.playlist = res.data.result.playlists
      this.show = true
    },
    async getMvInfo () {
      const res = await this.$http.get(`/search`, {
        params: {
          keywords: this.value,
          type: 1004,
          limit: this.limit,
          offset: (this.currentPage - 1) * this.limit
        }
      })
      // console.log(res);
      this.total = res.data.result.mvCount
      this.mvlist = res.data.result.mvs
      this.show = true
    },
    // 播放歌曲
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
    // 去歌单页
    toPlaylist (id) {
      // window.sessionStorage.setItem('playlistId',id)
      this.$router.push(`./playlist?q=${id}`)
    },
    // 去播放页面
    toMv (id) {
      this.$router.push(`/mv?q=${id}`)
    },
    // 页码改变
    change (val) {
      this.currentPage = val
      if (this.activeName === 'songs') {
        this.getSongsInfo()
      } else if (this.activeName === 'playlists') {
        this.getPlaylistInfo()
      } else {
        this.getMvInfo()
      }

    }
  },
}
</script>

<style lang="less" scoped>
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
.van-pagination {
  margin-top: 10px;
}
</style>
