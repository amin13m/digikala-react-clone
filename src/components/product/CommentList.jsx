import React from 'react'

function CommentList({c}) {
    return (
        <div
                        key={c.id}
                        className="border-b pb-3 mb-3 dark:border-gray-700"
                    >
                        <div className="flex justify-between mb-1">
                            <span className="font-bold dark:text-white">{c.username}</span>
                            <span className="text-yellow-500">{c.rating} ⭐</span>
                        </div>
                        <p className="dark:text-gray-300">{c.text}</p>
                        <p className="text-xs text-gray-400 mt-1">{c.date}</p>
                    </div>
    )
}


export default React.memo(CommentList)