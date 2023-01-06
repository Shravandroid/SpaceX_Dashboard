import React from 'react';

export function LaunchCard({ launch, showModal }) {
  return (
    <div style={{textAlign: 'center', display:'flex', justifyContent: 'space-between', padding: '10px'}}>
      <h2  style={{display:"flex",justifyContent:"space-around",textAlign:"justify"}}>{launch.mission_name}</h2>
      <p>Launch Date: {launch.launch_date_local}</p>
      <p>Launch Status: {launch.launch_success ? 'Success' : 'Failed'}</p>
      <button type="button" onClick={() => showModal(launch)}>
        View details
      </button>
    </div>
  );
}