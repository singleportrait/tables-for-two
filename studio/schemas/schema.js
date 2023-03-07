// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator';

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';

// We import object and document schemas
import restaurant from './documents/restaurant';
import settings from './documents/settings';

import blockContent from './objects/blockContent';
import asset from './objects/asset';
import seo from './objects/seo';
import article from './objects/article';
import googleData from './objects/googleData';

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    restaurant,
    settings,

    article,
    googleData,
    blockContent,
    asset,
    seo,
  ]),
});
