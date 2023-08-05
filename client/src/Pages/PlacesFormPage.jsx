import PhotosUploader from "../PhotosUploader";
import Perks from "../Perks";
import { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";

export default function PlacesFormPage(){
    const {id} = useParams();
    const [title,setTitle] = useState('');
    const [address,setAddress] = useState('');
    const [addedPhotos,setAddedPhotos] = useState([]);
    const [description,setDescription] = useState('');    
    const [perks,setPerks] = useState([]);
    const [extraInfo,setExtraInfo] = useState('');
    const [checkIn,setCheckIn] = useState('');
    const [checkOut,setCheckOut] = useState('');
    const [maxGuests,setMaxGuests] = useState(1);
    const [redirect,setRedirect] = useState(false);
    const [price,setPrice] = useState(100);
    
    useEffect(() => {
        if(!id){
            return;
        }
        axios.get('/places/'+id).then(response => {
            const {data} = response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
        });
    },[id]);


    function inputHeader(text){
        return(
            <h2 className="text-2xl mt-4">{text}</h2>
        )
    }
    function inputDescription(text){
        return(
            <p className="text-gray-500 text-sm ">{text}</p>
        )
    }
    function preInput(header,description){
        return(
            <>
                {inputHeader(header)}
                {inputDescription(description)}

            </>
        )
    }

    async function savePlace(ev) {
        ev.preventDefault();
        const placeData = {
            title, address, addedPhotos,
            description, perks, extraInfo,
            checkIn, checkOut, maxGuests,price,
          };
        if(id){
            await axios.put('/places', {
                id, ...placeData
            });
            setRedirect(true);
        }
        else {
            await axios.post('/places', placeData);
            setRedirect(true);
        }
        
    }
    function goBack(){
        setRedirect(true);
    }

    if (redirect){
        return <Navigate to={'/account/places'} />
    }
    return (
    <div>
        <AccountNav />
        <form onSubmit={savePlace}>
            {preInput('Title','Name for your hotel.')}
            <input className= "border-black" type = "text" placeholder="Title" value={title} onChange={ev=>setTitle(ev.target.value) }/>

            {preInput('Address','Address to this hotel.')}
            <input className= "border-black" type = "text" placeholder="Address" value={address} onChange={ev=>setAddress(ev.target.value)} />
            
            {preInput('Photos','Add photos of this hotel.')}
            <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
            

            {preInput('Description','Description of this hotel.')}
            <textarea value={description} onChange={ev=>setDescription(ev.target.value) } />
            
            {preInput('Perks','Select all the perks of your hotel.')}
            
            <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg-cols-6">
                <Perks selected={perks} onChange={setPerks}/>
            </div>
            
            {preInput('Extra info','Any other information of your hotel.')}
            <textarea value={extraInfo} onChange={ev=>setExtraInfo(ev.target.value) }/>
            
            {preInput('Check in & out time','Remember to keep some time window.')}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div>
                    <h3 className="mt-2">Check in time</h3>
                    <input type="text" placeholder="13" 
                            value={checkIn} 
                            onChange={ev=>setCheckIn(ev.target.value) }/>
                </div>
                <div>
                    <h3 className="mt-2">Check out time</h3>
                    <input type="text" placeholder="13" 
                            value={checkOut} 
                            onChange={ev=>setCheckOut(ev.target.value) }/>
                </div>
                <div>
                    <h3 className="mt-2">Number of guests</h3>
                    <input type="number" 
                            value={maxGuests} 
                            onChange={ev=>setMaxGuests(ev.target.value) }/>
                </div>
                <div>
                    <h3 className="mt-2">Price per night</h3>
                    <input type="number" 
                            value={price} 
                            onChange={ev=>setPrice(ev.target.value) }/>
                </div>

            </div>
                    <div className="flex gap-32 px-16 py-8">
                    <button className="p-2 rounded-xl text-white px-64 bg-primary" >save</button>
                    <Link to={'/account/places'} className="p-2 rounded-xl text-white px-64 bg-primary" >Go Back</Link>
                    </div>
        </form>
      </div>
);
}