import React from 'react';
import S from '@sanity/desk-tool/structure-builder';

export default () => {
  return S.list()
    .title('Pages')
    .items([
      S.listItem()
        .title('Restaurants')
        .schemaType('restaurant')
        .child(
          S.documentTypeList('restaurant')
            .title('Restaurants')
        )
        .icon(() => <div style={{fontSize: 22}}>🍱</div>),
      S.divider(),
      S.listItem()
        .title('Site Settings')
        .child(
          S.document()
            .schemaType('settings')
            .documentId('settings')
        )
        .icon(() => <div style={{fontSize: 22}}>🛠</div>),
      ...S.documentTypeListItems().filter((item) => {
        return !['settings', 'restaurant'].includes(item.getId());
      }),
    ]);
};
