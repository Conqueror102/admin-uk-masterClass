import React from 'react'

const Counter = ({icon, status,num,className}) => {
  return (
    <div>
          <div className={`bg-white p-5 max-sm:p-2 rounded-xl flex gap-5 max-sm:gap-2 shadow-md `}>
            <div className={`rounded-full h-12 w-12 max-sm:h-8 max-sm:w-8  flex ${className} items-center justify-center text-2xl max-sm:text-lg `}>
              {icon}
            </div>
            <div>
            <p className="text-lg max-sm:text-[16px] font-medium text-gray-500">{status}</p>
            <p className="text-2xl font-semibold">{num}</p>
            </div>
          </div>
    </div>
  )
}

export default Counter