import HeaderPage from "@/components/HeaderPage";
import React from "react";

const Organization = () => {
  return (
    <div className="space-y-4">
      {/* Header */}
      <HeaderPage
        title="Organization"
        description="Manage and organize your projects"
        showButton={false}
      />
    </div>
  );
};

export default Organization;
