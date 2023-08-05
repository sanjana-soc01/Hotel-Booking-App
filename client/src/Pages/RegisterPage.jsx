import { Link, Navigate } from "react-router-dom";
import {useState} from "react";
import axios from "axios";

export default function RegisterPage(){
    const[name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    
    async function registerUser(ev){
        ev.preventDefault();
        try{
            await axios.post('/register', {
                name,
                email,
                password
            })
            alert('Registration Successful. Now you can log in.');
        }
        catch(e){
            alert('Registration Failed. Please try again.')
        }
    }
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form className="max-w-md mx-auto" onSubmit={registerUser} >
                    <input className="border-2 border-gray-600" 
                            type="text" 
                            placeholder="Your Name" 
                            value={name} 
                            required
                            onChange={ev => setName(ev.target.value)}/>

                    <input className="border-2 border-gray-600" 
                            type="email" 
                            placeholder="Your@email.com"
                            value={email} 
                            required
                            onChange={ev => setEmail(ev.target.value)} />

                    <input className="border-2 border-gray-600" 
                            type="password" 
                            placeholder="Password"
                            value={password} 
                            required
                            onChange={ev => setPassword(ev.target.value)} />

                    <button  className="border-2 border-gray-600 w-full">Register</button>
                    
                    <div className="text-center py-2 text-gray-500">
                        Already a member ?  
                        <Link className="underline text-black" to={'/login'}><b><i>Click here to Login</i></b></Link>
                    </div>
                    
                </form>
            </div>
        </div>
    );

}
