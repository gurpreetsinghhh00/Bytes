
type ButtonType = {
  children : any
  type? : "submit" | "button" | "reset",
  bgColor? : string,
  textColor? :string,
  className? :string,
  onClick? : (e : React.MouseEvent<HTMLButtonElement>) => void,
}

const Button = ({
  children,
  type,
  textColor = "text-white",
  bgColor = "bg-gray-900",
  className = "",
  onClick } : ButtonType) => {
 return (
  <button
  type={type || "button"}
  className={`hover:bg-black rounded-md p-2 font-light w-full ${bgColor} ${textColor} ${className}`}
  onClick={onClick}
>
  {children}
</button>
 )
};

export default Button;
