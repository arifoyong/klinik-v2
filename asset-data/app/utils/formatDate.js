const moment = require('moment')

const formatDate = (dateToFormat) => {
  var date = moment(dateToFormat)

  if (!date.isValid()) {
    return ""
  } 

  return date.utc().format('DD-MMM-YY')
}

const formatNo = (number) => {
  let nf = new Intl.NumberFormat()
  return nf.format(number)
}

module.exports = {
  formatDate,
  formatNo
}