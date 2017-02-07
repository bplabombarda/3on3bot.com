import React from 'react';

require('./Demo.scss');

function Demo() {
  return (
    <div className="mainContainer">
      <div id="mainHeader">Hang on! We are almost there!</div>
      <div className="imageContainer">
        <img className="mainImage" alt="Work in progress!" src="../images/jetsons.gif" />
      </div>
    </div>
  );
}

module.exports = Demo;
