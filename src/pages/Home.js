import { useState } from 'react';
import {cuisineData, restaurantsData} from '../db/data';

export function Home(){

    const [restaurants, setRestaurants] = useState([]);

    const handleCuisineSelection = (cuisineId) => {
        setRestaurants(restaurantsData.filter((x) => x.cuisine_id === cuisineId));
    }

    return(
        <div>
            <h1>Food Ordering App</h1>
            <h3>Select Your Cuisine:</h3>
            {cuisineData.map((x) => {
                return(
                    <button key={x.id} className='btn btn-danger' onClick={() => handleCuisineSelection(x.id)}>{x.name}</button>
                )
            })}

            {restaurants.map((x) => {
                return(
                    <div className='restaurants'>
                        <h5>Dishes by <a href={`/details/${x.id}`}>{x.name}</a></h5>
                        <div className='row'>
                            {x.menu.map((y) => {
                                return(
                                    <div className="card" style={{width: "18rem"}}>
                                        <img src={y.imgSrc} className="card-img-top" alt={y.name}/>
                                        <div className="card-body">
                                            <h5 className="card-title">{y.name}</h5>
                                            <p className="card-text">Rs. {y.price} for one</p>
                                            <p className="card-text">{x.name}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}