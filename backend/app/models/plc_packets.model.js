module.exports = (sequelize, Sequelize) => {
  const PLC_Packets = sequelize.define('plc_packets', {
    plc_name: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    out_packets: {
      type: Sequelize.STRING
    },
    in_packets: {
      type: Sequelize.STRING
    },
    mean_inbound: {
      type: Sequelize.STRING
    },
    mean_outbound: {
      type: Sequelize.STRING
    },
    timestamp_start: {
      type: Sequelize.STRING
    },
    timestamp_stop: {
      type: Sequelize.STRING
    },
    mean_in_1: {
      type: Sequelize.STRING
    },
    mean_in_2: {
      type: Sequelize.STRING
    },
    mean_in_3: {
      type: Sequelize.STRING
    },
    mean_out_1: {
      type: Sequelize.STRING
    },
    mean_out_2: {
      type: Sequelize.STRING
    },
    mean_out_3: {
      type: Sequelize.STRING
    }
  },
  {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false
  })

  return PLC_Packets
}
