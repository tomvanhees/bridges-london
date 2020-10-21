<template>
  <div id="app">
    <div class="main-container">
      <header class="header-container">
        <bl-header
          v-on:toggleNewsMenu="showNewsMenu = !showNewsMenu"
        ></bl-header>
      </header>

      <aside class="news-list-container" :class="{ active: showNewsMenu }">
        <newslist-header v-on:close="showNewsMenu = false"></newslist-header>
        <ul class="news-list">
          <news-list-item
            :item="newsItem"
            :key="`newsitem_index_${index}`"
            v-for="(newsItem, index) in $store.state.news.items"
          ></news-list-item>
        </ul>
      </aside>
      <main>
        <bl-map></bl-map>
        <connection-information-container></connection-information-container>
        <mobile-connection-information
          v-if="$store.state.connections.activeConnection !== null"
        />
      </main>

      <expended-news-item
        v-if="$store.state.news.showNewsItem"
      ></expended-news-item>
    </div>
  </div>
</template>

<script lang="ts">
import "@/style/style.scss";
import Vue from "vue";
import Header from "@/components/layout/Header.vue";
import { APIConnection } from "@/service/APIConnection";
import { Bridge } from "@/classes/Bridge";
import NewsListItem from "@/components/Newslist/NewsListItem.vue";
import BlMap from "@/components/layout/BlMap.vue";
import ExpendedNewsItem from "@/components/Newslist/NewsItem.vue";
import { MapBoxGlMap } from "@/classes/MapBoxGlMap";
import { NewsItem } from "@/classes/NewsItem";
import { NewsItemResponseInterface } from "@/classes/NewsItem.interface";
import { BrideResponseInterface } from "@/classes/Bridge.interface";
import ConnectionInformationContainer from "@/components/BridgeInformation/ConnectionInformationContainer.vue";
import NewslistHeader from "@/components/Newslist/NewslistHeader.vue";
import MobileConnectionInformation from "@/components/BridgeInformation/MobileConnectionInformation.vue";
import { WarningItem } from "@/classes/Warnings/WarningItem";

export default Vue.extend({
  name: "App",
  components: {
    "bl-header": Header,
    ExpendedNewsItem,
    NewsListItem,
    BlMap,
    ConnectionInformationContainer,
    NewslistHeader,
    MobileConnectionInformation
  },
  data() {
    return {
      showNewsMenu: false
    };
  },
  methods: {
    initConnections() {
      this.fetchConnections().then(() => {
        this.addBridgesToMap();
      });
    },
    fetchConnections() {
      return new Promise((resolve, reject) => {
        APIConnection.getConnections()
          .then(response => {
            const mappedConnections = response.data.map(
              (bridge: BrideResponseInterface) => new Bridge(bridge)
            );
            this.$store.dispatch(
              "connections/setConnections",
              mappedConnections
            );
            resolve();
          })
          .catch(error => {
            console.log(error);
            reject();
          });
      });
    },
    addBridgesToMap() {
      const map = MapBoxGlMap.getInstace();
      map.addBridgesToMap(this.$store.state.connections.items);
    },
    fetchNews() {
      APIConnection.getNews().then(response => {
        const mappedNewsItems = response.data.map(
          (news: NewsItemResponseInterface) => new NewsItem(news)
        );
        this.$store.dispatch("news/setItems", mappedNewsItems);
      });
    },
    fetchWarning() {
      APIConnection.getSettings().then(response => {
        this.$store.dispatch(
          "connections/setWarning",
          new WarningItem(response.data)
        );
      });
    }
  },
  mounted() {
    MapBoxGlMap.getInstace();
  },
  created() {
    this.initConnections();
    this.fetchNews();
    this.fetchWarning();
  }
});
</script>
