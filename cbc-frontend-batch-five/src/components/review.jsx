import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoSend } from "react-icons/io5";
import {jwtDecode} from "jwt-decode";
import { MdEditNote } from "react-icons/md";
import { IoCloseCircleSharp } from "react-icons/io5";

function Review({ productId }) {
  const [getReviews, setGetReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [isloading, setIsLoading] = useState(true);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [updatedRating, setUpdatedRating] = useState(5);
  const [updatedReview, setUpdatedReview] = useState("");

  const token = localStorage.getItem("token")
  let currentUserId = null;

  if(token){
    currentUserId = jwtDecode(token)._id;
  }


  useEffect(() => {
    if(isloading){
      axios.get(import.meta.env.VITE_BACKEND_URL + "/api/review/" + productId)
      .then((res) => {
        setGetReviews(res.data.reviewsList);
        // console.log(res.data);
        setIsLoading(false);
      }).catch((e) => {
        console.log(e);
        setIsLoading(false);
      })
    }
  }, [productId, isloading]);

  async function addReview() {
    try {
      if (review === "") {
        toast.error("Please enter your review first");
        return;
      }

      
      await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/review/" + productId,
        {
          rating: rating,
          review: review,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Review added successfully");

      setIsLoading(true);
      // setGetReviews((prev)=>[...prev, res.data.reviews])
      setReview("");
      setRating(5);

    } catch (e) {
      toast.error("Failed to add review");
      console.log(e);
    }
  }

  async function updateReview(reviewId){
    try {
      await axios.put(import.meta.env.VITE_BACKEND_URL + "/api/review/" + reviewId,{
        rating: updatedRating,
        review: updatedReview
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Review updated successfully");

      setIsButtonClicked(false);

      setIsLoading(true);
    } catch (e) {
      toast.error("Failed to update review");
      console.log(e);
    }
  }

  return (
    <div className="w-full md:w-[80%] mx-auto">
      <h1 className="text-2xl md:text-4xl font-bold border-b-2 border-b-gray-400 mb-4 p-2 text-center md:text-left text-seondary">
        Reviews
      </h1>
      <div className={`flex items-center justify-center mb-4  ${isButtonClicked ? "hidden" : ""}`}>
        <input
          type="text"
          value={review}
          onChange={(e) => {
            setReview(e.target.value);
          }}
          placeholder="Enter your review here..."
          className='border border-seondary/30 p-2 focus:outline-accent rounded-lg w-[80%]'
        />
        <select name="rating" value={rating} onChange={(e) => setRating(e.target.value)} className="focus:outline-none cursor-pointer" id="">
          <option value="5">5 ⭐</option>
          <option value="4">4 ⭐</option>
          <option value="3">3 ⭐</option>
          <option value="2">2 ⭐</option>
          <option value="1">1 ⭐</option>
        </select>
        <button onClick={addReview} className="focus:outline-none">
          <IoSend className="text-3xl text-accent ml-3 cursor-pointer hover:text-accent-dark" />
        </button>
      </div>
      <div className="w-[90%] mx-auto md:w-full">
        {
          isloading ?
          <h1 className="text-2xl md:text-3xl font-bold mb-4 p-2 text-center text-seondary/30">
            Loading...
          </h1>:
          getReviews.length === 0 ?
          <h1 className="text-2xl md:text-3xl font-bold mb-4 p-2 text-center text-seondary/30">
            No Reviews yet...
          </h1>:
          
          getReviews.map((rev, index) => (
          <div key={index} className="border-b border-seondary/30 py-2 mb-3">
            <div className="flex items-center">
              <div>
                <img src={rev.user?.img} alt={rev.user?.firstName} width="40px" height="40px" className="rounded-full"/>
              </div>
              <div className="ml-2">
                <p className="font-semibold text-accent flex felx-wrap">
                  {rev.user?.firstName}
                  {
                    // identify owner of the review using token 
                    rev.user?._id === currentUserId &&
                    <small className="text-gray-500 ml-0.5 font-bold">
                      (You)
                    </small>
                  }
                  <small className="text-gray-500 ml-1">
                    ({new Date(rev.createdAt).toLocaleDateString()})
                  </small>
                   {
                    // add updates for owner of the review
                    rev.user?._id === currentUserId &&
                    <button className="ml-2 text-accent text-lg hover:text-gray-500 cursor-pointer focus:outline-none" onClick={() => {
                      setIsButtonClicked(!isButtonClicked)
                      setUpdatedReview(rev.review)
                      setUpdatedRating(rev.rating)
                    }}>
                      <MdEditNote className={ isButtonClicked ? "hidden" : "text-green-500"}/>
                      <IoCloseCircleSharp className={isButtonClicked ? "text-red-500" : "hidden"}/>
                    </button>
                   }
                </p>
                <p className="text-yellow-500 text-[10px]">
                  {"⭐".repeat(rev.rating)}
                </p>
              </div>
            </div>
                {
                  rev.user?._id === currentUserId &&
                  <div className={`flex items-center mt-2 ${isButtonClicked ? "" : "hidden"}`}>
                    <input
                      type="text"
                      value={updatedReview}
                      onChange={(e) => setUpdatedReview(e.target.value)}
                      placeholder="Enter your review here..."
                      className='border border-seondary/30 p-2 focus:outline-accent rounded-lg w-[80%]'
                    />
                    <select name="rating" value={updatedRating} onChange={(e) => setUpdatedRating(e.target.value)} className="focus:outline-none cursor-pointer">
                      <option value="5">5 ⭐</option>
                      <option value="4">4 ⭐</option>
                      <option value="3">3 ⭐</option>
                      <option value="2">2 ⭐</option>
                      <option value="1">1 ⭐</option>
                    </select>
                    <button onClick={() => updateReview(rev._id)} className="focus:outline-none">
                      <IoSend className="text-3xl text-accent ml-3 cursor-pointer hover:text-accent-dark" />
                    </button>
                  </div>
                }
                {
                  rev.user?._id !== currentUserId ?
                  <p className="mt-2">
                    {rev.review}
                  </p>:
                  <p className={`${isButtonClicked ? "hidden" : ""}`}>
                    {rev.review}
                  </p>
                }
          </div>
        ))
        }
      </div>
    </div>
  );
}

export default Review;
