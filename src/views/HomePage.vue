<template>
  <template v-if="InfoTopic === 'NONE'">
    <h1>{{ InfoTopic }}</h1>
  </template>
  <template v-else>
    <div class="ui grid container">
      <template v-for="info in InfoTopic" v-bind:key="info.infoId">
        <div class="sixteen wide mobile eight wide tablet four wide computer column">
          <div class="ui card">
            <div class="extra content">
              <div class="center aligned author" style="color: green">{{ info.userName }}</div>
            </div>
            <div class="content">
              <div class="center aligned header">{{ info.infoTopic }}</div>
              <div class="center aligned description">
                <p>创建时间:{{ info.create }}</p>
                <p>更新时间:{{ info.update }}</p>
              </div>
            </div>
            <div class="content">
              <div class="center aligned author">
                <div class="ui inverted segment">
                  <router-link :to="{ path: '/details', query: { infoId: info.infoId }}">
                    <button class="ui inverted primary button">详情</button>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </template>
</template>


<script>

import axios from "axios";

export default {
  name: "HomePage",
  data() {
    return {
      InfoTopic: "NONE"
    }
  },
  mounted() {
    let config = {
      baseURL: process.env.VUE_APP_backend_url,
      method: 'get',
      url: '/api/info/access',
    };
    axios(config)
        .then(response => {
          if (Object.keys(response.data).length !== 0) {
            this.InfoTopic = response.data
          }
        })
        .catch(function (error) {
          console.log(error);
        });
  }
}
</script>