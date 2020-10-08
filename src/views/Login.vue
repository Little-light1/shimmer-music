<template>
  <div>
    <div class="login">
      <h2 class="title">微光音乐</h2>
    <van-cell-group :border='true'>
     <!-- 输入手机号，调起手机号键盘 -->
     <van-field v-model="tel" type="tel" label="手机号"  />
     <!-- 输入密码 -->
     <van-field v-model="password" type="password" label="密码" />
    </van-cell-group>

    <div class="btn">
     <van-button type="primary" @click="getLoginInfo">登录</van-button>
     <van-button type="info">注册</van-button>
    </div>

    </div>

  </div>
</template>

<script>
  export default {
      data () {
        return {
          tel: '15161582526',
          password: 'wyydmms123123'
        }
      },
      created () {
      },
      methods: {
          async getLoginInfo() {
             const {data: res}  = await this.$http.get(`/login/cellphone`, {
               params: {
               phone: this.tel,
               password: this.password
               }
             })
             if(res.code == 200){
              this.$toast.success('登录成功！')
             }
            // 保存token
             window.sessionStorage.setItem('token',res.token)
             window.sessionStorage.setItem('userId',res.account.id)
             this.$router.push('/main')
         }
      }
  }
</script>

<style lang="less" scoped>
.login{
  margin-top: 200px;
  .btn{
    margin-top: 10px;
    display: flex;
    justify-content: space-around;
  }
  .title{
    text-align: center;
    color: red;
  }
}
</style>
