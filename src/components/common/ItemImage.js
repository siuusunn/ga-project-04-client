import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';

import { thumbnail } from '@cloudinary/url-gen/actions/resize';
import { focusOn } from '@cloudinary/url-gen/qualifiers/gravity';
import { FocusOn } from '@cloudinary/url-gen/qualifiers/focusOn';

export default function ItemImage({
  cloudinaryImageId,
  imageWidth,
  imageHeight
}) {
  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME
    }
  });

  const myImage = cld.image(cloudinaryImageId);

  myImage.resize(thumbnail().width(imageWidth).height(imageHeight));
  // .roundCorners(byRadius(50)); // Crop the image, focusing on the face.

  return <AdvancedImage cldImg={myImage} />;
}
