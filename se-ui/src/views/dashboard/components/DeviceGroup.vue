<template>
  <el-row :gutter="30" class="device-group">
    <el-col :xs="24" :sm="24" :md="24" :lg="24" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-picture-wrapper">
          <img :src="se_device" class="card-panel-picture">
        </div>
        <div class="card-panel-description">
          <div class="card-panel-title">
            Smart Extension Hardware
          </div>
          <div class="card-panel-text">
            <dl class="row" style="margin-left: 5px">
              <dt style="display:inline-block;vertical-align: middle; margin-top: 7px" align="middle">Company</dt>
              <dd><img :src="bec_logo" width="200"></dd>

              <dt>Model</dt>
              <dd>C6015-0010</dd>

              <dt>Processor</dt>
              <dd>Intel&reg; Atom&trade; E3845, 1.91 GHz, 4 cores</dd>

              <dt>Memory</dt>
              <dd>4 x 1GB DDR3L RAM</dd>

              <dt>Power Supply</dt>
              <dd>24V DC</dd>

              <dt>Flash</dt>
              <dd>SSD 60GB 3D-MLC</dd>
            </dl>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :xs="24" :sm="24" :md="24" :lg="24" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-picture-wrapper">
          <img :src="plc_device" class="card-panel-picture">
        </div>
        <div class="card-panel-description">
          <div class="card-panel-title">
            Protected Hardware
          </div>
          <div class="card-panel-text">
            <dl class="row" style="margin-left: 5px">
              <dt style="display:inline-block;vertical-align: middle; margin-top: 7px" align="middle">Company</dt>
              <dd><img :src="bec_logo" width="200"></dd>

              <dt>Model</dt>
              <dd>CX8190</dd>

              <dt>Processor</dt>
              <dd>ARM Cortex&trade; -A9, 800 MHz (TC3:20)</dd>

              <dt>Flash Memory</dt>
              <dd>Slot for microSD card</dd>

              <dt>Main Memory</dt>
              <dd>512 MB DDR3 RAM</dd>

              <dt>Interfaces</dt>
              <dd>2 x RJ45</dd>

              <dt>Bus Interface</dt>
              <dd>1 x RJ45 10/100 Mbit/s, 2 x RJ45 100 Mbit/s</dd>

              <dt>Power Supply</dt>
              <dd>24 V DC</dd>
            </dl>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import se_device from '@/assets/devices/c6015.png'
import plc_device from '@/assets/devices/c8190.png'
import beckhoff_logo from '@/assets/devices/Beckhoff_Logo.svg'

export default {
  data() {
    return {
      se_device: se_device,
      bec_logo: beckhoff_logo,
      plc_device: plc_device
    }
  }
}
</script>

<style lang="scss" scoped>
  .device-group {
    margin-top: 18px;

    .card-panel-col {
      margin-bottom: 32px;
    }

    .card-panel {
      cursor: pointer;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #e9e9e9;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
      border-color: rgba(0, 0, 0, .05);

      &:hover {
        .card-panel-picture-wrapper {
          color: #fff;
        }
      }

      .card-panel-picture-wrapper {
        float: left;
        margin: 14px 0 0 14px;
        padding: 16px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
      }

      .card-panel-picture {
        float: left;
        width: 200px;
      }

      .card-panel-description {
        float: left;
        font-weight: bold;
        margin: 25px;
        margin-left: 10px;

        .card-panel-title {
          line-height: 18px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 19px;
          margin-bottom: 8px;
        }
        .card-panel-text {
          line-height: 18px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 14px;
          margin-bottom: 8px;
        }

        .card-panel-num {
          font-size: 20px;

        }
      }
    }

    dl {
      padding: 0.5em;
    }
    dt {
      float: left;
      clear: left;
      text-align: left;
      font-weight: bold;
      vertical-align: middle;
    }
    dt::after {
      content: ":";
    }
    dd {
      margin: 0 0 0 150px;
      padding: 0 0 0.5em 0;
      font-weight: normal;
      vertical-align: middle;
    }
  }

  @media (max-width:550px) {
    .card-panel-description {
      display: block;
    }
  }
</style>
