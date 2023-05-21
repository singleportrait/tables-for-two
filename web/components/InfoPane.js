import { PortableText } from '@portabletext/react';

import ButtonLink from './ButtonLink';
import Button from './Button';

const InfoPane = ({ onClose, data, geolocationError }) => (
  <div className="absolute bottom-0 right-0 w-full sm:max-w-sm bg-primary bg-opacity-90 p-4">
    <Button onClick={onClose} className="absolute right-4 -top-10">
      Close
    </Button>
    <h2 className="antialiased text-white">
      Info
    </h2>
    {data.infoDescription && (
      <div className="max-w-prose font-mono text-sm text-white antialiased mt-2 richTextFormatting">
        <PortableText value={data.infoDescription} />
      </div>
    )}
    {geolocationError && data.geolocationDisclaimer && (
      <div className="max-w-prose font-mono text-sm text-white antialiased mt-2">
        <PortableText value={data.geolocationDisclaimer} />
      </div>
    )}
    {data.github && (
      <ButtonLink href={data.github} className="mt-4">
        Github
      </ButtonLink>
    )}
  </div>
);

export default InfoPane;
