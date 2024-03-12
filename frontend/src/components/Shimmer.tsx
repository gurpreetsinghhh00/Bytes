import ShimmerCard from "./ShimmerCard"

const Shimmer = () => {
  return (
    <div className="font-varela w-full md:w-4/5  xl:w-3/4 m-auto">
    {
      Array(10).fill("").map((_, index)=>(
        <ShimmerCard key={index}/>
      ))
    }
  </div>)
}

export default Shimmer
