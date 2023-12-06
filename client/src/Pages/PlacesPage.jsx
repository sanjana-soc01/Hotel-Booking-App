import { Link, Navigate, useParams } from "react-router-dom";
import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import PlaceImg from "../PlaceImg";
export default function PlacesPage(){
    const [places, setPlaces] = useState([]);
    useEffect(() => {
        axios.get('/user-places').then(({data}) => {
            setPlaces(data); 
        })
    },[]);

    const handleDelete = (id) =>{
        //ev.preventDefault();
        
        axios.delete('/account/places/'+id)
        .then(res => {console.log(res)
        window.location.reload()})
        .catch(err => console.log(err))
        //setRedirect(true);
        alert("House Deleted");
    }

    return(
        <div>
            <AccountNav />
            <div className="text-center">
                <Link className="inline-flex gap-1 bg-primary text-white  py-2 px-6 rounded-full " to={'/account/places/new'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                    Add House
                </Link>
            </div>
            <div className="mt-4">
                {places.length > 0 && places.map(place => (
                    <Link to={'/account/places/' +place._id} key={place._id} className="flex cursor-pointer gap=4 p-4 m-4 rounded-2xl">                    
                        <div className="flex w-36 h-36 shrink-0">
                        <PlaceImg place={place} />
                        </div>
                       <div className="flex gap-32">
                            <div className="grow-0 shrink p-2">
                                <h2 className="text-xl">{place.title}</h2>
                                <p className="text-sm mt-2">{place.description}</p>
                            </div>
                            <div>
                                <button className="primary my-4" 
                                        onClick={(e) => handleDelete(place._id)} >DELETE</button>
                            </div>
                       </div>
                    </Link>
            ))}
            </div>
        </div>
    );
}