import React, { useEffect, useState } from "react";
import { AdminLogAPI } from "../../api/api";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function SuperAdminLogs() {
  const { user } = useAuth();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== "superAdmin") {
        setLoading(false);
        return
    }
    let getLogs = async () => {
      try{await AdminLogAPI.getAll().then((res) => {
        setLogs(res.data.reverse());
      });}
      catch(err){
        console.log(err)
      }
      finally{
        setLoading(false);
      }

    };

    getLogs();
  }, [user]);

  if (loading) return <p>Loading logs...</p>;

  if(!user || user.role !== "superAdmin") return <p className="bg-white dark:bg-gray-900 p-4 rounded shadow"> Access Denied  </p>

  if (logs.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 p-4 rounded shadow">
        <h2 className="text-lg font-bold mb-4">Admin Activity Log</h2>
        <p className="text-gray-500">No logs found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">All Admin Activity Logs</h2>

      <div className="space-y-4">
        {logs.map((log) => (<div
          dir="ltr"
            key={log.id}
            className="border rounded p-3 dark:border-gray-700"
          >
            <p className="text-sm font-semibold">
              Action: <span className="text-blue-600">{log.action}</span>
            </p>

            <p className="text-sm">
              Product ID: <b><Link src={`/product/${log.productId}`} >
                 {log.productId}
              </Link></b>
            </p>
                
            <p  className="text-sm ">
                By Admin: <b>{log.adminId}</b>
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
