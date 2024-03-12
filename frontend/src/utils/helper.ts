export const validate = (email : string, password : string) => {
    const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
      email
    );
    const isPasswordValid =
      /^.{6,}$/.test(password);
  
    if (!isEmailValid) return "Enter a valid email.";
    if (!isPasswordValid)
      return "Password length must be atleast 6."
  
    return null;
  };

  export const formattedDate = (timeStamp : any)=>{
    const date = new Date(timeStamp);
    return date.toDateString();
  }