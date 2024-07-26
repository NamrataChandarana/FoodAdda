import { CDN_URL } from "../utils/constants";
import { MdAccessTime } from "react-icons/md";
import { FaStar } from "react-icons/fa6";

const RestaurantCard = (props) => {
    // object destructuring
    const {resData} = props;

    const {
        cloudinaryImageId,
        name,
        cuisines,
        avgRating,
        costForTwo,
    } = resData?.info;
    
    return (
        <div className=" m-2 p-3 w-[250px] h-[300px] rounded-lg bg-white hover:shadow-md overflow-hidden" >
            <img
                className="h-[70%] w-[100%] rounded-lg shadow-md transform transition-transform duration-300 hover:shadow-lg"
                src= {CDN_URL + cloudinaryImageId}  
                alt="restaurant-img" 
            />

            <h3 className="font-medium truncate mt-2">{name}</h3>
            <h4 className="text-xs truncate">{cuisines.join(", ")}</h4>
            <div className="flex justify-between text-sm font-medium items-center mt-2">
                <h4 className= {` ${avgRating < 4 ? 'bg-red-500' : 'bg-green-500'} inline rounded text-white p-[3px]`} > 
                    <FaStar className="inline mb-1 "/> {avgRating}
                </h4>
                <h4>{costForTwo}</h4>
                <h4> <MdAccessTime className=" inline text-green-500 font-bold mb-1"/> {resData.info.sla.deliveryTime} mins</h4>
            </div>
        </div>
    ); 
};

//Higher Order component
export const withTopRatedLabel = (RestaurantCard) => {

    // returns a component (function)
    return (props) => {
        // returns JSX
        return (
            <div className="relative" >
                <h3 className="absolute bg-orange-400 text-black m-2 p-2 font-semibold top-2 left-0 z-10">Top Rated</h3>
                <RestaurantCard {...props} />
            </div>
        )
    }
}

export default RestaurantCard;