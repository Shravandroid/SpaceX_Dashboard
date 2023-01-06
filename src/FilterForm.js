import React from 'react';

export function FilterForm({ filter, setFilter }) {
  return (
    <form style={{display: 'flex' ,justifyContent: 'space-between'}}>
      <label htmlFor="success">
        Launch Status:
        <select
          id="success"
          name="success"
          value={filter.success}
          onChange={event =>
            setFilter({ ...filter, success: event.target.value })
          }
        >
          <option value="all">All Launches</option>
          <option value="true">Success</option>
          <option value="false">Failed</option>
        </select>
      </label>
      <label htmlFor="timeframe">
        Timeframe:
        <select
          id="timeframe"
          name="timeframe"
          value={filter.timeframe}
          onChange={event =>
            setFilter({ ...filter, timeframe: event.target.value })
          }
        >
          <option value="all">All Launches</option>
          <option value="upcoming">Upcoming Launches</option>
          <option value="past">Past Launches</option>
        </select>
      </label>
    </form>
  );
}


