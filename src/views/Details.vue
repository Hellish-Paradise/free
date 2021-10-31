<template>
  <template v-if="details === 'NONE'">
    <h1>{{ details }}</h1>
  </template>
  <template v-else>
    <div class="fluid ui grid">
      <div class="sixteen wide mobile sixteen wide tablet eight wide computer column">
        <div class="ui grid container">
          <div class="sixteen wide mobile sixteen wide tablet sixteen wide computer column">
            <div class="ui orange piled segment">
              <span class="ui top attached label">个性签名:{{ details.userIntro }}</span>
              <span class="ui blue ribbon label">用户名:{{ details.userName }}</span>
              <h4 class="ui header">{{ details.infoTopic }}</h4>
              <p>{{ details.infoValue }}</p>
              <br>
              <span class="ui bottom label">创建时间:{{ details.create }}</span>
              <span class="ui bottom label">更新时间:{{ details.update }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="sixteen wide mobile sixteen wide tablet eight wide computer column">
        <h1 class="ui center aligned icon header"><span>评</span><i class="ri-question-answer-fill"></i><span>论</span>
        </h1>
        <div class="ui grid container">
          <div class="sixteen wide mobile sixteen wide tablet sixteen wide computer column">
            <template v-if=login>
              <form class="ui reply form">
                <div class="field">
                  <textarea id="commentValue" placeholder="发表公开评论"></textarea>
                </div>
                <div class="field">
                  <input id="commentPassword" placeholder="密码" type="password">
                </div>
                <div class="ui blue labeled submit icon button" @click="LeaveComment">
                  <i class="icon edit"></i>
                  评论
                </div>
              </form>
            </template>
            <template v-else>
              <h1 class="ui center aligned icon header" style="color: red"><i class="ri-login-box-line"></i>
                <p>请登录后评论</p></h1>
            </template>
          </div>
          <template v-for="com in comments" :key="com.commentsId">
            <div class="sixteen wide mobile eight wide tablet eight wide computer column">
              <div class="ui comments">
                <div class="comment">
                  <a class="avatar">
                    <h1><i class="ri-message-3-line"></i></h1>
                  </a>
                  <div class="content">
                    <a class="author">{{ com.userName }}</a>
                    <div class="text">{{ com.commentsValue }}</div>
                    <div class="metadata">
                      <div class="date">创建时间:{{ com.create }}</div>
                      <div class="date">更新时间:{{ com.update }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </template>
</template>

<script>
import axios from "axios";
import $ from "jquery";
import qs from "qs";

export default {
  name: "Details",
  data() {
    return {
      details: 'NONE',
      comments: 'NONE',
      login: false
    }
  },
  mounted() {
    let infoId = this.$route.query.infoId
    const configTopic = {
      baseURL: process.env.VUE_APP_backend_url,
      method: 'get',
      url: '/api/info/particulars',
      params: {infoId: infoId},
    };
    axios(configTopic)
        .then(response => {
          if (Object.keys(response.data).length !== 0) {
            return this.details = response.data
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    const configComment = {
      baseURL: process.env.VUE_APP_backend_url,
      method: 'get',
      url: '/api/comment/element',
      params: {infoId: infoId},
    };
    axios(configComment)
        .then(response => {
          return this.comments = response.data
        })
        .catch(function (error) {
          console.log(error);
        });
    const configAuth = {
      baseURL: process.env.VUE_APP_backend_url,
      method: 'get',
      url: '/api/userAccess/userAuth',
      withCredentials: true // 允许携带cookie
    };
    axios(configAuth)
        .then(response => {
          return this.login = response.data
        })
        .catch(function (error) {
          console.log(error);
        });
  },
  methods: {
    LeaveComment() {
      let infoId = this.$route.query.infoId;
      const Password = $("#commentPassword").val();
      const Comment = $("#commentValue").val();
      const today = new Date();
      const y = today.getFullYear();
      const month = today.getMonth() + 1;
      const td = today.getDate();
      const h = today.getHours();
      const m = today.getMinutes();
      const s = today.getSeconds();
      const datetime = y + '-' + month + '-' + td + ' ' + h + ':' + m + ':' + s;
      if (infoId !== '' && Password !== '' && Comment !== '' && datetime !== '') {
        let data = qs.stringify({
          'password': Password,
          'infoId': infoId,
          'commentsValue': Comment,
          'create': datetime
        });
        let config = {
          baseURL: process.env.VUE_APP_backend_url,
          method: 'post',
          url: '/api/comment/review',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: data,
          withCredentials: true // 允许携带cookie
        };
        axios(config)
            .then(response => {
              alert(response.data);
              if (response.data === '发表评论成功') {
                location.reload();
              }
            })
            .catch(function (error) {
              console.log(error);
            });
      } else {
        alert("请完善表单内容");
      }
    }
  }
}
</script>