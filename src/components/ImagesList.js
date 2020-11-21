import React from 'react';
import PropTypes from 'prop-types';
import Image from './Image';

/**
 * @name: ImagesList.
 * @description: Go through the image array formatting using the "Image" component.
 * @param: Array of images obtained from the API.
 * @return: Image formatted by the "Image" component.
 */
const ImagesList = ({images}) => {
    return (
        <div className="col-12 p-5 row">
            {images.map(image => (
                <Image 
                    key={image.id}
                    image={image}
                />
            ))}
        </div>
    );
};

ImagesList.propTypes = {
    images: PropTypes.array.isRequired
}

export default ImagesList;