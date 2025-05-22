// src/layout/Layout.tsx
import React from "react";

interface LayoutProps {
  onAddClick: () => void;
}

const Layout: React.FC<LayoutProps> = ({ onAddClick }) => {
  // your layout content here, using onAddClick prop as needed

  return <div>{/* layout content */}</div>;
};

export default Layout;
