<template>
  <section>
    <div class="ui grid">
      <div class="sixteen wide mobile three wide tablet three wide computer column">
        <div id="mu" class="ui vertical fluid tabular menu">
          <a class="item active its" data-tab="one">个人信息</a>
          <a class="item its" data-tab="two">密钥</a>
          <a class="item its" data-tab="three">管理信息</a>
        </div>
      </div>
      <div class="sixteen wide mobile thirteen wide tablet thirteen wide computer column">
        <div class="ui tab segment active" data-tab="one">
          <template v-if="infoContents === 'None'">
            <button id="confirm" class="fluid massive ui button">显示信息</button>
            <div id="confirmPassword" class="ui mini modal">
              <div class="header">请输入密码</div>
              <div class="content">
                <div class="ui fluid input">
                  <input id="passwordConfirm" placeholder="密码" type="password">
                </div>
              </div>
              <div class="actions">
                <div class="ui green ok button" @click="ShowInfo">确认</div>
                <div class="ui red cancel button">取消</div>
              </div>
            </div>
          </template>
          <template v-else>
            <h3 class="ui olive header">个性签名</h3>
            <div class="ui teal message">
              {{ infoContents.intro }}
            </div>
            <div id="updateIntro" class="ui right floated button"><i class="ri-edit-circle-fill"></i><br>签名或修改</div>
            <component :is="'script'">
              $("#updateIntro").click(function () {
              $('#introUpdate').modal('setting', 'closable', false).modal('show')
              });
            </component>
            <div id="introUpdate" class="ui mini modal">
              <div class="header">请输入个性签名</div>
              <div class="content">
                <div class="ui fluid input">
                  <input id="passwordConfirmIntro" placeholder="密码" type="password">
                </div>
                <hr>
                <div class="ui fluid">
                  <form class="ui reply form">
                    <div class="field">
                      <textarea id="Intro" placeholder="个性签名"></textarea>
                    </div>
                  </form>
                </div>
              </div>
              <div class="actions">
                <div class="ui green ok button" @click="UpdateIntro">确认</div>
                <div class="ui red cancel button">取消</div>
              </div>
            </div>
            <div class="ui cards fluid">
              <div class="card">
                <div class="content">
                  <div class="header">用户名</div>
                  <div class="description"><h1 class="ui violet header">{{ infoContents.name }}</h1></div>
                </div>
                <div id="updateName" class="ui bottom attached button"><i class="ri-edit-circle-fill"></i><br>修改</div>
                <component :is="'script'">
                  $("#updateName").click(function () {
                  $('#nameUpdate').modal('setting', 'closable', false).modal('show')
                  });
                </component>
                <div id="nameUpdate" class="ui mini modal">
                  <div class="header">请输入用户名</div>
                  <div class="content">
                    <div class="ui fluid input">
                      <input id="passwordConfirmName" placeholder="密码" type="password">
                    </div>
                    <hr>
                    <div class="ui fluid input">
                      <input id="Name" placeholder="用户名" type="text">
                    </div>
                  </div>
                  <div class="actions">
                    <div class="ui green ok button" @click="UpdateName">确认</div>
                    <div class="ui red cancel button">取消</div>
                  </div>
                </div>
              </div>
              <div class="card">
                <div class="content">
                  <div class="header">性别</div>
                  <div class="description"><h1 class="ui violet header">{{ infoContents.sex }}</h1></div>
                </div>
                <div id="updateSex" class="ui bottom attached button"><i class="ri-edit-circle-fill"></i><br>修改</div>
                <component :is="'script'">
                  $("#updateSex").click(function () {
                  $('#sexUpdate').modal('setting', 'closable', false).modal('show')
                  });
                </component>
                <div id="sexUpdate" class="ui mini modal">
                  <div class="header">请选择性别</div>
                  <div class="content">
                    <div class="ui fluid input">
                      <input id="passwordConfirmSex" placeholder="密码" type="password">
                    </div>
                    <hr>
                    <div class="ui form">
                      <div class="inline fields">
                        <div class="field">
                          <div class="ui radio checkbox">
                            <input checked="checked" name="Sex" type="radio" value="保密">
                            <label>保密</label>
                          </div>
                        </div>
                        <div class="field">
                          <div class="ui radio checkbox">
                            <input name="Sex" type="radio" value="男">
                            <label>男</label>
                          </div>
                        </div>
                        <div class="field">
                          <div class="ui radio checkbox">
                            <input name="Sex" type="radio" value="女">
                            <label>女</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="actions">
                    <div class="ui green ok button" @click="UpdateSex">确认</div>
                    <div class="ui red cancel button">取消</div>
                  </div>
                </div>
              </div>
              <div class="card">
                <div class="content">
                  <div class="header">Email账户</div>
                  <div class="description"><h1 class="ui violet header">{{ infoContents.email }}</h1></div>
                </div>
                <div id="updateEmail" class="ui bottom attached button"><i class="ri-edit-circle-fill"></i><br>修改</div>
                <component :is="'script'">
                  $("#updateEmail").click(function () {
                  $('#emailUpdate').modal('setting', 'closable', false).modal('show')
                  });
                </component>
                <div id="emailUpdate" class="ui mini modal">
                  <div class="header">请输入邮件地址</div>
                  <div class="content">
                    <div class="ui fluid input">
                      <input id="passwordConfirmEmail" placeholder="密码" type="password">
                    </div>
                    <hr>
                    <div class="ui fluid input">
                      <input id="Email" placeholder="邮件地址" type="email">
                    </div>
                  </div>
                  <div class="actions">
                    <div class="ui green ok button" @click="UpdateEmail">确认</div>
                    <div class="ui red cancel button">取消</div>
                  </div>
                </div>
              </div>
              <div class="card">
                <div class="content">
                  <div class="header">原密码</div>
                  <div class="description">
                    <div class="ui fluid input">
                      <input id="oldPassword" placeholder="原密码" type="password">
                    </div>
                  </div>
                  <hr>
                  <div class="header">新密码</div>
                  <div class="description">
                    <div class="ui fluid input">
                      <input id="newPassword" placeholder="新密码" type="password">
                    </div>
                  </div>
                  <hr>
                  <div class="header">确认新密码</div>
                  <div class="description">
                    <div class="ui fluid input">
                      <input id="newPasswordConfirm" placeholder="确认新密码" type="password">
                    </div>
                  </div>
                </div>
                <div class="ui bottom attached button" @click="UpdatePassword"><i class="ri-edit-circle-fill"></i><br>修改
                </div>
              </div>
            </div>
            <table class="ui inverted green table">
              <thead>
              <tr>
                <th>创建时间</th>
                <th>更新时间</th>
                <th>注销账户</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>{{ infoContents.create }}</td>
                <td>{{ infoContents.update }}</td>
                <td>
                  <button id="updateStatus" class="ui red basic button">注销</button>
                </td>
              </tr>
              </tbody>
              <component :is="'script'">
                $("#updateStatus").click(function () {
                $('#statusUpdate').modal('setting', 'closable', false).modal('show')
                });
              </component>
              <div id="statusUpdate" class="ui mini modal">
                <div class="header" style="color: red">请输入密码确认注销</div>
                <div class="content">
                  <div class="ui fluid input">
                    <input id="passwordConfirmStatus" placeholder="密码" type="password">
                  </div>
                </div>
                <div class="actions">
                  <div class="ui green ok button" @click="UpdateStatus">确认</div>
                  <div class="ui red cancel button">取消</div>
                </div>
              </div>
            </table>
          </template>
        </div>
        <div class="ui tab segment" data-tab="two">
          <template v-if="codeContents === 'NONE'">
            <button id="confirmCode" class="fluid massive ui button">显示密钥</button>
            <div id="codeConfirm" class="ui mini modal">
              <div class="header">请输入密码</div>
              <div class="content">
                <div class="ui fluid input">
                  <input id="passwordCode" placeholder="密码" type="password">
                </div>
              </div>
              <div class="actions">
                <div class="ui green ok button" @click="ShowCode">确认</div>
                <div class="ui red cancel button">取消</div>
              </div>
            </div>
            <component :is="'script'">
              $("#confirmCode").click(function () {
              $('#codeConfirm').modal('setting', 'closable', false).modal('show')
              });
            </component>
          </template>
          <template v-else-if="codeContents === 'Empty'">
            <div class="ui inverted segment">
              <button id="createKey" class="ui inverted violet button">生成密钥</button>
            </div>
            <div class="ui card fluid">
              <h1 class="ui center aligned icon header" style="color: red"><i class="ri-close-line"></i>
                <p>无私钥与公钥</p></h1>
            </div>
            <div id="keyCreate" class="ui mini modal">
              <div class="header">请输入密码</div>
              <div class="content">
                <div class="ui fluid input">
                  <input id="keyPassword" placeholder="密码" type="password">
                </div>
              </div>
              <div class="actions">
                <div class="ui green ok button" @click="CreateCode">确认</div>
                <div class="ui red cancel button">取消</div>
              </div>
            </div>
            <component :is="'script'">
              $("#createKey").click(function () {
              $('#keyCreate').modal('setting', 'closable', false).modal('show')
              });
            </component>
          </template>
          <template v-else>
            <div class="ui inverted segment">
              <button id="revisitKey" class="ui inverted violet button">重新生成密钥</button>
              <button id="deleteKey" class="ui right floated inverted red button">删除</button>
            </div>
            <div class="ui raised segment">
              <h3 class="ui header">私钥</h3>
              <p style="word-break:break-all">{{ codeContents.codePrivatekey }}</p>
            </div>
            <div class="ui raised segment">
              <h3 class="ui header">公钥</h3>
              <p style="word-break:break-all">{{ codeContents.codePublickey }}</p>
            </div>
            <div class="ui stacked segments">
              <div class="ui segment">
                <p>创建时间:{{ codeContents.createdTime }}</p>
              </div>
              <div class="ui segment">
                <p>更新时间:{{ codeContents.updatedTime }}</p>
              </div>
            </div>
            <div id="keyRevisit" class="ui mini modal">
              <div class="header">请输入密码</div>
              <div class="content">
                <div class="ui fluid input">
                  <input id="revisitPassword" placeholder="密码" type="password">
                </div>
              </div>
              <div class="actions">
                <div class="ui green ok button" @click="RevisitCode">确认</div>
                <div class="ui red cancel button">取消</div>
              </div>
            </div>
            <div id="keyDelete" class="ui mini modal">
              <div class="header">请输入密码</div>
              <div class="content">
                <div class="ui fluid input">
                  <input id="deletePassword" placeholder="密码" type="password">
                </div>
              </div>
              <div class="actions">
                <div class="ui green ok button" @click="DeleteCode">确认</div>
                <div class="ui red cancel button">取消</div>
              </div>
            </div>
            <component :is="'script'">
              $("#revisitKey").click(function () {
              $('#keyRevisit').modal('setting', 'closable', false).modal('show')
              });
              $("#deleteKey").click(function () {
              $('#keyDelete').modal('setting', 'closable', false).modal('show')
              });
            </component>
          </template>
        </div>
        <div class="ui tab segment" data-tab="three">
          <div class="ui two column very relaxed grid">
            <div class="column">
              <p class="ui blue tag label">公开信息</p>
              <template v-if="managementInfo === 'NONE'">
                <button id="showInfo" class="fluid massive ui button">显示公开信息</button>
                <div id="infoShow" class="ui mini modal">
                  <div class="header">请输入密码</div>
                  <div class="content">
                    <div class="ui fluid input">
                      <input id="passwordInfo" placeholder="密码" type="password">
                    </div>
                  </div>
                  <div class="actions">
                    <div class="ui green ok button" @click="InfoManagement">确认</div>
                    <div class="ui red cancel button">取消</div>
                  </div>
                </div>
                <component :is="'script'">
                  $("#showInfo").click(function () {
                  $('#infoShow').modal('setting', 'closable', false).modal('show')
                  });
                </component>
              </template>
              <template v-for="info in managementInfo" v-else :key="info.info_id">
                <div class="ui stacked segments">
                  <div class="ui green segment">
                    <div class="ui raised segments">
                      <div class="ui segment">
                        <span>创建时间:{{ info.create }}</span>
                      </div>
                      <div class="ui segment">
                        <span>更新时间:{{ info.update }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="ui blue segment">
                    <h3 class="ui header">{{ info.info_topic }}</h3>
                    <p style="word-break:break-all">{{ info.info_value }}</p>
                  </div>
                  <div class="ui blue segment">
                    <button class="ui negative basic button" @click="DeleteInfo($event)">删除</button>
                    <div class="ui label">ID~{{ info.info_id }}</div>
                  </div>
                </div>
              </template>
            </div>
            <div class="column">
              <p class="ui yellow tag label">机密信息</p>
              <template v-if="managementSecret === 'NONE'">
                <button id="showSecret" class="fluid massive ui button">显示机密信息</button>
                <div id="secretShow" class="ui mini modal">
                  <div class="header">请输入密码</div>
                  <div class="content">
                    <div class="ui fluid input">
                      <input id="passwordSecret" placeholder="密码" type="password">
                    </div>
                  </div>
                  <div class="actions">
                    <div class="ui green ok button" @click="SecretManagement">确认</div>
                    <div class="ui red cancel button">取消</div>
                  </div>
                </div>
                <component :is="'script'">
                  $("#showSecret").click(function () {
                  $('#secretShow').modal('setting', 'closable', false).modal('show')
                  });
                </component>
              </template>
              <template v-for="secret in managementSecret" v-else :key="secret.secrets_id">
                <div class="ui stacked segments">
                  <div class="ui green segment">
                    <div class="ui raised segments">
                      <div class="ui segment">
                        <span>创建时间:{{ secret.create }}</span>
                      </div>
                      <div class="ui segment">
                        <span>更新时间:{{ secret.update }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="ui yellow segment">
                    <h3 class="ui header">签名</h3>
                    <p style="word-break:break-all">{{ secret.secrets_signature }}</p>
                  </div>
                  <div class="ui yellow segment">
                    <h3 class="ui header">{{ secret.secrets_topic }}</h3>
                    <p style="word-break:break-all">{{ secret.secrets_value }}</p>
                  </div>
                  <div class="ui yellow segment">
                    <button class="ui negative basic button" @click="DeleteSecret($event)">删除</button>
                    <div class="ui label">ID~{{ secret.secrets_id }}</div>
                  </div>
                </div>
              </template>
            </div>
          </div>
          <div class="ui vertical divider">
            管理
          </div>
        </div>
      </div>
    </div>
  </section>
  <component :is="'script'">
    $('#mu .its').tab();
    $("#confirm").click(function () {
    $('#confirmPassword').modal('setting', 'closable', false).modal('show')
    });
  </component>
</template>

<script>
import axios from "axios";
import qs from 'qs';
import $ from 'jquery';

export default {
  name: "ControlPanel",
  data() {
    return {
      infoContents: "None",
      codeContents: "NONE",
      managementInfo: "NONE",
      managementSecret: "NONE"
    }
  },
  methods: {
    ShowInfo() {
      const passwordConfirm = $("#passwordConfirm").val();
      let data = qs.stringify({
        'password': passwordConfirm
      });
      let config = {
        baseURL: process.env.VUE_APP_backend_url,
        method: 'post',
        url: '/api/userAccess/userInfo',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data,
        withCredentials: true // 允许携带cookie
      };
      axios(config)
          .then(response => {
            if (response.data === '密码错误') {
              alert('密码错误')
            } else {
              return this.infoContents = response.data
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    UpdatePassword() {
      const oldPassword = $("#oldPassword").val();
      const newPassword = $("#newPassword").val();
      const newPasswordConfirm = $("#newPasswordConfirm").val();
      const today = new Date();
      const y = today.getFullYear();
      const month = today.getMonth() + 1;
      const td = today.getDate();
      const h = today.getHours();
      const m = today.getMinutes();
      const s = today.getSeconds();
      const datetime = y + '-' + month + '-' + td + ' ' + h + ':' + m + ':' + s;
      let flag = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,}$/.test(newPassword.replace(/\s*/g, ""));
      if (newPassword === newPasswordConfirm && flag) {
        let data = qs.stringify({
          'password': oldPassword,
          'newPassword': newPasswordConfirm,
          'update': datetime
        });
        let config = {
          baseURL: process.env.VUE_APP_backend_url,
          method: 'post',
          url: '/api/userUpdate/passwordUpdate',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: data,
          withCredentials: true // 允许携带cookie
        };
        axios(config)
            .then(response => {
              alert(response.data)
              if (response.data === '更新密码成功') {
                location.reload()
              }
            })
            .catch(function (error) {
              console.log(error);
            });
      } else {
        alert("新密码前后确认不一致或者您的密码不满足至少包含数字与字母且密码总长度不小于6位")
      }
    },
    UpdateName() {
      const Password = $("#passwordConfirmName").val();
      const Name = $("#Name").val();
      const today = new Date();
      const y = today.getFullYear();
      const month = today.getMonth() + 1;
      const td = today.getDate();
      const h = today.getHours();
      const m = today.getMinutes();
      const s = today.getSeconds();
      const datetime = y + '-' + month + '-' + td + ' ' + h + ':' + m + ':' + s;
      let data = qs.stringify({
        'password': Password,
        'name': Name,
        'update': datetime
      });
      let config = {
        baseURL: process.env.VUE_APP_backend_url,
        method: 'post',
        url: '/api/userUpdate/nameUpdate',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data,
        withCredentials: true // 允许携带cookie
      };
      axios(config)
          .then(response => {
            alert(response.data);
            if (response.data === '更新用户名成功') {
              location.reload();
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    UpdateSex() {
      const Password = $("#passwordConfirmSex").val();
      const Sex = $("input[name='Sex']:checked").val();
      const today = new Date();
      const y = today.getFullYear();
      const month = today.getMonth() + 1;
      const td = today.getDate();
      const h = today.getHours();
      const m = today.getMinutes();
      const s = today.getSeconds();
      const datetime = y + '-' + month + '-' + td + ' ' + h + ':' + m + ':' + s;
      let data = qs.stringify({
        'password': Password,
        'sex': Sex,
        'update': datetime
      });
      let config = {
        baseURL: process.env.VUE_APP_backend_url,
        method: 'post',
        url: '/api/userUpdate/sexUpdate',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data,
        withCredentials: true // 允许携带cookie
      };
      axios(config)
          .then(response => {
            alert(response.data);
            if (response.data === '更新性别成功') {
              location.reload();
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    UpdateEmail() {
      const Password = $("#passwordConfirmEmail").val();
      const Email = $("#Email").val();
      const today = new Date();
      const y = today.getFullYear();
      const month = today.getMonth() + 1;
      const td = today.getDate();
      const h = today.getHours();
      const m = today.getMinutes();
      const s = today.getSeconds();
      const datetime = y + '-' + month + '-' + td + ' ' + h + ':' + m + ':' + s;
      let data = qs.stringify({
        'password': Password,
        'email': Email,
        'update': datetime
      });
      let config = {
        baseURL: process.env.VUE_APP_backend_url,
        method: 'post',
        url: '/api/userUpdate/emailUpdate',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data,
        withCredentials: true // 允许携带cookie
      };
      axios(config)
          .then(response => {
            alert(response.data);
            if (response.data === '更新Email成功') {
              location.reload();
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    UpdateIntro() {
      const Password = $("#passwordConfirmIntro").val();
      const Intro = $("#Intro").val();
      const today = new Date();
      const y = today.getFullYear();
      const month = today.getMonth() + 1;
      const td = today.getDate();
      const h = today.getHours();
      const m = today.getMinutes();
      const s = today.getSeconds();
      const datetime = y + '-' + month + '-' + td + ' ' + h + ':' + m + ':' + s;
      let data = qs.stringify({
        'password': Password,
        'intro': Intro,
        'update': datetime
      });
      let config = {
        baseURL: process.env.VUE_APP_backend_url,
        method: 'post',
        url: '/api/userUpdate/introUpdate',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data,
        withCredentials: true // 允许携带cookie
      };
      axios(config)
          .then(response => {
            alert(response.data);
            if (response.data === '更新个人签名成功') {
              location.reload();
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    UpdateStatus() {
      const passwordConfirmStatus = $("#passwordConfirmStatus").val();
      const today = new Date();
      const y = today.getFullYear();
      const month = today.getMonth() + 1;
      const td = today.getDate();
      const h = today.getHours();
      const m = today.getMinutes();
      const s = today.getSeconds();
      const datetime = y + '-' + month + '-' + td + ' ' + h + ':' + m + ':' + s;
      let data = qs.stringify({
        'password': passwordConfirmStatus,
        'update': datetime
      });
      let config = {
        baseURL: process.env.VUE_APP_backend_url,
        method: 'post',
        url: '/api/userUpdate/statusUpdate',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data,
        withCredentials: true // 允许携带cookie
      };
      axios(config)
          .then(response => {
            alert(response.data);
            if (response.data === '注销成功(我们会继续保存您的账户请牢记您现在的密码与账户,感谢您使用我们的服务,期待您的回归)') {
              location.reload();
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    ShowCode() {
      const password = $("#passwordCode").val();
      let data = qs.stringify({
        'password': password
      });
      let config = {
        baseURL: process.env.VUE_APP_backend_url,
        method: 'post',
        url: '/api/code/gainKey',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data,
        withCredentials: true // 允许携带cookie
      };
      axios(config)
          .then(response => {
            if (response.data === '密码错误') {
              alert('密码错误')
            } else {
              return this.codeContents = response.data
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    CreateCode() {
      const Password = $("#keyPassword").val();
      const today = new Date();
      const y = today.getFullYear();
      const month = today.getMonth() + 1;
      const td = today.getDate();
      const h = today.getHours();
      const m = today.getMinutes();
      const s = today.getSeconds();
      const datetime = y + '-' + month + '-' + td + ' ' + h + ':' + m + ':' + s;
      let data = qs.stringify({
        'password': Password,
        'create': datetime
      });
      let config = {
        baseURL: process.env.VUE_APP_backend_url,
        method: 'post',
        url: '/api/code/keyGeneration',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data,
        withCredentials: true // 允许携带cookie
      };
      axios(config)
          .then(response => {
            alert(response.data);
            if (response.data === '私钥与公钥生成成功') {
              location.reload();
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    RevisitCode() {
      const Password = $("#revisitPassword").val();
      const today = new Date();
      const y = today.getFullYear();
      const month = today.getMonth() + 1;
      const td = today.getDate();
      const h = today.getHours();
      const m = today.getMinutes();
      const s = today.getSeconds();
      const datetime = y + '-' + month + '-' + td + ' ' + h + ':' + m + ':' + s;
      let data = qs.stringify({
        'password': Password,
        'create': datetime
      });
      let config = {
        baseURL: process.env.VUE_APP_backend_url,
        method: 'post',
        url: '/api/code/keyGeneration',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data,
        withCredentials: true // 允许携带cookie
      };
      axios(config)
          .then(response => {
            alert(response.data);
            if (response.data === '私钥与公钥生成成功') {
              location.reload();
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    DeleteCode() {
      const Password = $("#deletePassword").val();
      const today = new Date();
      const y = today.getFullYear();
      const month = today.getMonth() + 1;
      const td = today.getDate();
      const h = today.getHours();
      const m = today.getMinutes();
      const s = today.getSeconds();
      const datetime = y + '-' + month + '-' + td + ' ' + h + ':' + m + ':' + s;
      let data = qs.stringify({
        'password': Password,
        'create': datetime
      });
      let config = {
        baseURL: process.env.VUE_APP_backend_url,
        method: 'post',
        url: '/api/code/deleteKey',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data,
        withCredentials: true // 允许携带cookie
      };
      axios(config)
          .then(response => {
            alert(response.data);
            if (response.data === '删除密钥成功') {
              location.reload();
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    InfoManagement() {
      const password = $("#passwordInfo").val();
      if (password !== null) {
        let data = qs.stringify({
          'password': password
        });
        let config = {
          baseURL: process.env.VUE_APP_backend_url,
          method: 'post',
          url: '/api/management/info',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: data,
          withCredentials: true // 允许携带cookie
        };
        axios(config)
            .then(response => {
              if (response.data === '密码错误') {
                alert('密码错误')
              } else {
                return this.managementInfo = response.data
              }
            })
            .catch(function (error) {
              console.log(error);
            });
      } else {
        alert("请填写密码")
      }
    },
    SecretManagement() {
      const password = $("#passwordSecret").val();
      if (password !== null) {
        let data = qs.stringify({
          'password': password
        });
        let config = {
          baseURL: process.env.VUE_APP_backend_url,
          method: 'post',
          url: '/api/management/secret',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: data,
          withCredentials: true // 允许携带cookie
        };
        axios(config)
            .then(response => {
              if (response.data === '密码错误') {
                alert('密码错误')
              } else {
                return this.managementSecret = response.data
              }
            })
            .catch(function (error) {
              console.log(error);
            });
      } else {
        alert("请填写密码")
      }
    },
    DeleteInfo(event) {
      let textContent = event.currentTarget.nextElementSibling.textContent.split("~")[1];
      if (textContent !== null) {
        let data = qs.stringify({
          infoId: textContent
        });
        let config = {
          baseURL: process.env.VUE_APP_backend_url,
          method: 'post',
          url: '/api/management/infoDelete',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: data,
          withCredentials: true // 允许携带cookie
        };
        axios(config)
            .then(response => {
              alert(response.data);
              if (response.data === '删除成功') {
                location.reload();
              }
            })
            .catch(function (error) {
              console.log(error);
            });
      }
    },
    DeleteSecret(event) {
      let textContent = event.currentTarget.nextElementSibling.textContent.split("~")[1];
      if (textContent !== null) {
        let data = qs.stringify({
          secretId: textContent
        });
        let config = {
          baseURL: process.env.VUE_APP_backend_url,
          method: 'post',
          url: '/api/management/secretDelete',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: data,
          withCredentials: true // 允许携带cookie
        };
        axios(config)
            .then(response => {
              alert(response.data);
              if (response.data === '删除成功') {
                location.reload();
              }
            })
            .catch(function (error) {
              console.log(error);
            });
      }
    }
  }
}
</script>