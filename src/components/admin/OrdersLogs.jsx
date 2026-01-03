import React, { useEffect, useState } from "react";
import { AdminLogAPI, OrderAPI } from "../../api/api";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function OrdersLogs() {
  const { user } = useAuth();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== "superAdmin") {
        setLoading(false);
        return
    }
    let getLogs = async () => {
      try{await OrderAPI.getAll().then((res) => {
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

  if(!user || user.role !== "superAdmin") return <p className="bg-white dark:bg-gray-900 p-4 rounded shadow"> Access Denied </p>

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
      <h2 className="text-xl font-bold mb-4">All User Order Logs</h2>

      <div className="space-y-4">
        {logs.map((log) => (<div
          dir="ltr"
            key={log.id}
            className="border rounded p-3 dark:border-gray-700"
          >
            <p className="text-sm font-semibold">
              Action: <span className="text-blue-600">buy</span>
            </p>

            <p className="text-sm">
              Order ID: <b><Link  >
                 {log.id}
              </Link></b>
            </p>
                
            <p  className="text-sm ">
                User ID: <b>{log.userId}</b>
            </p>
            
    

            
            <div className="text-xs mt-2 grid grid-cols-1 gap-2 overflow-hidden overflow-x-scroll">
              <div className="text-xs mt-2">
                <p className="font-bold">items</p>
                <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded">
                  {log.items.map((item, index)=>(
                    <div key={index} className="border-b-2 border-b-gray-300 mb-2 pb-2">
                     <Link to={`/product/${JSON.parse(item.productId)}`}>productId: {item.productId} ({item.name})</Link>
                      <div>quantity: {item.quantity} </div>
                      <div>price: {item.price.toLocaleString()} </div>
                      <div>discount: {item.discount} </div>

                    </div>)
                  )
                  }
                  <p className="font-bold">totalPrice: {log.total.toLocaleString()}</p>
                </pre>
              </div>
            </div>
            


            <p className="text-xs text-gray-500 mt-2">{log.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
