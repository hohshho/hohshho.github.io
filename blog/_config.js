module.exports = {
  /** Site MetaData (Required all)*/
  title: `Just Do It!`, // (* Required)
  description: `웹 개발 블로그입니다. `, // (* Required)
  author: `Ian`, // (* Required)
  language: 'ko-KR', // (* Required) html lang, ex. 'en' | 'en-US' | 'ko' | 'ko-KR' | ...
  siteUrl: 'https://hohshho.github.io', // (* Required)
  // ex.'https://junhobaik.github.io'
  // ex.'https://junhobaik.github.io/' << X, Do not enter "/" at the end.

  /** Header */
  profileImageFileName: 'profile.png', // include filename extension ex.'profile.jpg'
  // The Profile image file is located at path "./images/"
  // If the file does not exist, it is replaced by a random image.

  /** Home > Bio information*/
  comment: 'Developer / React, SpringBoot ...',
  name: 'Ian',
  company: '',
  location: 'Korea',
  email: 'tkdgur8377@gmail.com',
  website: 'https://hohshho.github.io', // ex.'https://junhobaik.github.io'
  linkedin: '', // ex.'https://www.linkedin.com/in/junho-baik-16073a19ab'
  facebook: '', // ex.'https://www.facebook.com/zuck' or 'https://www.facebook.com/profile.php?id=000000000000000'
  instagram: '', // ex.'https://www.instagram.com/junhobaik'
  github: 'https://github.com/hohshho', // ex.'https://github.com/junhobaik'

  /** Post */
  enablePostOfContents: true, // TableOfContents activation (Type of Value: Boolean. Not String)
  disqusShortname: 'Ian', // comments (Disqus sort-name)
  enableSocialShare: true, // Social share icon activation (Type of Value: Boolean. Not String)

  /** Optional */
  googleAnalytics: '', // Google Analytics TrackingID. ex.'UA-123456789-0'
  googleSearchConsole: '', // content value in HTML tag of google search console ownership verification
  googleAdsenseSlot: '', // Google Adsense Slot. ex.'5214956675'
  googleAdsenseClient: '', // Google Adsense Client. ex.'ca-pub-5001380215831339'
  // Please correct the adsense client number(ex.5001380215831339) in the './static/ads.txt' file.
};
