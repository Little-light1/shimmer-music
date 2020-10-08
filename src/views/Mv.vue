<template>
  <div>
    <div class="playMv">
      <video :src="mvUrl" controls class="video"></video>
    </div>
    <div class="main">
      <van-collapse v-model="name">
        <van-collapse-item
          name="1"
        >
          <template #title>
            <div>{{mvInfo.name + ' - ' + mvInfo.artistName}}</div>
            <div style="color:#9b9696">{{mvInfo.playCount|playCount}}次观看</div>
          </template>
          {{ mvInfo.desc }}
        </van-collapse-item>
      </van-collapse>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      mvUrl: '',
      mvInfo: [],
      name: ['']
    }
  },
  created () {
    this.getMvsInfo()
  },
  methods: {
    async getMvsInfo () {
      //  播放Mv的url
      const res = await this.$http.get(`/mv/url`, {
        params: {
          id: this.$route.query.q
        }
      })
      // mv的详细信息
      const res1 = await this.$http.get(`/mv/detail`, {
        params: {
          mvid: this.$route.query.q
        }
      })
      // console.log(res1);
      this.mvUrl = res.data.data.url
      this.mvInfo = res1.data.data
    }
  },

}
</script>

<style lang="less" scoped>
.playMv {
  width: 100%;
  .video {
    width: 100%;
  }
}
</style>
