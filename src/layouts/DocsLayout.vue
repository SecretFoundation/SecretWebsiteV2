<template>
  <div class="">
    <!-- <Sidebar /> -->
    <content-navigator-docs>
      <slot name="newblock"></slot>
      <slot/>
    </content-navigator-docs>
    <!-- <SidebarRight/> -->
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
import Sidebar from '../components/docs/Sidebar.vue'
import SidebarRight from '../components/docs/SidebarRight.vue'

export default {
  components: {
    Sidebar,
    SidebarRight
  }
}
</script>

<style lang="scss" scoped>
@import "../sass/docs/config/_maps.scss";
@import "../sass/docs/config/_colors.scss";
@import "../sass/docs/config/_mixins.scss";
@import "../sass/docs/config/_functions.scss";
@import "@lkmx/flare/src/functions/respond-to";

.site {
  background-color: var(--theme-card-bg-default);
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 20% 60% 20%;
  grid-auto-columns: max-content;

  .main {
    padding: var(--f-gutter-xl) 20px;
    border-left: 1px solid gray;
    border-right: 1px solid gray;
  }
  @media only screen and (max-width: 1339px){
    // background: red !important;
    grid-auto-flow: row;
      grid-template-columns: 100%;
      margin: 0;
      .sidebar{
        grid-row: 3;
      }
      .sidebar,.sidebar-right{
        position: relative;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        grid-column: 1;
      }
      .sidebar-right{
        grid-row: 1;
        padding: 2rem;
        width: fit-content;
      }
      .main{
        padding:10px;
        width: 100%;
      }
  }
  @include respond-to("<=s") { 
    grid-template-columns: 90vw;
  }
}
</style>
