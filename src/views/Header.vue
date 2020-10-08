<template>
  <div id="app">
    <div class="header">
      <van-row :gutter="20">
        <router-link to="/myself">
          <van-col span="8">我的</van-col>
        </router-link>
        <router-link to="/main">
          <van-col span="8">发现</van-col>
        </router-link>
        <router-link to="/search">
          <van-col span="8">搜索</van-col>
        </router-link>
      </van-row>
    </div>
    <!-- 主体 -->
    <keep-alive include="Myself,Main,Search">
      <router-view :url="imgUrl"></router-view>
    </keep-alive>
    <!-- 播放 -->
    <div class="play">
      <audio :src="musicUrl" autoplay id="audio"></audio>
      <!-- 图片 -->
      <div class="left">
        <van-image
          width="40"
          height="40"
          :src="imgUrl"
          round
          v-if="imgUrl !== ''"
          @click="toLrc"
        />
        <van-image
          v-if="imgUrl == 0"
          width="40"
          height="40"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
          round
        />
      </div>
      <!-- 歌曲名称 -->
      <div class="mid">
        <p class="p1">{{ songName }}</p>
        <p class="p2">{{ singer }}</p>
      </div>
      <!-- 进度条 -->
      <div class="slider" v-if="musicUrl !== ''">
        <van-slider
          v-model="value"
          @change="onChange"
          button-size="15px"
          active-color="black"
        />
        <span class="time"></span>
      </div>
      <!-- 播放暂停 -->
      <div class="right">
        <van-icon id="icon1" name="play-circle-o" size="30" @click="play" />
        <van-icon id="icon2" name="pause-circle-o" size="30" @click="pause" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      musicUrl: '',
      imgUrl: '',
      songName: '',
      singer: '',
      value: 0,
      songsId: '',
      currentTime:0
    }
  },
  watch: {
    musicUrl (newValue, oldValue) {
      let pause = document.getElementById('icon2')
      let play = document.getElementById('icon1')
      if (newValue !== oldValue) {
        // 控制播放暂停按钮
        pause.style.display = 'inline'
        play.style.display = 'none'
      }
    }
  },
  mounted () {
    this.updateChange()
  },
  methods: {
    // 暂停
    pause () {
      let audio = document.getElementById('audio')
      let pause = document.getElementById('icon2')
      let play = document.getElementById('icon1')
      // 控制播放暂停按钮
      play.style.display = 'inline'
      pause.style.display = 'none'
      audio.pause()
    },
    // 播放
    play () {
      if (this.musicUrl == "") {
        return
      }
      let audio = document.getElementById('audio')
      let pause = document.getElementById('icon2')
      let play = document.getElementById('icon1')
      // 控制播放暂停按钮
      pause.style.display = 'inline'
      play.style.display = 'none'
      audio.play()
    },
    // 拖动进度条
    onChange () {
      let audio = document.getElementById('audio')
      let allTime = audio.duration
      let nowTime = this.value / 100 * allTime
      audio.currentTime = nowTime
    },
    updateChange () {
      // 进度条实时显示
      let audio = document.getElementById('audio')
      const timer = setInterval(() => {
        let allTime = audio.duration
        this.currentTime = audio.currentTime
        this.value = (this.currentTime / allTime) * 100
        if (this.value >= 100) {
          this.value = 0
        }

      }, 30);
    },
    toLrc () {
      if (this.$route.path == '/lrc') {
        return
      }
      this.$router.push(`/lrc?q=${this.songsId}`)
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  line-height: 40px;
  background-color: #e7e7e7;
  font-size: 18px;
  color: black;
  text-align: center;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 40;
}
.play {
  background-color: rgb(221, 86, 109);
  width: 100%;
  height: 40px;
  position: fixed;
  bottom: 0;
  z-index: 9999;
  display: flex;
}
.left {
  margin-left: 10px;
}
.mid {
  width: 150px;
  height: 40px;
  .p1 {
    margin-left: 10px;
    margin-top: 5px;
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
  }
  .p2 {
    margin-top: -13px;
    margin-left: 10px;
    font-size: 8px;
  }
}
.right {
  position: absolute;
  width: 40px;
  margin-top: 5px;
  margin-left: 91%;
}
.slider {
  position: absolute;
  width: 120px;
  margin-left: 57%;
  margin-right: 10px;
  .van-slider {
    margin-top: 14px;
    margin-bottom: 6px;
  }
  .time {
    width: 40px;
    height: 20px;
    text-align: center;
  }
}
</style>
