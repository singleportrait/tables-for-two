# Tables for Two

A New Yorker restaurant reviews map. Designed & built by [Jenn Scheer](https://jennscheer.com).

Built with Sanity CMS admin + Next.js front-end, using the Google Maps API, hosted on Vercel. This also uses Github Actions to upload each restaurant weekly to the app from the New Yorker's RSS feed.

This repo is generated from [this starter template](https://github.com/singleportrait/sanity-next-js-starter), where you can find most instructions for installing and running the app.

This is a monorepo, running two apps from `/studio` (the admin) and `/web` (the front-end). It's intended to be two Vercel apps that then communicate with each other.

### Developing

When first installing, `yarn` (the installation) has to be run in each folder independently (`studio/` and `web/`) as well as in the root folder. The [Sanity CLI](https://www.sanity.io/docs/cli) also needs to be installed globally.

Using Lerna, both apps can be started from the root folder:

```
yarn run dev
```

To run each independently, you can run:

```
# Sanity
cd studio/
sanity start

# Next
cd web/
yarn run dev
```

### Environment variables

In addition to the ones noted in the [starter template](https://github.com/singleportrait/sanity-next-js-starter), you need these as well.

In `studio/.env.development` (and Vercel, or wherever it's hosted) for Sanity:

```
SANITY_STUDIO_GOOGLE_MAPS_API_KEY // For the admin map uploader to run
```

In `web/.env.local` for Next.js:

```
NEXT_PUBLIC_SANITY_DATASET // From sanity.io/manage, probably 'production'
NEXT_PUBLIC_SANITY_PROJECT_ID // From sanity.io/manage
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY // For the map to run
SANITY_API_WRITE_TOKEN // For uploading restaurants to Sanity
SANITY_API_TOKEN // Not sure!
API_SECRET_KEY // For running the weekly Google Actions script to upload new restaurants to Sanity
NEXT_PUBLIC_PROJECT_NAME // For displaying name on site
```

**Restaurant Upload Steps**

- Locally, there is a page that allows you to bulk-upload or upload individual restaurants: http://localhost:3000/create-restaurants
- Within the `CreateRestaurant` component, you can fetch data saved in the `web/data/` directory. There is a `sample.js` file in there that shows an example of how the data should appear
- What I've done locally is created nested date directories with data inside, e.g. `web/data/01142023/data.js`, which are set up to be ignored by git, so you don't have to worry about checking them in.
- There is also another page, http://localhost:3000/update-restaurants, that allows you to fetch all the recent restaurant data and flag any that are no longer operational. This is incomplete, and it'd also be great to also allow it to update in Sanity all the latest Google data for each restaurant. Also note: Running this page costs money, because it's fetching a bunch of data from Google's Places API! So be intentional there :)
