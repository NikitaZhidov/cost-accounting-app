import React from "react";
import ContentLoader from "react-content-loader";

const CostItemLoading = () => {
  return (
    <div style={{ width: "100%" }}>
      <ContentLoader
        speed={2}
        width={280}
        height={72}
        style={{ width: "100%" }}
        viewBox="0 0 380 72"
        backgroundColor="#f3f3f3"
        foregroundColor="#ffffff"
      >
        <rect x="60" y="10" rx="0" ry="0" width="94" height="6" />
        <rect x="60" y="25" rx="0" ry="0" width="250" height="15" />
        <rect x="330" y="18" rx="0" ry="0" width="35" height="15" />
        <circle cx="29" cy="27" r="25" />
      </ContentLoader>
    </div>
  );
};

export default CostItemLoading;
