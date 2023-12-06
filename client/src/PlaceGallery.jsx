import { useState } from "react";

export default function PlaceGallery({place}){
    const [showAllPhotos,setShowAllPhotos] = useState(false);
    
    if(showAllPhotos){
        return (
            <div className="absolute inset-0 bg-black text-white min-h-screen">
                <div className="bg-black p-8 gap-4">
                    <div>
                        <h2 className="text-2xl mr-48">Photos of {place.title}</h2>
                        <button onClick={() => setShowAllPhotos(false)} className="fixed right-4 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Close photos
                        </button>
                    </div>

                    {place?.photos?.length > 0 && place.photos.map(photo => (
                        <div className="">
                            <img className="p-4 mt-2 mb-4 border border-white h-96 w-120 mx-auto" src={'http://localhost:4000/uploads/'+photo} />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return(
        <div className=" flex gap-4 right-16">
            <div className="flex gap-20 mt-2 px-14">
                
            {place.photos?.[0] && (
                            <img onClick={() => setShowAllPhotos(true)} className="bg-black p-2 cursor-pointer border border-black h-96 w-120" src={'http://localhost:4000/uploads/'+place.photos[0]} />
                        )}
            {place.photos?.[1] && (
                            <img onClick={() => setShowAllPhotos(true)} className="bg-black p-2 cursor-pointer border border-black h-96 w-120" src={'http://localhost:4000/uploads/'+place.photos[1]}></img>
                
                )}

            <button onClick={() => setShowAllPhotos(true)} className="text-white flex gap-1 absolute bottom-36 right-40 rounded-2xl border border-black">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                </svg>
            show more photos
            </button>   
            </div>
            
        </div>
    )
}