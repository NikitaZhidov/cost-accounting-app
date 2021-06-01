import React from "react";
import ContentLoader from "react-content-loader";

const CategoryLoading = () => {
  return (
    <ContentLoader
      speed={2}
      width={80}
      height={78}
      viewBox="0 0 80 78"
      backgroundColor="#f3f3f3"
      foregroundColor="#ffffff"
    >
      <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
      <circle cx="37" cy="26" r="22" />
      <rect x="14" y="56" rx="4" ry="4" width="48" height="11" />
    </ContentLoader>
  );
};

export default CategoryLoading;
