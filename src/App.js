import React, {useState, useEffect} from 'react';
import "bootswatch/dist/darkly/bootstrap.min.css"; 
import Form from './components/Form';
import ImagesList from './components/ImagesList';
import Spinner from './components/Spinner';
import Error from './components/Error';

/**
 * @name: Pixabay.
 * @description: Image searcher using a Pixabay API. Made with ReactJS, Bootswatch, FontAwesome & PixabayAPI.
 * @author: Juan Argudo.
 * @version: 30/03/20.
 */
function App() {
  const [search, saveSearch] = useState('');
  const [images, saveImages] = useState([]);
  //Pagination management
  const [currentPage, saveCurrentPage] = useState (1);
  const [totalPages, saveTotalPages] = useState(1);
  //Loading spinner flag
  const [loading, saveLoading] = useState(false);
  //Flag to know if the user has searched
  const [searching, saveSearching] = useState(false);
  
  useEffect(() => {
    const APIconsult = async () => {
      if(search === '') return;
      //Show loading spinner
      saveLoading(true);

      const imagesPerPage = 12;
      const key='15725402-7fb16c11e45edce1f43141771';
      const url=`https://pixabay.com/api/?key=${key}&q=${search}&per_page=${imagesPerPage}&page=${currentPage}`;
      const response = await fetch(url);
      const result = await response.json();

      //Hide spinner & update the images state
      setTimeout(() => {
        saveLoading(false);
        saveImages(result.hits);
      }, 800)

      //Total pages according to API results
      const calculateTotalPages = Math.ceil(result.totalHits / imagesPerPage);
      saveTotalPages(calculateTotalPages);
      
      //Scrolls up when the user clicks 'next' or 'previous'
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior: 'smooth'});
    }
    
    APIconsult();
  }, [search, currentPage]) //When they are updated, the function is executed again.

  //Previous & next page management.
  const previousPage = () => {
    const newCurrentPage = currentPage - 1;
    if(newCurrentPage === 0) return;
    saveCurrentPage(newCurrentPage);
  }

  const nextPage = () => {
    const newCurrentPage = currentPage + 1;
    if(newCurrentPage > totalPages) return;
    saveCurrentPage(newCurrentPage);
  }

  //Show spinner or images
  const component = (loading) ? <Spinner/> : <ImagesList images={images}/>;
  //Error massage
  const error = <Error message="Sin resultados, prueba con otra palabra similar."/>;

  return (
    <div className="container">
        <div className="jumbotron">
          <div className="header-container">
            <h1 className="title-h1">Buscador <span className="title-span">de</span> im&aacute;genes</h1>
            <h1 className="title-h2">API Pixabay</h1>
          </div>
          {/* FORM */}
          <Form saveSearch = {saveSearch} saveSearching = {saveSearching}/>
        </div>

        <div className="row justify-content-center">
            {/* After searching, if there are no results, we show the error message */}
            {(searching && images.length===0 && !loading) ? error : null}

            {/* IMAGES */}  
            {component}

            {/* BUTTONS 'Previous' and 'Next' */}  
            {(currentPage === 1||images.length === 0||loading) ? null : (
              <button type="button" 
                className="btn btn-warning mr-1"
                onClick={previousPage}
              >
                  &laquo; Anterior 
              </button>
            )}

            {(currentPage === totalPages||images.length === 0||loading) ? null : (
              <button type="button" 
                className="btn btn-warning"
                onClick={nextPage}
              >
              Siguiente &raquo;
              </button>
            )}
        </div>
    </div>
  );
}

export default App;
