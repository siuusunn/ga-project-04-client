import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';

export default function ItemImage(cloudinaryImageId) {
  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME
    }
  });

  const myImage = cld.image(cloudinaryImageId);

  console.log(myImage);

  return <AdvancedImage cldImg={myImage} />;
}
