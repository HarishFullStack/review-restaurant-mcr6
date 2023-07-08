import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { restaurantsData} from '../db/data';
import { Modal } from "react-bootstrap";

export function RetaurantDetails(){

    const navigate = useNavigate();
    const {restaurantId} = useParams();

    const [restaurant, setRestaurant] = useState();
    const [showAddRreviewModal, setShowAddReviewModal] = useState(false);

    const getRestaurants = () => {
        setRestaurant(restaurantsData.find((x) => x.id === Number(restaurantId)));
    }

    useEffect(() => {
        getRestaurants();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleAddReview = () => {
        
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
                        Edit Post
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                    Rating: <select className="form-control mb-5 col-md-6">
                        <option>Select Rating</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                    Comments:    <textarea className="post-area w-100 form-control" />
                </div>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-secondary" onClick={() => setShowAddReviewModal(false)}>Close</button>
                    <button type="button" className="btn btn-primary" onClick={handleAddReview}>Update</button>
                </Modal.Footer>
        </Modal>
        </div>
        
    )
}