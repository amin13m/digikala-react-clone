import React, { useState } from "react";
import ProfileSidebar from "../components/profile/ProfileSidebar";
import ProfileMobileMenu from "../components/profile/profileMobileMeno";
import ProfileInfo from "../components/profile/prohileInfo";
import ProfileEditName from "../components/profile/ProfileEditName";
import ProfileChangePassword from "../components/profile/profileEditPassword";
import ProfileWallet from "../components/profile/ProfileWallet";
import Orders from "../components/profile/Orders";

 

export default function Profile() { 

  const [active, setActive] = useState("info");

  const renderSection = () => {
    switch (active) {
      case "info": return <ProfileInfo />;
      case "name": return <ProfileEditName />;
      case "password": return <ProfileChangePassword />;
      case "wallet": return <ProfileWallet />;
      case "orders": return <Orders />;
      default: return null;
    }
  };

  const menus = [
    { key: "info", label: "اطلاعات حساب" },
    { key: "name", label: "تغییر نام" },
    { key: "password", label: "تغییر رمز" },
    { key: "wallet", label: "مدیریت کیف پول" },
    { key: "orders", label: "سفارشات من" },
  ];


  return (
    <div className="max-w-6xl mx-auto mt-8 flex gap-6 p-3 min-h-[calc(100vh-300px)]">
      
      <ProfileSidebar active={active} onChange={setActive} menus={menus} />
      <div className="flex-1">
        <ProfileMobileMenu active={active} onChange={setActive} menus={menus}/>

        {renderSection()}
      </div>
    </div>
  );
}