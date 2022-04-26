<template>
  <div class="dashboard-editor-container">
    <device-group />
  </div>
</template>

<script>
import DeviceGroup from './components/DeviceGroup'

export default {
  name: 'DashboardAdmin',
  components: {
    DeviceGroup
  }
}
</script>

<style lang="scss" scoped>

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
