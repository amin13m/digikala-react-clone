import React, { useState } from "react";
import ProfileSidebar from "../components/profile/ProfileSidebar";
import ProfileMobileMenu from "../components/profile/profileMobileMeno";

export default function Profile() {
  const [active, setActive] = useState("info");

  const renderSection = () => {
    switch (active) {
      
      default: return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-8 flex gap-6 p-3">
      
      <ProfileSidebar active={active} onChange={setActive} />

      <div className="flex-1">
        <ProfileMobileMenu active={active} onChange={setActive} />

        {renderSection()}
      </div>
    </div>
  );
}