const restaurantQuery = `
  "restaurants": *[_type == "restaurant" && defined(googleData.location.lat)] | order(article.publicationDate desc) {
    ...,
  }
`;

export const indexQuery = `*[_type == "settings"][0]{
  name,
  subtitle,
  infoDescription,
  geolocationDisclaimer,
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

export const updatePageQuery = `*[_type == "settings"][0]{
  name,
  "seoDescription": seo.description,
  "seoImage": seo.openGraphImage,
  ${restaurantQuery}
}`;
