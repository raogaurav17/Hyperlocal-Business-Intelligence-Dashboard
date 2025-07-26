const Menu = () => {
  return (
    <div className="w-screen flex flex-wrap justify-around items-center mb-6">
        <button className="mb-6 rounded min-w-[15%] max-w-[200px] bg-gray-800 text-white font-semibold border border-gray-700">Geographic Heatmaps</button>
        <button className="mb-6 rounded min-w-[15%] bg-gray-800 text-gray-300 font-semibold border border-gray-700">Predictive Analytics</button>
        <button className="mb-6 rounded min-w-[15%] bg-gray-800 text-gray-300 font-semibold border border-gray-700">Competitor Intel</button>
        <button className="mb-6 rounded min-w-[15%] bg-gray-800 text-gray-300 font-semibold border border-gray-700">Real-Time Monitor</button>
    </div>
  )
}

export default Menu