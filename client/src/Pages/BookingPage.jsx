import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";
import BookingDates from "../BookingDates";

export default function BookingPage(){
    const {id} = useParams();
    const [booking,setBooking] = useState(null);
    const [redirect,setRedirect] = useState(false);
    useEffect(() => {
        if(id){
            axios.get('/bookings').then(response => {
                const foundBooking = response.data.find(({_id}) => _id === id);
                if (foundBooking) {
                    setBooking(foundBooking);
                  }
            })
        }
    },[id]);
    if (!booking) {
        return '';
    }
    
    const deleteBooking = (id) =>{
        axios.delete('/account/bookings/'+id)
        .then(res => setRedirect(true))
        .catch(err => console.log(err))
        alert("Booking Deleted");
    }
    if (redirect){
        return <Navigate to={'/account/bookings'} />
    }

    return (
        <div className="p-12 bg-white">
            <h1 className="text-3xl">{booking.place.title}</h1>
            <AddressLink className="my-2 block">{booking.place.address}</AddressLink>
            <PlaceGallery place={booking.place}/>
            <div className="bg-gray-200 p-6 my-6 rounded-2xl">
                <div className="flex px-8 gap-24">
                    <div>
                        <h2 className="text-2xl">Your booking information:</h2>
                        <BookingDates booking={booking} />
                    </div>
                    <div className="text-2xl font-bold">
                        <div>Total price</div>
                        <div className="text-xl">${booking.price}</div>
                    </div>
                    <div className="flex gap-24">
                        <button onClick={(e) => deleteBooking(booking._id)} className="p-2 rounded-xl text-white px-14 bg-primary" >Delete booking</button>
                        <button className="p-2 rounded-xl text-white px-14 bg-primary"><Link to={'/account/bookings'}>View Your Bookings</Link></button>
                    </div>
                </div>
                
            </div>       
        </div>
    );
}