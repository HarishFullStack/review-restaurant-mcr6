import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { restaurantsData} from '../db/data';

export function RetaurantDetails(){

    const navigate = useNavigate();
    const {restaurantId} = useParams();

    const [restaurant, setRestaurant] = useState();

    const getRestaurants = () => {
        setRestaurant(restaurantsData.find((x) => x.id === Number(restaurantId)));
    }

    useEffect(() => {
        getRestaurants();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return(
        <div className="restaurant-container">
            <div className="d-flex align-items-center fit-content back-button" onClick={() => navigate("/")}><i className="fa fa-arrow-left" aria-hidden="true"></i></div>
            {restaurant && <div className="restaurant-details">
                <div><h1>{restaurant.name}</h1>
                <p>{restaurant.menu.reduce((acc, x) => acc + `${x.name}, `, '')}</p>
                <p>{restaurant.address}</p>
                <p>{restaurant.averageRating}</p>
                <hr/>
                <h3>Reviews</h3>
                {restaurant.ratings.map((x) => {
                    return(
                        <div className="review">
                            <img className="profile-img" src={x.pp} alt={x.revName}/>
                            <span>{x.revName}</span>
                            <span className="rating align-self-end">{x.rating} <i className="fa fa-star" aria-hidden="true"></i></span>
                            <p>{x.comment}</p>
                            <hr/>
                        </div>
                    )
                })}</div>
            </div>}
        </div>
    )
}