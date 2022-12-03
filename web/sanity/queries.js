// const metadataQuery = `
//   "seoDescription": seo.description,
//   "seoImage": seo.openGraphImage,
//   "siteSettings": *[_type == "settings"][0]{
//     "seoDescription": seo.description,
//     "seoImage": seo.openGraphImage,
//   }
// `;

// export const otherPageQuery = `*[_type == "page"][0]{
//   ...,
//   ${metadataQuery},
// }`;

export const indexQuery = `*[_type == "settings"][0]{
  name,
  subtitle,
  infoDescription,
  github,
  "seoDescription": seo.description,
  "seoImage": seo.openGraphImage,
  "restaurants": *[_type == "restaurant" && defined(googleData.location.lat)]{
    ...,
  }
}`;

export const uploadPageQuery = `*[_type == "settings"][0]{
  name,
  "seoDescription": seo.description,
  "seoImage": seo.openGraphImage,
}`;
