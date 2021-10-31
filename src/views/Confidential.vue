<template>
  <div class="ui placeholder segment">
    <div class="ui icon header">
      <h1 class="ui center aligned icon header"><i class="ri-key-2-line"></i></h1>
      <p>机密信息</p>
    </div>
    <template v-if="obtain === 'NONE'">
      <div class="inline">
        <div class="ui inverted segment">
          <button id="joinSecret" class="ui inverted secondary button">进入机密信息</button>
        </div>
      </div>
      <component :is="'script'">
        $("#joinSecret").click(function () {
        $('#secretJoin')
        .modal('setting', 'closable', false)
        .modal('show');
        });
      </component>
    </template>
    <template v-else>
      <div class="inline">
        <div id="check" class="ui primary button">查看</div>
        <div id="leave" class="ui button">留言</div>
      </div>
      <component :is="'script'">
        $("#check").click(function () {
        $('#view')
        .modal('setting', 'transition', 'horizontal flip')
        .modal('setting', 'closable', false)
        .modal('show');
        });
        $("#leave").click(function () {
        $('#message')
        .modal('setting', 'transition', 'vertical flip')
        .modal('setting', 'closable', false)
        .modal('show');
        });
      </component>
    </template>
  </div>
  <div id="view" class="ui longer modal">
    <p class="ui teal tag label">ID~{{ obtain.secretsId }}</p>
    <span class="ui bottom label">创建时间:{{ obtain.createdTime }}</span>
    <span class="ui bottom label">更新时间:{{ obtain.updatedTime }}</span>
    <div class="header">
      <p>机密信息</p>
    </div>
    <div class="scrolling content">
      <div class="description">
        <div class="ui center aligned segment">
          <div class="ui header">{{ obtain.secretsTopic }}</div>
          <p>{{ obtain.secretsValue }}</p>
        </div>
      </div>
    </div>
    <div class="actions">
      <div class="ui primary approve button">
        <i class="ri-chat-off-line"></i>
        <p>关闭</p>
      </div>
    </div>
  </div>
  <div id="message" class="ui longer modal">
    <p id="secretsId" class="ui teal tag label">ID~{{ obtain.secretsId }}</p>
    <div class="header">
      <span>留言</span>
      <button class="ui right floated violet basic button" @click="ShowMessage">加载留言</button>
    </div>
    <div class="scrolling content">
      <div class="ui medium">
        <template v-if=loginSecret>
          <form class="ui reply form">
            <div class="field">
              <textarea id="commentValue" placeholder="发表留言"></textarea>
            </div>
            <div class="field">
              <input id="commentPassword" placeholder="密码" type="password">
            </div>
            <div class="ui blue labeled submit icon button" @click="CommentSecret">
              <i class="icon edit"></i>
              留言
            </div>
          </form>
        </template>
        <template v-else>
          <h1 class="ui center aligned icon header" style="color: red"><i class="ri-login-box-line"></i>
            <p>请登录后留言</p></h1>
        </template>
      </div>
      <div class="description">
        <div class="ui header">
          <h1 class="ui center aligned icon header"><span>留</span><i class="ri-record-mail-line"></i><span>言</span></h1>
        </div>
        <template v-if="confidentialMessage !== 'NONE'">
          <div class="ui grid fluid">
            <template v-for="message in confidentialMessage" :key="message.commentsId">
              <div class="sixteen wide mobile sixteen wide tablet eight wide computer column">
                <div class="ui feed">
                  <div class="event">
                    <div class="label">
                      <h1><i class="ri-discuss-fill"></i></h1>
                    </div>
                    <div class="content">
                      <div class="summary">
                        <p class="user"><i class="ri-account-pin-circle-line"></i></p>
                        <p>{{ message.commentsValue }}</p>
                      </div>
                      <div class="meta">
                        <span class="like">创建时间:{{ message.create }}</span>
                      </div>
                      <div class="meta">
                        <span class="like">更新时间:{{ message.update }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </template>
      </div>
    </div>
    <div class="actions">
      <div class="ui primary approve button">
        <i class="ri-chat-off-line"></i>
        <p>关闭</p>
      </div>
    </div>
  </div>
  <div id="secretJoin" class="ui small modal">
    <div class="header">请输入ID与签名</div>
    <div class="content">
      <div class="ui fluid input">
        <input id="obtainId" placeholder="机密信息ID" type="text">
      </div>
      <hr>
      <div class="ui fluid input">
        <input id="obtainPassword" placeholder="签名" type="password">
      </div>
    </div>
    <div class="actions">
      <div class="ui green ok button" @click="ObtainSecret">确认</div>
      <div class="ui red cancel button">取消</div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import qs from 'qs'
import axios from "axios";

export default {
  name: "Confidential",
  data() {
    return {
      obtain: 'NONE',
      confidentialMessage: 'NONE',
      loginSecret: false
    }
  },
  mounted() {
    const configAuth = {
      baseURL: process.env.VUE_APP_backend_url,
      method: 'get',
      url: '/api/userAccess/userAuth',
      withCredentials: true // 允许携带cookie
    };
    axios(configAuth)
        .then(response => {
          return this.loginSecret = response.data
        })
        .catch(function (error) {
          console.log(error);
        });
  },
  methods: {
    ObtainSecret() {
      const password = $("#obtainPassword").val();
      const id = $("#obtainId").val();
      if (password !== '' && id !== '') {
        let data = qs.stringify({
          'signature': password,
          'secretId': id
        });
        let config = {
          baseURL: process.env.VUE_APP_backend_url,
          method: 'post',
          url: '/api/secrets/obtain',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: data
        };
        axios(config)
            .then(response => {
              if (response.data === '无此加密信息') {
                alert('无此加密信息');
              } else if (response.data === '签名验证不通过') {
                alert('签名验证不通过');
              } else {
                return this.obtain = response.data;
              }
            })
            .catch(function (error) {
              console.log(error);
            });
      } else {
        alert("请填写表单中的所有内容");
      }
    },
    CommentSecret() {
      let secretId = $("#secretsId").text().split("~")[1];
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
      if (secretId !== '' && Password !== '' && Comment !== '' && datetime !== '') {
        let data = qs.stringify({
          'password': Password,
          'secretsId': secretId,
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
              if (response.data === '发表评论成功') {
                alert('发表留言成功');
              } else if (response.data === '发表评论失败') {
                alert('发表留言失败');
              } else {
                alert(response.data);
              }
            })
            .catch(function (error) {
              console.log(error);
            });
      } else {
        alert("请完善表单内容");
      }
    },
    ShowMessage() {
      let secretId = $("#secretsId").text().split("~")[1];
      if (secretId !== '') {
        let data = qs.stringify({
          'secretsId': secretId
        });
        let configSecret = {
          baseURL: process.env.VUE_APP_backend_url,
          method: 'post',
          url: '/api/comment/confidentialMessage',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: data
        };
        axios(configSecret)
            .then(response => (
                this.confidentialMessage = response.data
            ))
            .catch(function (error) {
              console.log(error);
            });
      }
    }
  }
}
</script>