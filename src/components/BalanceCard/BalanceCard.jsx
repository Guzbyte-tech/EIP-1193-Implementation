import React from 'react'

const BalanceCard = ({ balance }) => {
  return (
    <>
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg mt-8 border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Your Balance</h2>
            <span className="text-sm text-gray-500">Ethereum</span>
          </div>

          <div className="flex items-center space-x-2 mb-6">
            <span className="text-3xl font-bold">{ balance }</span>
            <span className="text-gray-500 text-sm">ETH</span>
          </div>
        </div>
    </>
  )
}

export default BalanceCard