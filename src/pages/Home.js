import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import ErrorAlert from '../components/ErrorAlert';
import UniCard from '../components/UniCard';
import Filters from '../components/Filters';
import BusyIndicator from '../components/BusyIndicator';
import { LIMIT, API_BASE_URL_DEV, API_BASE_URL_PROD } from '../constants';

const Home = () => {

  // All API end points
  let apiBasePath;
  if (process.env.NODE_ENV === 'development') {
    apiBasePath = API_BASE_URL_DEV;
  } else {
    apiBasePath = API_BASE_URL_PROD;
  }

  const getDomainsUrl = `${apiBasePath}/domains`;
  const getCountryCodesUrl = `${apiBasePath}/countrycodes`;
  const searchUniversitiesUrl = `${apiBasePath}/search`;

  // store the search query string
  const [searchQuery, setSearchQuery] = useState('');

  // store the meta data about the API result
  const [metaData, setMetaData] = useState({
    totalCount: 0,
    limit: LIMIT,
    next: 0
  });

  const [showLoadMore, setShowLoadMore] = useState(true);

  // store all the domains
  const [domains, setDomains] = useState([]);

  // store all the country codes
  const [countryCodes, setCountryCodes] = useState([]);

  // store query result
  const [universities, setUniversities] = useState([]);

  // store error details
  const [errorDetails, setErrorDetails] = useState(null);

  // store the data loading flag
  const [loading, setLoading] = useState(false);

  // store the selected domain for filtering
  const [selectedDomain, setSelectedDomain] = useState('All');

  // store the selected country code for filtering
  const [selectedCountryCode, setSelectedCountryCode] = useState('All');

  // store the university name the user searched
  const [searchKeyword, setSearchKeyword] = useState('');

  /**
   * Handle the Error message close event.
   * This removes the error message from the UI
   */
  const handleCloseError = () => setErrorDetails(null);

  /**
   * Handle the on load more button click event
   * This fetched more records. Acts like a pagination.
   */
  const onLoadMore = () => {
    /* here the query remains the same and we append the data */
    searchUniversities(searchQuery, false);
  };

  /**
   * Handle the filter change event
   * @param {*} event DOM event object
   */
  const handleFiltersChange = (event) => {
    const target = event.target.name;

    switch (target) {
      case 'domain':
        setSelectedDomain(event.target.value);
        break;

      case 'code':
        setSelectedCountryCode(event.target.value);
        break;

      case 'name':
        const keyword = event.target.value.replace(/[^A-Za-z0-9 ]/g, '');
        setSearchKeyword(keyword);
        break;

      default: // do nothing
        break;
    }
  };

  /**
   * GET all unique domains (only end)
   */
  async function getAllDomains() {
    const response = await fetch(getDomainsUrl);
    if (response.status === 200) {
      response
        .json()
        .then(res => setDomains((res.data).sort()))
        .catch(err => setErrorDetails({ status: response.status, message: err }));
    } else {
      setErrorDetails({
        status: response.status,
        message: response.statusText
      });
    }
  }

  /**
   * GET all unique country codes
   */
  async function getCountryCodes() {
    const response = await fetch(getCountryCodesUrl);
    if (response.status === 200) {
      response
        .json()
        .then(res => setCountryCodes((res.data).sort()))
        .catch(err => setErrorDetails({ status: response.status, message: err }));

    } else {
      setErrorDetails({
        status: response.status,
        message: response.statusText
      });
    }
  }

  /**
   * Search the universities based on user's query
   * @param {string} query    The parameter to the GET api call
   * @param {boolean} replace Whether to replace the data or to append it
   */
  async function searchUniversities(query, replace = false) {
    let startIndex = metaData.next ? metaData.next : 0;

    setShowLoadMore(false);

    // Forcefully set the startindex to 0 as we are replacing the whole data
    if (replace) {
      startIndex = 0;
    }

    // form the query
    query += `&limit=${LIMIT}&start=${startIndex}`;
    const response = await fetch(`${searchUniversitiesUrl}?${query}`);

    if (response.status === 200) {
      response
        .json()
        .then(res => {
          setLoading(false);

          if (res.data) {
            setErrorDetails(false);
            if (replace) {
              // replace the data
              setUniversities(res.data);
            } else {
              // append to the data
              setUniversities((prev) => [...universities, ...res.data]);
            }

            /**
             *  if the fetched result is less than the per page limit, 
             *  then there is no point in showing the load more button
             */
            if (res.total_count <= res.limit || res.total_count < res.next) {
              setShowLoadMore(false);
            } else {
              setShowLoadMore(true);
            }

            // this is to catch the pagination out of bounds exception.
            return setMetaData({
              totalCount: res.total_count,
              limit: res.limit,
              next: res.next
            });
          }

          setShowLoadMore(false);
          setErrorDetails({
            status: 200,
            message: res.message
          });

        })
        .catch(err => {
          setShowLoadMore(false);
          setLoading(false);
          setErrorDetails({ status: 400, message: err });
          setUniversities([]);
        });
    }
    else {
      setShowLoadMore(false);
      setLoading(false);
      setErrorDetails({
        status: response.status,
        message: response.message
      });
    }
  }

  /**
   * One time thing - pre-fetch
   */
  useEffect(() => {
    getAllDomains();
    getCountryCodes();
  }, []);

  /**
   * Runs everytime the filters are changed
   */
  useEffect(() => {
    // console.log(selectedDomain, selectedCountryCode, searchKeyword);
    let queryString = `q=${encodeURIComponent(searchKeyword)}`;
    if (selectedDomain !== 'All') {
      queryString += `&domain=${encodeURIComponent(selectedDomain)}`;
    }

    if (selectedCountryCode !== 'All') {
      queryString += `&code=${encodeURIComponent(selectedCountryCode)}`;
    }

    setSearchQuery(queryString);
    searchUniversities(queryString, true);

  }, [selectedDomain, selectedCountryCode, searchKeyword]);


  ///////////////////


  if (loading) {
    return <BusyIndicator />;
  }

  // Handle errors 
  if (errorDetails) {
    return (
      <Col sm={12} md={{ span: 8, offset: 2 }}>
        <ErrorAlert
          error={errorDetails}
          closeError={handleCloseError}
        />
      </Col>
    );
  }

  // render data
  return (
    <>
      <Row>
        <Col sm={12} md={{ span: 6, offset: 3 }} className="text-center">
          <Filters
            domains={domains}
            selectedDomain={selectedDomain}
            countryCodes={countryCodes}
            selectedCountryCode={selectedCountryCode}
            searchKeyword={searchKeyword}
            handleFiltersChange={handleFiltersChange}
          />
        </Col>
      </Row>

      <Row>
        {universities && (
          universities.length < 1
            ? <p className="mt-4 text-center">No data found.</p>
            : universities.map((university, index) => <UniCard key={index} data={university} />)
        )}

        <br />
        {showLoadMore && (
          <Col sm={12} className="text-center mb-3 mt-2">
            <Button
              className="load-more-btn"
              onClick={() => onLoadMore()}>
              Load more
            </Button>
          </Col>
        )}
      </Row>
    </>
  );
};

export default Home;
