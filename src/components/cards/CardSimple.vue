<template>
  <div class="card-simple" :class="{ 'cta': url }">
    <a :href="url">
      <slot></slot>
    </a>
  </div>
</template>

<script>
  export default {
    props: {
      url: {
        type: String,
        required: false
      },
    }
  }

</script>

<style lang="scss">
  @import "../../sass/functions/theme";
  @import "@lkmx/flare/src/functions/respond-to";

  $accent-colors: ("blue",
    "turquoise",
    "green",
    "yellow",
    "cream",
    "orange",
    "red",
    "purple",
    "gray",
  );

  // @each $name, $color in $accent-colors {
  // 	&.accent-#{$name} {
  // 		color: var(--accent-#{$name});
  // 	}
  // }

  .card-simple {
    border-radius: var(--f-radius);
    padding: var(--f-gutter-l);
    background: var(--theme-card-bg-default);
    transition: .2s ease;

    p {
      color: var(--theme-card-text-color);
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      color: var(--theme-fg);
    }

    &.vertical-stretch {
      height: 100%;

      a:not([aria-hidden="true"]):not(.btn) {
        height: 100%;
        display: flex;
        flex-direction: column;
        flex-grow: 1;

        .btn {
          margin-top: auto;
        }
      }
    }

    &.cta {
      cursor: pointer;
      &:hover {
      transform: var(--card-hover-transform);
    }

      @each $name,
      $color in $accent-colors {
        &.accent-#{$name} {
          &:hover {
            background: var(--theme-card-bg-hover);
            box-shadow: var(--card-hover-shadow) var(--accent-#{$name});
          }
        }
      }
    }

    &.text-center {
      text-align: center;

      img {
        display: inline-block;
      }

      h6 {
        margin: 0;
        color: var(--theme-fg);
      }
    }

    &.orientation-horizontal {
      a {
        color: var(--theme-fg);
        display: grid;
        gap: var(--f-gutter-xxl);
        grid-template-columns: 1fr 60%;

        @include respond-to("<=m") {
          grid-template-columns: 1fr;
        }

      }
    }

    &.orientation-vertical {
      a {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--f-gutter-xxl);
      }
    }

    @each $name,
    $color in $accent-colors {
      &.accent-#{$name} {
        h3 {
          color: var(--accent-#{$name});
        }
      }
    }
  }

</style>
