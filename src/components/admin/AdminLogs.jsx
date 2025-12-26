import React, { useEffect, useState } from "react";
import { AdminLogAPI } from "../../api/api";
import { useAuth } from "../../context/AuthContext";

export default function AdminLogs() {
  const { user } = useAuth();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user ||( user.role !== "admin" && user.role !== "superAdmin")) {
      setLoading(false);
      return
    };

    AdminLogAPI.getByAdminId(user.id).then((res) => {
      setLogs(res.data.reverse());
      setLoading(false);
    });
  }, [user]);

  if (loading) return <p>Loading admin logs...</p>;

  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded shadow max-w-fill">
      <h2 className="text-lg font-bold mb-4">Admin Activity Log</h2>

      {logs.length === 0 && (
        <p className="text-gray-500">No logs found.</p>
      )}

      <div className="space-y-3">
        {logs.map((log) => (
          <div
          dir="ltr"
            key={log.id}
            className="border rounded p-3 dark:border-gray-700"
          >
            <p className="text-sm font-semibold">
              Action: <span className="text-blue-600">{log.action}</span>
            </p>

            <p className="text-sm">
              Product ID: <b>{log.productId}</b>
            </p>
            
            
            {log.action === "UPDATE_PRODUCT" &&

            <div className="text-xs mt-2 grid grid-cols-2 gap-2">
              <div>
                <p className="font-bold">Before</p>
                <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded">
                  {JSON.stringify(log.before, null, 2)}
                </pre>
              </div>

              <div>
                <p className="font-bold">After</p>
                <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded">
                  {JSON.stringify(log.after, null, 2)}
                </pre>
              </div>
            </div>}



            {log.action === "ADD_PRODUCT" &&
            <div className="text-xs mt-2 grid grid-cols-1 gap-2 overflow-hidden overflow-x-scroll">
              <div className="text-xs mt-2">
                <p className="font-bold">New Product Data</p>
                <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded">
                  {JSON.stringify(log.after, null, 2)}
                </pre>
              </div>
              </div>
            }


            <p className="text-xs text-gray-500 mt-2">{log.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}