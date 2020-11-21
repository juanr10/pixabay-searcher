import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Error from './Error';

/**
 * @name: Form.
 * @description: Image search form.
 * @param: Function to update the "search" and "searching" state of the main component.
 * @return: Form view.
 */
const Form = ({saveSearch, saveSearching}) => {
    const [term, saveTerm] = useState('');
    const [error, saveError] = useState(false);

    const searchImages = e => {
        e.preventDefault();
        //The user is searching
        saveSearching(true);
        //Validating 
        if(term.trim() === ''){
            saveError(true);
            return;
        }
        //Pass search term to the main component
        saveSearch(term);
        //Clean errors
        saveError(false);
    }

    return (
        <form onSubmit={searchImages}>
            <div className="row">
                <div className="form-group col-md-8">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Busca una imagen"
                        onChange={e => saveTerm(e.target.value)}
                    />
                </div>
                <div className="form-group col-md-4">
                    <input
                        type="submit"
                        className="btn btn-lg btn-warning btn-block"
                        value="Buscar"
                    />
                </div>
            </div>

            {error ? <Error message="Agrega un término de búsqueda"/> : null}
        </form>
    );
};

Form.propTypes = {
    saveSearch: PropTypes.func.isRequired,
    saveSearching : PropTypes.func.isRequired
}

export default Form;