<template>
  <div class="services-container">
    <div
      :key="`services_${index}`"
      v-for="(services, name, index) in bridge.bridgeServicesAndState"
      class="service-container"
    >
      <div class="service-name-container">
        <img :src="fetchIcon(name)" :alt="name" />
        <span class="service-name">{{ name }}</span>
      </div>

      <div class="icon-container">
        <div
          :key="`service_${index}`"
          v-for="(service, index) in services"
          class="icon"
        >
          <span class="text">{{ service.shore }} </span>
          <span
            class="circle"
            :class="{ active: service.name === 'Actief' }"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { IconsService } from "@/service/IconsService";

export default {
  name: "Services",
  props: {
    bridge: {
      type: Object,
      required: true
    }
  },
  methods: {
    fetchIcon(name) {
      return IconsService.serviceIcon(name);
    }
  }
};
</script>

<style scoped></style>
