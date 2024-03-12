const Avatar = ({name} : {name : string}) => {
  return ( 
<div className="relative inline-flex items-center justify-center w-9 h-9 overflow-hidden bg-gray-900 rounded-full">
    <span className="font-medium text-white">{name[0]}</span>
</div>

  )
}

export default Avatar
