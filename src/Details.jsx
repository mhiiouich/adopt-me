import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {URL} from "./constante";

const Details = () => {
    const {id} = useParams();
    const [pet,setPet] = useState(null);
    const [loading,setLoading] = useState(false);
    const [selectedImage,setselectedImage] = useState(0);

    useEffect(()=> {
        loadPet();
    }, [id])

    async function loadPet() {
        setLoading(true);
        try {
           const response = await fetch(URL+ "/pets/" + id);
           const data = await response.json();
           setPet(data);
        }catch(err){
            console.error(err.message);
        }finally{
            setLoading(false);
        }
    }
    if (loading) {
        return <h2> Loading Pet Detail ... </h2>;
    }
    if (!pet){
        return <h2> No pet found</h2>;
    }

    return (
      <div className="details">
        <div className="carousel">
            <img src={pet.images[selectedImage]} alt={pet.name}/>
            <div className="carousel-thumbnails">
                {pet.images.map((image,index) => (
                    <img 
                        src={image} 
                        key={image} 
                        name={pet.name}
                        className={index === selectedImage ? "active" : ""}
                        onClick={() => setselectedImage(index)}
                    />
                ))}
            </div>
        </div>
        <div className="pet-details">
            <h1>{pet.name}</h1>
            <h2> {pet.animal} - {pet.breed} </h2>
            <h3>{pet.city}, {pet.state}</h3>
            <p>{pet.description}</p>
            <button className="adopt-button"> Adopt {pet.name}</button>
        </div>
      </div>
    )
}
export default Details;