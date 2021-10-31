<template>
  <header>
    <nav>
      <div class="ui tiny menu">
        <a class="active item">
          <router-link to="/">主页</router-link>
        </a>
        <div class="right menu">
          <template v-if=panel>
            <a class="ui dropdown item">
              操作
              <i class="dropdown icon"></i>
              <div class="menu">
                <div id="logoutUser" class="item"><span style="color: red">登出</span></div>
                <div id="turnInfo" class="item"><span style="color: blue">发表信息</span></div>
                <div id="turnSecret" class="item"><span style="color: orange">发表机密信息</span></div>
                <div class="item">
                  <router-link to="/confidential">进入机密论坛</router-link>
                </div>
              </div>
            </a>
            <div id="userLogout" class="ui mini modal">
              <div class="header">退出账户</div>
              <div class="content">
                <div class="ui fluid">
                  <p>您确认退出您的账户吗?</p>
                </div>
              </div>
              <div class="actions">
                <div class="ui green ok button" @click="Logout">确认</div>
                <div class="ui red cancel button">取消</div>
              </div>
            </div>
            <div id="Info" class="ui small modal">
              <div class="header">信息发表</div>
              <div class="content">
                <form class="ui reply form">
                  <div class="field">
                    <label>密码</label>
                    <input id="infoPassword" type="password">
                  </div>
                  <div class="field">
                    <label>信息主题</label>
                    <input id="infoTopic" type="text">
                  </div>
                  <div class="field">
                    <label>信息内容</label>
                    <textarea id="infoValue"></textarea>
                  </div>
                </form>
              </div>
              <div class="actions">
                <div class="ui blue labeled submit icon button" @click="PublishInfo">
                  <i class="icon edit"></i>
                  发表
                </div>
                <div class="ui red cancel button">取消</div>
              </div>
            </div>
            <div id="Secret" class="ui small modal">
              <div class="header">机密信息发表</div>
              <div class="content">
                <form class="ui reply form">
                  <div class="field">
                    <label>密码</label>
                    <input id="secretPassword" type="password">
                  </div>
                  <div class="field">
                    <label>机密信息主题</label>
                    <input id="secretTopic" type="text">
                  </div>
                  <div class="field">
                    <label>机密信息内容</label>
                    <textarea id="secretValue"></textarea>
                  </div>
                </form>
              </div>
              <div class="actions">
                <div class="ui blue labeled submit icon button" @click="PublishSecret">
                  <i class="icon edit"></i>
                  发表
                </div>
                <div class="ui red cancel button">取消</div>
              </div>
            </div>
            <component :is="'script'">
              $("#logoutUser").click(function () {
              $('#userLogout').modal('setting', 'closable', false).modal('show')
              });
              $("#turnInfo").click(function () {
              $('#Info').modal('setting', 'closable', false).modal('show')
              });
              $("#turnSecret").click(function () {
              $('#Secret').modal('setting', 'closable', false).modal('show')
              });
            </component>
            <div class="item">
              <div class="ui black button">
                <router-link to="/controlPanel">控制中心</router-link>
              </div>
            </div>
            <component :is="'script'">
              $('.ui.dropdown.item').dropdown();
            </component>
          </template>
          <template v-else>
            <div class="item">
              <div id="sig" class="ui primary button">登录&注册</div>
            </div>
          </template>
        </div>
      </div>
    </nav>
    <nav>
      <div class="ui basic modal">
        <div class="ui column grid centered">
          <!--    <div class="sixteen wide mobile sixteen wide tablet eight wide computer column">-->
          <div class="ui shape">
            <div class="sides">
              <div class="active side">
                <div class="ui card">
                  <div class="content">
                    <div class="header">
                      <button id="ups" class="ui right labeled icon button">
                        注册
                        <i class="right arrow icon"></i>
                      </button>
                    </div>
                  </div>
                  <div class="content">
                    <h1 class="ui center aligned header"><i class="ri-login-circle-line"></i></h1>
                    <form id="verifyLogin" class="ui form" novalidate>
                      <div class="field">
                        <label><i class="ri-account-pin-circle-line"></i></label>
                        <input name="account" placeholder="账户" type="text">
                      </div>
                      <div class="field">
                        <label><i class="ri-lock-password-line"></i></label>
                        <input name="passwordLogin" placeholder="密码" type="password">
                        <div class="ui horizontal divider">OR</div>
                        <a href="#" style="color: red">忘记密码</a>
                      </div>
                      <div class="inline fields">
                        <input id="equal" name="codeL" placeholder="人机验证码" type="text">
                        <canvas id="myCanvas" height="35" style="border:1px solid blue" width="70"></canvas>
                      </div>
                    </form>
                  </div>
                  <div class="extra content">
                    <div id="login" class="ui animated button" tabindex="0">
                      <div class="visible content">登录</div>
                      <div class="hidden content">
                        <i class="ri-login-circle-fill"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="side">
                <div class="ui card">
                  <div class="content">
                    <div class="header">
                      <button id="downs" class="ui labeled labeled icon button">
                        登录
                        <i class="left arrow icon"></i>
                      </button>
                    </div>
                  </div>
                  <div class="content">
                    <h1 class="ui center aligned header"><i class="ri-registered-line"></i></h1>
                    <form id="verifyRegister" class="ui form" novalidate>
                      <div class="field">
                        <label><i class="ri-mail-send-line"></i></label>
                        <input name="email" placeholder="Email" type="email">
                      </div>
                      <div class="field">
                        <label><i class="ri-shield-user-fill"></i></label>
                        <input name="username" placeholder="用户名" type="text">
                      </div>
                      <div class="inline fields">
                        <label>
                          <i class="ri-men-line"></i>
                          性别
                          <i class="ri-women-line"></i>
                        </label>
                        <div class="field">
                          <div class="ui radio checkbox">
                            <input name="sex" type="radio" value="男">
                            <label>男</label>
                          </div>
                        </div>
                        <div class="field">
                          <div class="ui radio checkbox">
                            <input name="sex" type="radio" value="女">
                            <label>女</label>
                          </div>
                        </div>
                        <div class="field">
                          <div class="ui radio checkbox">
                            <input checked name="sex" type="radio" value="保密">
                            <label>保密</label>
                          </div>
                        </div>
                      </div>
                      <div class="field">
                        <label><i class="ri-lock-password-line"></i></label>
                        <input id="password" name="password" placeholder="密码" type="password">
                      </div>
                      <div class="field">
                        <input name="confirmPassword" placeholder="确认密码" type="password">
                      </div>
                      <div class="field">
                        <div class="inline field">
                          <!--                                                <div class="ui checkbox">-->
                          <label>
                            <a href="#" style="color: orange">法律条款</a>
                            <span>|</span>
                            <span>我同意上述条款以及条件</span>
                            <input name="terms" type="checkbox">
                          </label>
                          <!--                                                </div>-->
                        </div>
                      </div>
                      <div class="inline fields">
                        <input id="equalR" name="codeR" placeholder="人机验证码" type="text">
                        <canvas id="myCanvasR" height="35" style="border:1px solid blue" width="70"></canvas>
                      </div>
                    </form>
                  </div>
                  <div class="extra content">
                    <div id="register" class="ui animated button" tabindex="0">
                      <div class="visible content">注册</div>
                      <div class="hidden content">
                        <i class="ri-registered-fill"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--    </div>-->
        </div>
      </div>
    </nav>
    <a id="up" class="circular ui button" href="#top"><i class="ri-upload-line"></i></a>
  </header>
  <router-view></router-view>
</template>

<script>
import axios from 'axios'
import $ from "jquery";
import qs from "qs";

export default {
  data() {
    return {
      panel: false
    }
  },
  mounted() {
    const config = {
      baseURL: process.env.VUE_APP_backend_url,
      method: 'get',
      url: '/api/userAccess/userAuth',
      withCredentials: true // 允许携带cookie
    };
    axios(config)
        .then(response => {
          return this.panel = response.data
        })
        .catch(function (error) {
          console.log(error);
        });
  },
  methods: {
    Logout() {
      var config = {
        baseURL: process.env.VUE_APP_backend_url,
        method: 'post',
        url: '/servletLogout',
        withCredentials: true // 允许携带cookie
      };
      axios(config)
          .then(response => {
            alert(response.data);
            if (response.data === '登出成功\r\n') {
              location.reload();
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    PublishInfo() {
      const password = $("#infoPassword").val();
      const topic = $("#infoTopic").val();
      const value = $("#infoValue").val();
      const today = new Date();
      const y = today.getFullYear();
      const month = today.getMonth() + 1;
      const td = today.getDate();
      const h = today.getHours();
      const m = today.getMinutes();
      const s = today.getSeconds();
      const datetime = y + '-' + month + '-' + td + ' ' + h + ':' + m + ':' + s;
      if (password !== '' && topic !== '' && value !== '' && datetime !== '') {
        let data = qs.stringify({
          'password': password,
          'infoTopic': topic,
          'infoValue': value,
          'create': datetime
        });
        let config = {
          baseURL: process.env.VUE_APP_backend_url,
          method: 'post',
          url: '/api/info/publish',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: data,
          withCredentials: true // 允许携带cookie
        };
        axios(config)
            .then(response => {
              alert(response.data);
              if (response.data === '发表信息成功') {
                location.reload();
              }
            })
            .catch(function (error) {
              console.log(error);
            });
      } else {
        alert("请填写表单中的所有内容");
      }
    },
    PublishSecret() {
      const password = $("#secretPassword").val();
      const topic = $("#secretTopic").val();
      const value = $("#secretValue").val();
      const today = new Date();
      const y = today.getFullYear();
      const month = today.getMonth() + 1;
      const td = today.getDate();
      const h = today.getHours();
      const m = today.getMinutes();
      const s = today.getSeconds();
      const datetime = y + '-' + month + '-' + td + ' ' + h + ':' + m + ':' + s;
      if (password !== '' && topic !== '' && value !== '' && datetime !== '') {
        let data = qs.stringify({
          'password': password,
          'Topic': topic,
          'Value': value,
          'create': datetime
        });
        let config = {
          baseURL: process.env.VUE_APP_backend_url,
          method: 'post',
          url: '/api/secrets/sent',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: data,
          withCredentials: true // 允许携带cookie
        };
        axios(config)
            .then(response => {
              alert(response.data);
              if (response.data === '发表机密信息成功') {
                location.reload();
              }
            })
            .catch(function (error) {
              console.log(error);
            });
      } else {
        alert("请填写表单中的所有内容");
      }
    }
  }
}
</script>

