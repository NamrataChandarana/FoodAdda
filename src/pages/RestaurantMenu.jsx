import { ResMenuShimmer } from "../components/Shimmer";
import { Link, useParams } from "react-router-dom";  // hook to catch path parameter
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "../components/RestaurantCategory";
import { useState } from "react";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { FaStar } from "react-icons/fa6";
import { MdAccessTime } from "react-icons/md";
import { MdLocationOn } from "react-icons/md";
import { IoBicycleSharp } from "react-icons/io5";
import { IoRestaurantOutline } from "react-icons/io5";


const RestaurantMenu = () => {

    const totalItems = useSelector((store) => store.cart.items.length);
    const { resId } = useParams(); // resId is comming from path provided "/restaurant/:resId" (ex: "/restaurant/452" or "/restaurant/674"  diffrent for diffrent restaurant to load dynamic page)

    const resInfo = useRestaurantMenu(resId); // Custom Hook returning API Data matching resId

    console.log("inside restaurantMenu ", resInfo);
    const [showIndex, setShowIndex] = useState(0);

    // *** till data not fetched show this ***
    if (resInfo === null) return <ResMenuShimmer />;

    // Destructuring resInfo
    const {
        name,
        cuisines,
        areaName,
        costForTwoMessage,
        avgRating,
        totalRatingsString,
        feeDetails,
        sla,
    } = resInfo.cards[2].card.card.info;

    // select only ItemCategory_card data from all cards data 
    const categories =
        resInfo.cards[4].groupedCard.cardGroupMap.REGULAR.cards.filter(
            (c) =>
                c.card.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
        );

    return (
        <div className="mt-[15vh] relative">
            <section className="w-[90vw] md:w-[70vw] mx-auto">
                <h3 className="ml-4 mb-4 text-xl sm:text-3xl font-bold">{name}</h3>

                <div
                    style={{ background: "linear-gradient(rgb(255, 255, 255) -6.71%, rgb(235, 235, 242) 56.19%, rgb(223, 223, 231) 106.56%)" }}
                    className="px-4 pb-4 mb-6 rounded-3xl"
                >
                    <div className="p-2 border-[1px] border-slate-300 rounded-2xl bg-white ">
                        <div>
                            <div className={` ${avgRating < 4 ? 'bg-red-500' : 'bg-green-500'} inline rounded text-white p-[3px]`} >
                                <FaStar className="inline mb-1 " /> {avgRating}
                            </div>
                            <span className="pl-2 font-bold text-lg">
                                ({totalRatingsString}) - {costForTwoMessage}
                            </span>
                        </div>

                        <p className="py-2 underline font-medium text-orange-500">{cuisines.join(", ")}</p>
                        <p>
                            <MdLocationOn className="inline text-orange-500 font-bolder text-xl mb-1 mr-2 " />{areaName}</p>
                        <div className="py-2">
                            <MdAccessTime className=" inline text-green-500 font-bolder text-xl mb-1 mr-2" />
                            {sla.slaString ? sla.slaString : "within MINS"}
                        </div>

                        <p className="p-2 border-t-2 border-slate-300">
                            <IoBicycleSharp className=" inline text-slate-400 font-bolder text-xl mb-1 mr-2" /> {feeDetails.message ? feeDetails.message : "Enjoy your meal"}
                        </p>
                    </div>
                </div>
            </section>

            <div className="text-center text-xl font-bold m-6">
                <IoRestaurantOutline className="inline ml-4 text-2xl text-orange-500"/>  
                <span className="mx-4">Menu</span> 
                <IoRestaurantOutline className="inline mr-4 text-2xl text-orange-500"/>
            </div>
            
            {/* categories accordian (dropdown menu) */}

            {categories.map((category, index) => (
                <RestaurantCategory
                    key={index}
                    data={category.card.card}
                    resInfo={resInfo}
                    showItems={index === showIndex}
                    itemIndex={index}
                    setShowIndex={setShowIndex}
                />
            ))}

            {totalItems > 0 &&
                <Link to="/cart">
                    <div className="p-2 rounded-lg fixed bottom-[7vh] left-1/2 -translate-x-1/2 bg-orange-500 text-white shadow-lg font-semibold hover:bg-orange-600">
                        {(totalItems > 1) ? `${totalItems} items` : `${totalItems} item`} | View Cart
                    </div>
                </Link>
            }

            <Footer />
        </div>
    );
};

export default RestaurantMenu;

