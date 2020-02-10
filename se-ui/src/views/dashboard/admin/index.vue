<template>
  <div class="dashboard-editor-container">
    <panel-group />
    <device-group />
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import DeviceGroup from './components/DeviceGroup'

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    DeviceGroup
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
