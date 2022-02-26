<template>
  <div class="panel-group">
    <el-row :gutter="30" class="panel-group">
      <el-col :xs="12" :sm="12" :md="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-hosts">
            <svg-icon icon-class="087-display" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              Hosts
            </div>
            <count-to :start-val="0" :end-val="totalHosts" :duration="3000" class="card-panel-num" />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :md="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-ip-mac-ports">
            <svg-icon icon-class="204-link" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              IP-MAC-Ports
            </div>
            <count-to :start-val="0" :end-val="totalIpmacports" :duration="3000" class="card-panel-num" />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :md="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-alarms">
            <svg-icon icon-class="264-warning" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              Alarms
            </div>
            <count-to :start-val="0" :end-val="totalAlarms" :duration="3000" class="card-panel-num" />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :md="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-packets">
            <svg-icon icon-class="035-file-text" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              Packets Count
            </div>
            <count-to :start-val="0" :end-val="totalPackets" :duration="3000" class="card-panel-num" />
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CountTo from 'vue-count-to'
import TagData from '@/views/ip-mac-port/services/hostData'
import AlarmData from '@/views/alarm/services/alarmData'
import PacketData from '@/views/packets/services/packetData'

export default {
  components: {
    CountTo
  },
  data() {
    return {
      hosts: [],
      iplist: [],
      ipset: new Set(),
      totalHosts: 0,
      totalIpmacports: 0,
      alarms: [],
      totalAlarms: 0,
      packets: [],
      totalPackets: 0
    }
  },
  mounted: function() {
    setInterval(function() {
      this.countHosts()
    }.bind(this), 1000)

    setInterval(function() {
      this.countIPMAC()
    }.bind(this), 1000)

    setInterval(function() {
      this.countAlarms()
    }.bind(this), 1000)

    setInterval(function() {
      this.countPackets()
    }.bind(this), 1000)
  },
  methods: {
    countHosts() {
      TagData.getAll()
        .then(response => {
          this.hosts = response.data
          for (let i = 0; i < this.hosts.length; i++) {
            this.iplist.push(this.hosts[i].IP)
          }
          this.ipset = new Set(this.iplist)
          this.totalHosts = this.ipset.size
        })
        .catch(e => {
          console.log(e)
        })
    },

    countIPMAC() {
      TagData.getAll()
        .then(response => {
          this.hosts = response.data
          this.totalIpmacports = this.hosts.length
        })
        .catch(e => {
          console.log(e)
        })
    },

    countAlarms() {
      AlarmData.getAll()
        .then(response => {
          this.alarms = response.data
          this.totalAlarms = this.alarms.length
        })
        .catch(e => {
          console.log(e)
        })
    },

    countPackets() {
      PacketData.getAll()
        .then(response => {
          this.packets = response.data
          this.totalPackets = this.packets.length
        })
        .catch(e => {
          console.log(e)
        })
    }

  }
}
</script>

<style lang="scss" scoped>
  .panel-group {
    margin-top: 18px;

    .card-panel-col {
      margin-bottom: 32px;
    }

    .card-panel {
      height: 108px;
      cursor: pointer;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #F8F8F8;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
      border-color: rgba(0, 0, 0, .05);

      &:hover {
        .card-panel-icon-wrapper {
          color: #fff;
        }

        .icon-hosts {
          background: #2E86C1;
        }

        .icon-ip-mac-ports {
          background: #239B56;
        }

        .icon-alarms {
          background: #E74C3C;
        }

        .icon-packets {
          background: #9B59B6
        }
      }

      .icon-hosts {
        color: #2E86C1;
      }

      .icon-ip-mac-ports {
        color: #239B56;
      }

      .icon-alarms {
        color: #E74C3C;
      }

      .icon-packets {
        color: #9B59B6
      }

      .card-panel-icon-wrapper {
        float: left;
        margin: 14px 0 0 14px;
        padding: 16px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
      }

      .card-panel-icon {
        float: left;
        font-size: 48px;
      }

      .card-panel-description {
        float: left;
        font-weight: bold;
        margin: 25px;
        margin-left: 10px;

        .card-panel-text {
          width-min: 100px;
          line-height: 18px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 12px;
          margin-bottom: 8px;
        }

        .card-panel-num {
          font-size: 20px;

        }
      }
    }
  }

  @media (max-width:550px) {
    .card-panel-description {
      display: block;
    }

    .card-panel-icon-wrapper {
      float: none !important;
      width: 100%;
      height: 100%;
      margin: 0 !important;

      .svg-icon {
        display: block;
        margin: 10px auto !important;
        float: none !important;
      }
    }
  }
</style>
