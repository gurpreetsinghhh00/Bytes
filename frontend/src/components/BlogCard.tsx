import Avatar from "./Avatar"

interface BlogCardType {
    id: string,
    authorName : string,
    title : string,
    content : string,
    publishDate : string,
}

const BlogCard = ({id, authorName, title, content, publishDate} : BlogCardType) => {
  return (
    <div className="m-8 sm:m-12 border-b border-slate-200 ">
        <div className="flex flex-row items-center gap-2">
            <Avatar name={authorName}/>
            <div className="flex flex-row gap-2 md:gap-3 items-center justify-center">
                <div className="text-sm">{authorName}</div>
                <div className="rounded-full bg-slate-500 w-1 h-1"></div>
                <div className="text-xs text-slate-500">{publishDate}</div>
            </div>
        </div>
        <div className="font-bold text-3xl mt-3">{title}</div>
        <div className="text-slate-700 mt-2">{`${content.slice(0, 150)}${content.length > 100 ? "..." : ""}`}</div>
        <div className="mt-6 mb-6 text-xs text-slate-400">{`${Math.ceil(content.length / 100)} min read`}</div>
    </div>
  )
}

export default BlogCard
