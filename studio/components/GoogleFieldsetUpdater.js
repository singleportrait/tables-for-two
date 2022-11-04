/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import {withDocument} from 'part:@sanity/form-builder';
import {Text, Button} from '@sanity/ui';

const GoogleFieldsetUpdater = React.forwardRef((props, ref) => {
  const {document} = props;
  console.log('Document', document);
  return (
    <div style={{width: '100%', height: '30vh', backgroundColor: '#ddd'}}>
      <Text size="1" weight="semibold">
        Location:
      </Text>
      <br />
      {!document?.googleData?.location && (
        <Button
          mode="ghost"
          text="Add Location"
        />
      )}
    </div>
  );
});

GoogleFieldsetUpdater.displayName = 'GoogleFieldsetUpdater';

GoogleFieldsetUpdater.propTypes = {
  document: PropTypes.object,
};

export default withDocument(GoogleFieldsetUpdater);
