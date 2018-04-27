<template>
  <div class="u-panel">
      <div class="u-panel-title">
        <slot name="title">
            {{title}}
        </slot>
      </div>
      <slot></slot>
  </div>
</template>

<script>
export default {
    name: 'u-panel',
    props:{
        title: String
    }
}
</script>

<style lang=less>
    .u-panel{
        width: 100%;
        height: 100%;
        .u-panel-title{
            font-size: 16px;
            color: #333;
            margin-bottom: 13px;
        }
    }
</style>
