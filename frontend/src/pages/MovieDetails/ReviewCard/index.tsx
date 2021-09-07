
import './styles.scss';
import { ReactComponent as Star } from 'assets/images/star.svg';
import { Review } from 'types/Reviews';

type Props = {
  movieReview: Review;
}


const ReviewCard = ({ movieReview }: Props) => {

  return (  

      <div className="review-card-container">
        
        <div className="username-container">
          <Star />
          <h4 className="username-review">{movieReview.user?.name}</h4>
        </div>
        
        <div className="review-text-container">
          <span className="review-text">
            {movieReview.text}
          </span>
        </div>
      </div>
    
  );
};

export default ReviewCard;
