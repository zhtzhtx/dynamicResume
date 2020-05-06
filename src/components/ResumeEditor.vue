<template>
  <div class="resumeEditor" :class="{htmlMode:enableHtml}" ref="container">
    <div v-if="enableHtml" v-html="markdown"></div>
    <pre v-else>{{markdown}}</pre>
  </div>
</template>


<script >
export default {
  props: ["markdown", "enableHtml"],
  name: "ResumeEditor",
  methods: {
    goBottom: function() {
      this.$refs.container.scrollTop = 100000;
    },
    goTop: function() {
      this.$refs.container.scrollTop = 0;
    }
  }
};
</script>


<style>
</style>