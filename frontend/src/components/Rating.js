import React from 'react';

const Rating = ({ rating, numReviews }) => {

    return (
        <div className="rating d-flex" data-toggle="tooltip" data-placement="bottom" title={rating}>
            <i className={
                rating >= 1
                    ? "fas fa-star"
                    : rating >= 0.5
                        ? "fas fa-star-half-alt"
                        : "far fa-star"
            }></i>
            <i className={
                rating >= 2
                    ? "fas fa-star"
                    : rating >= 1.5
                        ? "fas fa-star-half-alt"
                        : "far fa-star"
            }></i>
            <i className={
                rating >= 3
                    ? "fas fa-star"
                    : rating >= 2.5
                        ? "fas fa-star-half-alt"
                        : "far fa-star"
            }></i>
            <i className={
                rating >= 4
                    ? "fas fa-star"
                    : rating >= 3.5
                        ? "fas fa-star-half-alt"
                        : "far fa-star"
            }></i>
            <i className={
                rating >= 5
                    ? "fas fa-star"
                    : rating >= 4.5
                        ? "fas fa-star-half-alt"
                        : "far fa-star"
            }></i>
            {numReviews && <p className="mx-3">({numReviews} reviews)</p>}
        </div>
    );
};

export default Rating;
