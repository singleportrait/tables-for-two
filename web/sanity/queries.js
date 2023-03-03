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

const restaurantQuery = `
  "restaurants": *[_type == "restaurant" && defined(googleData.location.lat)] | order(article.publicationDate desc) {
    ...,
  }
`;

export const indexQuery = `*[_type == "settings"][0]{
  name,
  subtitle,
  infoDescription,
  github,
  "seoDescription": seo.description,
  "seoImage": seo.openGraphImage,
  ${restaurantQuery},
}`;

export const uploadPageQuery = `*[_type == "settings"][0]{
  name,
  "seoDescription": seo.description,
  "seoImage": seo.openGraphImage,
}`;
