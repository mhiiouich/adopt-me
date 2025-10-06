import { Link } from "react-router-dom";
export const Pet = ({name, animal, breed, location, images = [], id }) => {
    const heroImage = images.length ? images[0] : "https://via.placehold.co/300";
    return (
        <Link  to={`/details/${id}`} className="pet">
            <div className="pet">
                <div className="image-container">
                <img src={heroImage} alt={animal}/>
                </div>
                <div className="info">
                    <h2>{name}</h2>
                    <h3>{animal} - {breed}</h3>
                    <p>{location}</p>
                </div>
            </div>
        </Link>
    )
}

export default Pet;