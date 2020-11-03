import React from "react";

const prizeStyle = {
  maxWidth: "275px",
  height: "auto",
  padding: "10px",
};

const PrizeSponsors = ({ sponsors }) => {
  return (
    <div>
      {sponsors.map((sponsor) => (
        <img
          src={sponsor.logo}
          alt={sponsor.name}
          key={sponsor.name}
          style={prizeStyle}
        />
      ))}
    </div>
  );
};

export default PrizeSponsors;
