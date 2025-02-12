<template>
  <div class="scrt-pdf-viewer">
    <div
      v-for="(roadmap, index) in ecosystemRoadmap"
      :key="index"
      class="scrt-pdf-viewer__intro"
    >
    <!-- Title -->
      <hero-title>
        <p class="scrt-pdf-viewer__intro__date">{{ roadmap.updated_at }}</p>
        <h2>Ecosystem Roadmap</h2>
      </hero-title>
      <!-- Intro message -->
      <div class="scrt-pdf-viewer__intro__message">
        <p>
          The Secret Network ecosystem roadmap is a community effort, stewarded
          by the Secret Foundation, to showcase all the projects currently in
          development.
        </p>
      </div>
      <!-- PDF -->

      <ClientOnly>
        <pdf class="scrt-pdf-viewer__intro__file" :src="roadmap.url">
          </pdf>
      </ClientOnly>

      <div class="scrt-pdf-viewer__intro__download">
        <btn class="no-arrow" :url="roadmap.url">DOWNLOAD INTERACTIVE PDF</btn>
      </div>
    </div>
  </div>
</template>

<script>

// import pdf from 'vue-pdf-cdn'

export default {
 
  components: {
      // pdf
      pdf: () =>
        import ('vue-pdf-cdn').then(pdf => pdf ).catch(),
    },

  data() {
    return {
      isClient2: false,
    }
  },

  methods: {
    isClient() {
      if(process.isClient) {
        this.isClient2 = true;
        console.log(this.isClient2);
      }
    },
    getPdfDate() {
      let dateEl = document.querySelector(".scrt-pdf-viewer__intro__date");
      const date = new Date(dateEl.textContent);
      const getYear = date.getFullYear();
      const formatedDate = date.toLocaleString("en-US", { month: "long" });

      dateEl.textContent = `Last Updated ${formatedDate} ${getYear}`;
    },
  },
  computed: {
    ecosystemRoadmap() {
      const content = this.$static.strapiEcosystemRoadmap.edges.map(
        (it) => it.node.ecosystemRoadmap
      );

      return content;
    },
  },
  mounted() {
    this.getPdfDate();
    this.isClient();
  },
};
</script>

<static-query>
query {
  strapiEcosystemRoadmap: allStrapiEcosystemRoadmap {
    edges {
      node {
        ecosystemRoadmap {
          url
          updated_at
        }
      }
    }
  } 
}
</static-query>

<style lang="scss">
.scrt-pdf-viewer {
  &__intro {
    &__date {
      margin-bottom: 3px;
    }
    &__file {
      margin-bottom: var(--f-gutter);
    }
    &__download {
      display: grid;
      justify-content: center;
      a {
        min-width: 300px !important;
        margin: 0 !important;
        background: var(--color-neutral-dark-mode-02) !important;
      }
    }
    &__message {
      p {
        max-width: 710px;
        font-size: 20px;
        line-height: 28px;
        letter-spacing: -.15px;
      }
    }
  }
}
</style>
