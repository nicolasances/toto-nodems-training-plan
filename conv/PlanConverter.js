var moment = require('moment-timezone');

exports.converter = {

  /**
   * Creates the persistent object from a JSON object
   */
  planPO: function(data) {

    let endDate = moment(data.start, 'YYYYMMDD').tz('Europe/Rome').add(data.weeks, 'w');

    return {
      name: data.name,
      start: data.start, // expected in 'YYYYMMDD' format
      end: endDate.format('YYYYMMDD'),
      weeks: parseInt(data.weeks)
    };
  },

  /**
   * Creates the transfer object from the PO
   */
  planTO: function(data) {

    if (data == null) return {};

    return {
      id: data._id,
      name: data.name,
      start: data.start,
      end: data.end,
      weeks: data.weeks
    }
  }

}
