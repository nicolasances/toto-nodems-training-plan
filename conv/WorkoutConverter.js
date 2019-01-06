var moment = require('moment-timezone');

exports.converter = {

  /**
   * Creates the persistent object from a JSON object
   */
  workoutPO: function(data) {

    return {
      planId: data.planId,
      name: data.name
    };
  },

  /**
   * Creates the transfer object from the PO
   */
  workoutTO: function(data) {

    if (data == null) return {};

    return {
      id: data._id,
      planId: data.planId,
      name: data.name
    }
  }

}
