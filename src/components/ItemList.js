import { useDispatch, useSelector } from "react-redux";
import { CDN_URL } from "../utils/constants";
import { FaStar } from "react-icons/fa6";
import { addItems, decreaseItemCount, increaseItemCount } from "../utils/cartSlice";
import { toast } from "react-toastify";

const ItemList = ({ items, resInfo }) => {
    // console.log("resinfo in itemlist ", resInfo)
    const dispatch = useDispatch();
    const cartItems = useSelector((store) => store.cart.items);
    // console.log("cartItems", cartItems);
    const resNeededData = resInfo?.cards[2]?.card?.card?.info;

    const handleAddItem = (itemInfo) => {

        dispatch(addItems({ itemInfo, resNeededData }));
        // console.log("itemInfo ", itemInfo, "RESNeededData: ", resNeededData)
    }

    const handleDecrement = (itemId) => {
        if (cartItems.find(
            (cartItem) => cartItem.card.info.id === itemId
        )?.quantity == 1) {
            toast.error("1 item removed from cart");
        }

        dispatch(decreaseItemCount(itemId))
    }

    const handleIncrement = (itemId) => {
        dispatch(increaseItemCount(itemId));
    }

    return (
        <>
            {items.map((item) => (

                <div key={item.card.info.id} className="p-2 m-2 border-gray-200 border-b-2 flex justify-between hover:shadow-lg">
                    <div className="text-left w-[50%] sm:w-[70%]">
                        <p className="text-lg font-medium">{item.card.info.name}</p>
                        <p className="text-base font-medium">₹ {item.card.info.price / 100 || item.card.info.defaultPrice / 100}</p>

                        {item.card.info.ratings.aggregatedRating.rating && <>
                            <FaStar className="text-green-500 inline mb-1" />
                            <span className="text-green-500 pl-1">{item.card.info.ratings.aggregatedRating.rating}</span>
                            <span className="text-sm text-gray-400 ml-2">({item.card.info.ratings.aggregatedRating.ratingCountV2})</span>
                        </>}

                        <p className="text-sm my-2 text-gray-500">{item.card.info.description}</p>
                    </div>

                    <div className="w-[50%] sm:w-[30%] p-2 relative m-auto">

                        {cartItems.some(
                            (cartItem) => cartItem.card.info.id === item.card.info.id
                        ) ? (
                            // Increase/decrease counter button show, if item present in cart
                            <div className="flex justify-evenly border-2 border-slate-300 bg-white text-green-500 absolute bottom-0 left-1/2 transform -translate-x-1/2 font-semibold rounded-md ">
                                <div
                                    className="p-2 cursor-pointer hover:bg-slate-300 hover:text-orange-500"
                                    onClick={() => {

                                        handleDecrement(item.card.info.id)
                                    }}
                                >
                                    -
                                </div>
                                <span className="px-1 py-2">
                                    {
                                        cartItems.find(
                                            (cartItem) => cartItem.card.info.id === item.card.info.id
                                        )?.quantity
                                    }
                                </span>
                                <div
                                    className="p-2 cursor-pointer hover:bg-slate-300 hover:text-orange-500"
                                    onClick={() => handleIncrement(item.card.info.id)}
                                >
                                    +
                                </div>
                            </div>
                        ) : (
                            <button
                                className="px-5 py-2 border-2 border-slate-300 hover:bg-slate-300 hover:text-orange-500 bg-white text-green-500 absolute bottom-0 left-1/2 transform -translate-x-1/2 font-semibold rounded-md cursor-pointer"
                                onClick={() => {
                                    toast.success("1 item added to cart.");
                                    handleAddItem(item)
                                }}
                            >
                                Add
                            </button>
                        )}

                        <img src={CDN_URL + item.card.info.imageId} className="rounded-lg w-full md:w-[70%] mx-auto object-cover bg-white" />
                    </div>
                </div>
            ))}
        </>
    )
}

export default ItemList;