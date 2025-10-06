import { useEffect, useState } from "react"
import Result from "./Result"
const SearchParams = () => {

    //const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

    const [location, setLocation] = useState ("");
    const [animal, setAnimal] = useState ("");
    const [animals, setAnimals] = useState([]);
    const [breed, setBreed] = useState ("");
    const [availableOnly, SetAvailableOnly] = useState(false);
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState (true);
    const [breeds, setBreeds] = useState([]);
    const [error, setError] =useState(null);

    //derived animal from calculated animals 
    //const Breeds = animal ? BREEDS[animal] : [];

    useEffect(() => {
        loadPets();
        loadAnimals();
    },[]);

    useEffect(() => {
        if(!animal){
            setBreeds([]);
            return;
        }
        loadBreeds();
    },[animal]);

    async function loadAnimals() {
      try {
        const response = await fetch("http://localhost:3001/pets");
        const data = await response.json();
        const uniqueAnimals = [...new Set(data.map((pet) => pet.animal))];
        setAnimals(uniqueAnimals);
      } catch(err){
         setError(err);
      }

    }

    async function loadPets(){
        setLoading(true);
        try {
            let url = "http://localhost:3001/pets?";
            const params = [];

            if (animal) params.push(`animal=${animal}`);
            if (breed) params.push(`breed=${breed}`);
            if (location) params.push(`city=${location.split(",")[0].trim()}`)
            if (availableOnly) params.push(`availableOnly=${availableOnly}`);
            url += params.join("&");
            const response = await fetch(url);
            if(!response.ok){
                throw new Error(`Http error status : ${response.status}`);
            }
            const data = await response.json();
            setLoading(false);
            setPets(data ?? []);
        }catch(err) {
           setError(err.message);
           setPets([]);
        }finally {
            setLoading(false)
        }
    }

    async function loadBreeds(){
        const response = await fetch("http://localhost:3001/breeds");
        const data = await response.json();
        setBreeds(data[animal] ?? []);
    }
   
   return <div className="search-params">
        {error && (
            <div className="error">
                <p>error loading pets: {error}</p>
            </div>
        )}
        <form onSubmit={e=> {
            e.preventDefault();
            loadPets()
        }}>
            <label htmlFor="location">
                location
                <input
                    id="location"
                    value={location}
                    placeholder="location"
                    onChange={(e) => setLocation(e.target.value)}
                />
            </label>
            <label htmlFor="animal">
                Animal
                <select
                    name=""
                    value={animal}
                    id="animal"
                    onChange={(e) => {setAnimal(e.target.value);
                        setBreed("")}
                    }
                >
                    <option value="">All animals</option>
                    {animals.map((animal)=> (
                        <option key={animal} value={animal}>
                            {animal}
                        </option>
                    ))}

                </select>
            </label>
            <label htmlFor="breed">
                Breed
                <select
                    name=""
                    value={breed}
                    id="animal"
                    disabled={!animal}
                    onChange={(e) => setBreed(e.target.value)}
                >
                    <option value="">All Breeds</option>
                    {breeds.map((breed)=> (
                        <option key={breed} value={breed}>
                            {breed}
                        </option>
                    ))}

                </select>
            </label>

            <label className="checkbox-label">
                <input type="checkbox" id="available" checked={availableOnly} onChange={ (e) => SetAvailableOnly(e.target.checked)}/>
                Available for imediate adoption
            </label>
            <button type="submit">search</button>
        </form>
       {loading? <h2> isLoading </h2>: <Result pets={pets} /> } 
   </div>
}

export default SearchParams;