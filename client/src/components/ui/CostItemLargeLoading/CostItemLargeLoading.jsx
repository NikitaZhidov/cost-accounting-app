import React from "react";
import ContentLoader from "react-content-loader";

const CostItemLargeLoading = () => {
  return (
    <div style={{ width: "100%" }}>
      <ContentLoader
        speed={2}
        width={1056}
        height={72}
        viewBox="0 0 1056 72"
        backgroundColor="#f3f3f3"
        foregroundColor="#ffffff"
        style={{ width: "100%" }}
      >
        <rect x="71" y="15" rx="0" ry="0" width="186" height="7" />
        <rect x="1000" y="30" rx="0" ry="0" width="50" height="20" />
        <circle cx="24" cy="39" r="19" />
        <rect x="63" y="35" rx="0" ry="0" width="850" height="25" />
      </ContentLoader>
    </div>
  );
};

export default CostItemLargeLoading;
