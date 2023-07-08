import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { restaurantsData} from '../db/data';
import { Modal } from "react-bootstrap";

export function RetaurantDetails(){

    const navigate = useNavigate();
    const {restaurantId} = useParams();

    const [restaurant, setRestaurant] = useState();
    const [showAddRreviewModal, setShowAddReviewModal] = useState(false);
    const [selectedRating, setRating] = useState();
    const [selectedComment, setComment] = useState("");

    const getRestaurants = () => {
        setRestaurant(restaurantsData.find((x) => x.id === Number(restaurantId)));
    }

    useEffect(() => {
        getRestaurants();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleAddReview = () => {
        const updatedRestaurant = {...restaurant, ratings: [...restaurant.ratings, {rating: selectedRating, comment: selectedComment, renName: "Riya", pp: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5tbKdv1HDbAjPc526SK0yDZuoOmaaOyGNoj_e1q3ngruK2bTqzub3&s=0"}]};
        setRestaurant(updatedRestaurant);
        setRating();
        setComment("");
    }

    return(
        <div className="restaurant-container">
            <div className="d-flex align-items-center fit-content back-button" onClick={() => navigate("/")}><i className="fa fa-arrow-left" aria-hidden="true"></i></div>
            {restaurant && <div className="restaurant-details">
                <div><h1>{restaurant.name} <button className="btn btn-danger" onClick={() => setShowAddReviewModal(true)}>Add Review</button></h1>
                <p>{restaurant.menu.reduce((acc, x) => acc + `${x.name}, `, '')}</p>
                <p>{restaurant.address}</p>
                <p>{restaurant.averageRating}</p>
                <hr/>
                <h3>Reviews</h3>
                {restaurant.ratings.map((x) => {
                    return(
                        <div key={x.id} className="review">
                            <img className="profile-img" src={x.pp} alt={x.revName}/>
                            <span>{x.revName}</span>
                            <span className="rating align-self-end">{x.rating} <i className="fa fa-star" aria-hidden="true"></i></span>
                            <p>{x.comment}</p>
                            <hr/>
                        </div>
                    )
                })}</div>
            </div>}
            <Modal show={showAddRreviewModal} onHide={() => setShowAddReviewModal(false)}  size="lg">
                <Modal.Header>
                    <Modal.Title>
                        Add Your Review
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                    Rating: <select className="form-control mb-5 col-md-6" onChange={(event) => setRating(event.target.value)}>
                        <option>Select Rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    Comments:    <textarea className="post-area w-100 form-control"  onChange={(event) => setComment(event.target.value)}/>
                </div>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-secondary" onClick={() => setShowAddReviewModal(false)}>Close</button>
                    <button type="button" className="btn btn-primary" disabled={selectedRating === undefined || selectedComment === "" } onClick={() => [handleAddReview(), setShowAddReviewModal(false)]}>Update</button>
                </Modal.Footer>
        </Modal>
        </div>
        
    )
}