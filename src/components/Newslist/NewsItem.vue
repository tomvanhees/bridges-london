<template>
  <transition name="slide-right" appear>
    <article class="news-item">
      <news-item-header></news-item-header>
      <figure class="image-container">
        <img :src="imageUrl" alt="" />

        <div class="close-button" @click="$store.commit('news/closeShowItem')">
          <img src="../../assets/images/close_button.svg" alt="" />
        </div>
      </figure>
      <div class="content-container">
        <header>
          <h1 class="title">{{ item.title }}</h1>
          <h2 class="date">{{ item.formattedCreatedAt }}</h2>
          <h3 v-if="item.hasBeenUpdated">
            Laatst gewijzigd op {{ item.formattedUpdatedAt }}
          </h3>
        </header>
        <section>
          <p class="description" v-html="item.description"></p>
        </section>
      </div>
    </article>
  </transition>
</template>

<script>
import NewsItemHeader from "./NewsItemHeader.vue";

export default {
  name: "NewsItem",
  components: {
    NewsItemHeader
  },
  data() {
    return {
      imageUrl: ""
    };
  },
  watch: {
    item() {
      this.getImageUrl();
    }
  },
  computed: {
    item() {
      return this.$store.state.news.selectedNewsItem;
    }
  },
  methods: {
    getImageUrl() {
      this.item.getimageUrl().then(response => {
        this.imageUrl = response;
      });
    }
  },
  created() {
    this.getImageUrl();
  }
};
</script>
