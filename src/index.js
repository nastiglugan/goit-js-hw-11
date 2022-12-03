import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const inputCountry = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputCountry.addEventListener('input', debounce(onType, DEBOUNCE_DELAY));

function onType(e) {
  const inputValue = e.target.value.trim();

  if (!inputValue) {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    return;
  }

  fetchCountries(inputValue).then(data => {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';

    if (data.length > 10) {
      Notiflix.Notify.info(
        'Too many matches found. Please enter a more specific name.'
      );
      return;
    }

    if (data.length >= 2 && data.length <= 10) {
      countryList.innerHTML = creatMarkUpList(data);
      return;
    } else {
      countryInfo.innerHTML = creatMarkUpInfo(data);
    }
  });
}

function creatMarkUpList(arr) {
  return arr
    .map(
      ({ flags, name }) =>
        `<li class="country-item">
    <img src="${flags.svg}" alt="${name.official}" width="20" height="20"/>
    <p class="country-name">${name.official}</p>
  </li>`
    )
    .join('');
}

function creatMarkUpInfo(arr) {
  return arr
    .map(
      ({ name, flags, capital, population, languages }) => `
    <div class="country-wrap">
     <img src="${flags.svg}" alt="${name.official}" width="40" height="30">
    <h2>${name.official}</h2>
    </div>
      <ul class="country-list-info">
        <li><span class="country-item-info">Capital:</span> ${capital}</li>
        <li><span class="country-item-info">Population:</span> ${population}</li>
        <li><span class="country-item-info">Languages:</span> ${Object.values(
          languages
        )}</li>
      </ul>
    `
    )
    .join('');
}
