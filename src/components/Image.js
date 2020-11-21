import React from 'react';
import PropTypes from 'prop-types';

/**
 * @name: Image.
 * @description: Formats each image object.
 * @param: Image object. 
 * @return: Image view.
 */
const Image = ({image}) => {
    const {largeImageURL, previewURL, likes, tags, views, downloads} = image;

    return (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card border-warning">
                <img src={previewURL} alt={tags} className="card-img-top"/>

                <div className="card-body">
                    <p className="card-text"><i className="fa fa-thumbs-up"></i> <b>{likes}</b> likes</p>
                    <p className="card-text"><i className="fa fa-eye"></i> <b>{views}</b> visitas</p>
                    <p className="card-text"><i className="fa fa-download"></i> <b>{downloads}</b> descargas</p>
                </div>
                <div className="card-footer">
                    <a href ={largeImageURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-warning btn-block"
                    >
                        <i className="fa fa-search-plus"></i> Ver imagen
                    </a>
                </div>
            </div>
        </div>
    );
};

Image.propTypes = {
    image: PropTypes.object.isRequired
}

export default Image;