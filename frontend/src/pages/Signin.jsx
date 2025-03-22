import React, { useState } from "react";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("");
    const navigate = useNavigate()
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="bg-white rounded-lg w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign In"} />
          <SubHeading label={"Enter your email and password to sign in."} />
          <InputBox onChange={(e)=>{setUsername(e.target.value)}}  label={"Email"} placeholder="hv97@gmail.com" />
          <InputBox onChange={(e) =>{setPassword(e.target.value)}} label={"Password"} placeholder="jaiganesh" />
          <div className="pt-4">
            <Button onClick={async ()=>{
                const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
                    username,
                    password
                })
                localStorage.setItem("token",response.data.token)
                navigate("/dashboard")  
            }} label={"Sign In"} />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign Up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};
