<template>
  <li class="list-item" @click="showNewsItem">
    <div class="list-item-sidebar" :class="{ active: isSelected }"></div>
    <div class="list-item-container">
      <figure>
        <img :src="imageUrl" alt="" />
      </figure>
      <section>
        <h1 class="title">{{ item.title }}</h1>
        <h2 class="date">{{ item.formattedCreatedAt }}</h2>
        <p class="description" v-html="item.truncatedDescription"></p>
      </section>
      <figure class="icon">
        <img :src="getIcon('ANGLE_RIGHT')" alt="" />
      </figure>
    </div>
  </li>
</template>

<script>
import { IconsService } from "@/service/IconsService";

export default {
  name: "NewsListItem",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      imageUrl: ""
    };
  },
  computed: {
    isSelected() {
      return (
        this.$store.state.news.selectedNewsItem &&
        this.$store.state.news.selectedNewsItem.id === this.item.id
      );
    }
  },
  methods: {
    showNewsItem() {
      if (this.isSelected) {
        this.$store.commit("news/closeShowItem");
      } else {
        this.$store.dispatch("news/showItem", this.item);
      }
    },
    getIcon(string) {
      return IconsService.icons(string);
    },
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

<style scoped></style>
