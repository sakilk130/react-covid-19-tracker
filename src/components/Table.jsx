import numeral from 'numeral';
import React from 'react';

import '../styles/Table.css';

function Table({ countries }) {
  return (
    <div className="table">
      {countries.map(({ country, cases }) => (
        <tr>
          <td>{country}</td>
          <td>{numeral(cases).format('0,0')}</td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
