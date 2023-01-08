import React from 'react';

export function LaunchCard({ launch, showModal }) {
  return (
    <div className='launch-card' >
          <p className='launch-width'>{launch.mission_name}</p>
          <p className='launch-date'>Launch Date: {launch.launch_date_local}</p>
          <p className='launch-status'>Launch Status: {launch.launch_success ? 'Success' : 'Failed'}</p>
          <button className='button-width' type="button" onClick={() => showModal(launch)}>View details</button>

    </div>
  );
  }