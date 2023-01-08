import React from 'react';


export function LaunchModal({ launch, closeModal }) {
    return (
      <div className='launch-modal'>
        <div className='launch-overlay'>
            <h2>{launch.mission_name}</h2>
            <p>Launch Date: {launch.launch_date_local}</p>
            <p>Launch Status: {launch.launch_success ? 'Yes' : 'No'}</p>
            <button className='button-width' type="button" onClick={closeModal}>Close</button>
        </div>
      </div>
    );
  }
  