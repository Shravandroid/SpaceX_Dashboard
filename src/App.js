import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LaunchCard } from './LaunchCard';
import { FilterForm } from './FilterForm';
import { LaunchModal } from './LaunchModal';
import image from './image/spacex.png'
import './style.css'
  
function Dashboard() {
  const [launches, setLaunches] = useState([]);
  const [filteredLaunches, setFilteredLaunches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({
    success: 'all',
    timeframe: 'all'
  });
  const [selectedLaunch, setSelectedLaunch] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await axios( 
          'https://api.spacexdata.com/v3/launches'
        );
        setLaunches(result.data);
        setFilteredLaunches(result.data);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filteredData = launches.filter(launch => {
      if (filter.success === 'all' && filter.timeframe === 'all') {
        return true;
      }
      if (filter.success !== 'all' && filter.timeframe === 'all') {
        return launch.launch_success === (filter.success === 'true');
      }
      if (filter.success === 'all' && filter.timeframe !== 'all') {
        const launchDate = new Date(launch.launch_date_local);
        if (filter.timeframe === 'upcoming') {
          return launchDate > new Date();
        }
        if (filter.timeframe === 'past') {
          return launchDate < new Date();
        }
      }
      if (filter.success !== 'all' && filter.timeframe !== 'all') {
        const launchDate = new Date(launch.launch_date_local);
        if (filter.timeframe === 'upcoming') {
          return (
            launchDate > new Date() &&
            launch.launch_success === (filter.success === 'true')
          );
        }
        if (filter.timeframe === 'past') {
          return (
            launchDate < new Date() &&
            launch.launch_success === (filter.success === 'true')
          );
        }
      }
      return false; // Add this line
    });
    setFilteredLaunches(filteredData);
    updateURL();
  }, [filter, launches]);
  

  const updateURL = () => {
    const params = new URLSearchParams();
    params.set('success', filter.success);
    params.set('timeframe', filter.timeframe);
    window.history.replaceState(
      {},
      '',
      `${window.location.pathname}?${params.toString()}`
    );
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const success = params.get('success');  
    const timeframe = params.get('timeframe');
    if (success || timeframe) {
      setFilter(prevFilter => ({
        ...prevFilter,
        success: success || 'all',
        timeframe: timeframe || 'all'
      }));
    }
  }, []);

  if (error) {
    return <p>An error occurred: {error.message}</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const showModal = launch => {
    setSelectedLaunch(launch);
  };

  const closeModal = () => {
    setSelectedLaunch(null);
  };

  return (
    
    <div className='main-div'>
      <img src={image} />
      <FilterForm filter={filter} setFilter={setFilter} />
      {filteredLaunches.length > 0 ? (
        filteredLaunches.map(launch => (
          <LaunchCard
            key={launch.flight_number}
            launch={launch}
            showModal={showModal}
          />
        ))
      ) : (
        <p className='launch-card'>No launches found</p>
      )}
      {selectedLaunch && (
        <LaunchModal launch={selectedLaunch} closeModal={closeModal} />
      )}
    </div>
  );
}

export default Dashboard;

