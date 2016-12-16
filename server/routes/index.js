module.exports = [].concat(
  require('./home'),
  require('./public'),
  require('./feedback'),
  require('./feedback-thankyou'),

  require('./landing'),
  require('./licence-before'),


  require('./upgrade/find-a-licence'),
  require('./upgrade/dob-postcode-check'),
  require('./upgrade/upgrade-expired'),
  require('./upgrade/licence-details-species'),
  require('./upgrade/licence-details-length'),
  require('./upgrade/change-details'),


  require('./buy'),
  require('./buy/licence-type'),
  require('./buy/licence-length'),
  require('./buy/licence-short-term-length'),
  require('./buy/number-of-rods'),
  require('./buy/licence-start-option'),
  require('./buy/licence-start-day'),
  require('./buy/licence-start-time'),
  require('./buy/date-of-birth'),
  require('./buy/no-licence-required'),
  require('./buy/upgrade-licence'),
  require('./buy/disability'),
  require('./buy/disability-proof'),
  require('./buy/blue-badge'),
  require('./buy/ni-number'),
  require('./buy/name'),
  require('./buy/find-address'),
  require('./buy/select-address'),
  require('./buy/manual-address'),
  require('./buy/contact'),
  require('./buy/data-protection'),
  require('./buy/summary'),
  require('./buy/terms-conditions'),
  require('./pay/enter-card-details'),
  require('./pay/confirm-payment'),
  require('./buy/order-complete'),
  require('./buy/phone-number'),
  require('./buy/email-address'),
  require('./start'),
  require('./start/overview'),
  require('./start/licence-costs'),
  require('./start/rules'),
  require('./start/important-changes'),
  require('./start/buy'),
  require('./start/replace')
)
