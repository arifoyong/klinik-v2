const moment = require('moment')

const formatDD_MMM_YY = (dateToFormat) => {
  var date = moment(dateToFormat)

  if (!date.isValid()) {
    return ""
  } 

  return date.format('DD-MMM-YY')
}

const formatYYYY_MM_DD = (dateToFormat) => {
  var date = moment(dateToFormat, "YYYY-MM-DD")

  if (!date.isValid()) {
    return ""
  } 

  return date.format('YYYY-MM-DD')
}

const formatNo = (number) => {
  let nf = new Intl.NumberFormat()
  return nf.format(number)
}

module.exports = {
  formatYYYY_MM_DD,
  formatDD_MMM_YY,
  formatNo
}