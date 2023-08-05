import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";

export default function PlacePage() {
    const {id} = useParams();
    const [place,setPlace] = useState(null);
    
    useEffect(() => {
        if (!id) {
          return;
        }
        axios.get(`/places/${id}`).then(response => {
          setPlace(response.data);
        });
    }, [id]);
    
    if (!place) return '';

    

    return(
        <div className="mt-4 bg-black text-white mx-8 px-8 pt-8 rounded-3xl">
            <h1 className="text-3xl">{place.title}</h1>
            <AddressLink className="bg-black text-white">
                {place.address}
            </AddressLink>
            <PlaceGallery place={place} className="bg-black"/>
            <div className="mt-8 mb-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
                <div>
                    <div className="my-4">
                    <h2 className="bg-black text-whitefont-semibold text-2xl">Description</h2>
                    {place.description}
                </div>
                    <div className="border border-white rounded-xl p-4">
                    <b>Check-in: </b> {place.checkIn} <br />
                    <b>Check-out: </b> {place.checkOut} <br />
                    <b>Max-guests: </b> {place.maxGuests} <br />
                    
                    <div className="flex gap-2 rounded-xl">
                        <b>Perks: </b>                    
                        <div className="flex gap-4">
                            {place?.perks?.length > 0 && place.perks.map(perks => (
                                <h1>{perks}</h1> 
                            ))}
                        </div>
                    </div>
                    </div>
                </div>
                <div>
                    <BookingWidget place={place}/>
                </div>
            </div>
                
            <div className="bg-black text-white -mx-8 px-8 py-8 border-t rounded-3xl">
                <div>
                    <h2 className="font-semibold text-2xl">Extra info</h2>
                </div>
                <div className="mt-2 mb-4 text-sm text-gray-400 leading-5">{place.extraInfo}</div>    
            </div>
            
        </div>
    );
}