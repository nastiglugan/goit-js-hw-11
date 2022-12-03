export { fetchCountries };
import Notiflix from 'notiflix';

const BASE_URL = 'https://restcountries.com/v3.1/name/';
const FILTER = '?fields=name,capital,population,flags,languages';

function fetchCountries(name) {
  return fetch(`${BASE_URL}${name}${FILTER}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(
          Notiflix.Notify.failure('Oops, there is no country with that name')
        );
      }
      return response.json();
    })
    .catch(err => {
      console.error(err);
    });
}
