import Pet from './Pet';

export const Result  = ({ pets }) => {
    //pets is an array
    return (
        <div className="search-results">
            {pets.lenght === 0 ? (
                <h2> No Pets Found</h2>
            ) : (
                pets.map((pet) => (
                    <Pet
                       key={pet.id}
                       id={pet.id}
                       name={pet.name}
                       animal={pet.animal}
                       breed={pet.breed}
                       images={pet.images}
                       location={`${pet.city}, ${pet.state}`}
                    />
                ))
            )}
        </div>
    )
}

export default Result;