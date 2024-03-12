
const ShimmerCard = () => {
  return (
    <div className="m-8 sm:m-12 border-b border-slate-200 animate-pulse">
        <div className="flex flex-row items-center gap-2">
            <div className="flex flex-row gap-2 md:gap-3 items-center justify-center">
                <div className=" bg-slate-200 p-5 rounded-full"></div>
                <div className=" bg-slate-200 p-2 rounded-lg w-20"></div>
                <div className=" bg-slate-200 p-2 rounded-lg w-20"></div>
            </div>
        </div>
        <div className="font-bold text-3xl mt-3 bg-slate-200 p-5 rounded-lg"></div>
        <div className="bg-slate-200 p-2 rounded-lg mt-4"></div>
        <div className="bg-slate-200 mt-2 p-2 rounded-lg"></div>
        <div className="mt-6 mb-6 bg-slate-200 p-1 rounded-lg w-16"></div>
    </div>
  )
}

export default ShimmerCard
