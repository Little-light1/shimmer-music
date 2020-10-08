<template>
  <div class="lrcpage">
    <div class="lrcbgc" id="lrc"></div>
    <div class="lrc">
      <span class="back">
        <van-icon name="arrow-left" size="20" @click="$router.back()" />
      </span>
      <ul class="ul">
        <li class="midLi"></li>
        <li
          class="li"
          v-for="(item, index) in lrc"
          :key="index"
          :id="item.time"
        >
          {{ item.text }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ['url'],
  data () {
    return {
      lrc: [],
    }
  },
  created () {
    this.getSongsLrc()
  },
  mounted () {
    this.setBgc()
    this.lrcScroll()
  },
  methods: {
    // 获取相对应歌曲的歌词
    async getSongsLrc () {
      const res = await this.$http.get(`/lyric`, {
        params: {
          id: this.$route.query.q
        }
      })
      // console.log(res);
      if (res.data.lrc) {
        const lrc = res.data.lrc.lyric
        // 解析歌词
        // 把lrc字符串以换行分割成数组
        let arr = lrc.split('\n')
        let lrcObj = [];
        for (let i = 0; i < arr.length; i++) {
          let lyric = decodeURIComponent(arr[i]);
          let timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
          let timeRegExpArr = lyric.match(timeReg);
          if (!timeRegExpArr) continue;
          let clause = lyric.replace(timeReg, '');
          for (let k = 0, h = timeRegExpArr.length; k < h; k++) {
            let t = timeRegExpArr[k];
            let min = Number(String(t.match(/\[\d*/i)).slice(1)),
              sec = Number(String(t.match(/\:\d*/i)).slice(1));
            let time = min * 60 + sec;
            if (clause !== '') {
              lrcObj.push({ time: time, text: clause })
            }
          }
        }
        this.lrc = lrcObj
        // console.log(this.lrc);
      }
      else {
        let nolrc = [{
          text: "无歌词"
        }]
        this.lrc = nolrc
      }
    },
    // 设置背景
    setBgc () {
      let page = document.getElementById('lrc')
      page.style.backgroundImage = `url('${this.url}')`;
    },
    // 歌词滚动
    lrcScroll () {
      var timer = setInterval(() => {
        let lis = document.querySelectorAll('.li')
        let currentTime = this.$parent.currentTime
        let time = parseInt(currentTime)
      }, 30)
    }

  }
}
</script>

<style lang="less" scoped>
.lrcbgc {
  width: 100%;
  height: 92%;
  opacity: 30%;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
}
.lrc {
  width: 100%;
  overflow: hidden;
}
.li {
  text-align: center;
  color: black;
  font-size: 20px;
  font-family: 楷体;
}
.back {
  margin-top: 10px;
}
.lrcpage{
  width: 100%;
  max-height: 100%;
}
.ul{
  position: relative;
  height: 100%;
  overflow: hidden;
}
.midLi{
  width: 100%;
  height: 30px;
  // background-color:blue;
  color: red;
  font-size: 20px;
  position:absolute;
  top: 50%;
  transform: translateY(-15px);
}
</style>
