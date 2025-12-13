import React, { useState, useCallback } from "react";
import { useAuth } from "../../context/AuthContext";
import PasswordInput from "../ui/PasswordInput";


export default function ProfileChangePassword() {
  const { updatePassword } = useAuth();

  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [repeatPass, setRepeatPass] = useState("");

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showRepeat, setShowRepeat] = useState(false);

  // جلوگیری از ساخت دوباره توابع (برای مدل بهتر)
  const toggleOld = useCallback(() => setShowOld((s) => !s), []);
  const toggleNew = useCallback(() => setShowNew((s) => !s), []);
  const toggleRepeat = useCallback(() => setShowRepeat((s) => !s), []);

  const submit = async () => {

    if (!oldPass || !newPass || !repeatPass) {
        alert("لطفا همه فیلدها را پر کنید");
        return;
    }

    if (newPass.length < 6) {
      alert("رمز جدید باید حداقل 6 کاراکتر باشد");
      return;
    }

    if (newPass !== repeatPass) {
      alert("رمز جدید و تکرار آن یکسان نیستند");
      return;
    }

    try {
      await updatePassword(oldPass, newPass);
      alert("رمز عبور با موفقیت تغییر کرد");

      setOldPass("");
      setNewPass("");
      setRepeatPass("");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="p-5 bg-white dark:bg-gray-900 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">تغییر رمز عبور</h2>

      <PasswordInput
        label="رمز فعلی"
        value={oldPass}
        setValue={setOldPass}
        show={showOld}
        toggleShow={toggleOld}
      />

      <PasswordInput
        label="رمز جدید (حداقل 6 کاراکتر)"
        value={newPass}
        setValue={setNewPass}
        show={showNew}
        toggleShow={toggleNew}
      />

      <PasswordInput
        label="تکرار رمز جدید"
        value={repeatPass}
        setValue={setRepeatPass}
        show={showRepeat}
        toggleShow={toggleRepeat}
      />

      <button
        onClick={submit}
        className="mt-3 w-full p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
      >
        تغییر رمز
      </button>
    </div>
  );
}