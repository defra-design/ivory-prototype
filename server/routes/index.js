module.exports = [].concat(
  require('./home'),
  require('./public'),
  require('./feedback'),
  require('./feedback-thankyou'),
  require('./clear-session'),
  require('./landing'),


  // Rod screen
  require('./rod-screen'),
  require('./buy/rods-two'),
  require('./buy/rods-three'),
  require('./buy/rods-four'),
  require('./buy/rods-five'),

  // Analytics
  require('./analytics-screen'),

  // Catch returns
  require('./catch-return/which-licence-do-you-have'),
  require('./catch-return/new-licence-number'),
  require('./catch-return/old-licence-number'),

  // Done screen
  require('./done-screen'),
  require('./buy/order-complete-four'),

  // Multibuy
  require('./buy/multibuy-screen'),
  require('./buy/order-complete-two'),
  require('./buy/order-complete-three'),
  require('./buy/summary-two'),
  require('./buy/add-another'),
  require('./buy/order-complete-multibuy'),

  // Contact screen ideas
  require('./contact-screen'),
  require('./buy/contact-one'),
  require('./buy/contact-two'),
  require('./buy/contact-two-b'),
  require('./buy/contact-three'),
  require('./buy/contact-four'),
  require('./buy/contact-five'),
  require('./buy/contact-six'),
  require('./buy/contact-seven'),
  require('./buy/contact-eight'),
  require('./buy/contact-nine'),

  // Junior version two
  require('./junior-screen'),
  require('./buy/name-junior'),
  require('./buy/name-junior-quick'),
  require('./buy/download-option'),
  require('./buy/download-option-quick'),
  require('./buy/download-complete'),

  // Upgrade & renewals
  require('./upgrade-screen'),
  require('./buy/product-type'),
  require('./buy/licence-before'),
  require('./buy/licence-before-two'),
  require('./buy/renew-or-upgrade-licence'),
  require('./buy/find-a-licence'),
  require('./buy/find-a-licence-receipt'),
  require('./buy/dob-postcode-check'),
  require('./buy/upgrade-expired'),
  require('./buy/renew-expired'),
  require('./buy/licence-details-species'),
  require('./buy/licence-details-length'),
  require('./buy/licence-details-renew'),
  require('./buy/details-updated'),
  require('./buy/licence-not-found'),
  require('./buy/upgrade-used'),
  require('./buy/system-failure'),

  require('./buy/renew-not-valid'),
  require('./buy/renewal-used'),


  require('./buy/choose-licence'),
  require('./buy/find-a-licence-two'),
  require('./buy/find-a-licence-dob'),
  require('./buy/find-a-licence-postcode'),
  require('./buy/licence-options'),
  require('./buy/licence-options-two'),


  // Buy
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
  require('./buy/blue-badge-check'),
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
  require('./buy/order-complete'),
  require('./buy/mobile-number'),
  require('./buy/email-address'),

  // Pay pages
  require('./buy/enter-card-details'),
  require('./buy/confirm-payment'),

  // Start pages
  require('./start-screen'),
  require('./start'),
  require('./start/overview'),
  require('./start/licence-costs'),
  require('./start/rules'),
  require('./start/important-changes'),
  require('./start/buy'),
  require('./start/replace'),
  require('./start/when-you-need-a-licence'),
  require('./start/buy-a-fishing-licence'),
  require('./start/fishing-in-scotland-and-northern-ireland'),
  require('./start/upgrade-your-licence')
)
