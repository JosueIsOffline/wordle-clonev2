import { liteClient as algoliasearch } from 'algoliasearch/lite';
import instantsearch from 'instantsearch.js';
import { searchBox, hits } from 'instantsearch.js/es/widgets';

const searchClient = algoliasearch('YNZK52PRU0', '441fe7e3eb93f5cbfd485f2aff8ae473');

const search = instantsearch({
  indexName: 'movie',
  searchClient
});

const index = instantsearch({
    indexName: 'movie',
    searchClient
})



export default searchClient
