<template>
  <a class="tab-item" @click="$parent.$emit('input', id)" :class="{ 'is-selected': $parent.value === id }">
    <router-link :to="to">
      <div class="tab-item-icon">
        <slot name="icon"></slot>
      </div>
      <div class="tab-item-label">
        <slot></slot>
      </div>
    </router-link>
  </a>
</template>

<script>
export default {
  name: 'vv-tab-item',
  props: ['id', 'to']
};
</script>

<style lang="scss">
@import '~@/assets/scss/_variables.scss';
.tab-item {
  display: block;
  padding: 0.1rem 0;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  text-decoration: none;
  a {
    text-decoration: none;
  }
  .tab-item-icon img {
    width: 0.4rem;
    height: 0.4rem;
    margin: 0 auto 0px;
  }
  .tab-item-label {
    color: $color-grey;
    font-size: 0.26rem;
    margin-top: 0.05rem;
    line-height: 1;
    text-decoration: none;
  }
  &.is-selected {
    .tab-item-label {
      color: #00ccb1;
    }
  }
}
</style>
