import RestaurantCard, { withTopRatedLabel } from "./RestaurantCard";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import search_banner from "../images/search_banner.jpg";

const RestaurantOnline = ({ resTitle, resData }) => {
    const listOfRestaurants = resData; // updated with resData(actual data) on each reRender

    const [filteredRestaurants, setFilteredRestaurants] = useState(resData);
    const [activeFilter, setActiveFilter] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [searchError, setSearchError] = useState("");
   
    console.log("RestaurantOnline rendered");
    // to refresh data each user search diffrent location
    useEffect(() => {
        setFilteredRestaurants(listOfRestaurants);
    }, [listOfRestaurants]);

    useEffect(() => {
        searchRestaurant();
        setActiveFilter(null);
    }, [searchText]);

    // update to clear(inputbox & errordata) when error message displayed due to search & filter option also used
    useEffect(() => {
        setSearchError("");
        setSearchText("");
    }, [activeFilter != null]);


    // Higherorder component taking a component & returning updated component
    const RestaurantCardTopRated = withTopRatedLabel(RestaurantCard);

    const filterRatingGreaterThan4 = () => {
        const filteredResList = listOfRestaurants.filter(
            (res) => res?.info?.avgRating > 4.5
        );

        setActiveFilter("ratingGreaterThan4");
        setFilteredRestaurants(filteredResList);
    }

    const filterPriceLessThan300 = () => {
        const filteredResList = listOfRestaurants.filter(
            (res) => parseInt(res?.info?.costForTwo.match(/\d+/)[0], 10) < 300
        )

        setActiveFilter("priceLessThan300");
        setFilteredRestaurants(filteredResList);
    }

    const filterPriceBetween300To600 = () => {
        const filteredResList = listOfRestaurants.filter(
            (res) => {
                const price = parseInt(res?.info?.costForTwo.match(/\d+/)[0], 10);

                return ((price >= 300) && (price <= 600));
            }
        );

        setActiveFilter("priceBetween300To600");
        setFilteredRestaurants(filteredResList);
    }

    const filterFastDelivery = () => {
        const filteredResList = listOfRestaurants.filter(
            (res) => res?.info?.sla?.deliveryTime <= 30
        )

        setActiveFilter("fastDelivery");
        setFilteredRestaurants(filteredResList);
    }

    const filterPureVeg = () => {
        const filteredResList = listOfRestaurants.filter(
            (res) => res?.info?.veg === true
        )

        setActiveFilter("pureVeg");
        setFilteredRestaurants(filteredResList);
    }

    const searchRestaurant = () => {
        if (searchText !== "") {
            const filteredResList = listOfRestaurants.filter(
                (res) => res.info.name.toLowerCase().includes(searchText.toLowerCase())
            )

            setSearchError("");
            if (filteredResList.length === 0) {
                setSearchError(
                    `Sorry, we couldn't find any results for "${searchText}"`
                );
            }

            setFilteredRestaurants(filteredResList);
        }
        else {
            setSearchError("");
            if (activeFilter == null) {
                setFilteredRestaurants(listOfRestaurants);
            }
        }

    }

    const removeFilter = () => {
        setActiveFilter(null);
        setFilteredRestaurants(resData);
    }

    const filterCategories = [
        {
            name:"Rating 4.5+",
            function: filterRatingGreaterThan4,
            filter: "ratingGreaterThan4"   
        },
        {
            name: "Fast Delivery",
            function: filterFastDelivery,
            filter: "fastDelivery"
        },
        {
            name: "Pure Veg",
            function: filterPureVeg,
            filter: "pureVeg"
        },
        {
            name: "Less than Rs.300",
            function: filterPriceLessThan300,
            filter: "priceLessThan300"
        },
        {
            name:"Rs. 300 - Rs. 600",
            function: filterPriceBetween300To600,
            filter: "priceBetween300To600"
        },
    ];


    return (
        <div>
            <div
                style={{ backgroundImage: `url(${search_banner})` }}
                className="mt-6 flex items-center justify-center h-[35vh] sm:h-[45vh] bg-no-repeat bg-cover bg-center relative"
            >
                <div className="absolute top-0 w-full h-full bg-black opacity-35 z-10 "></div>

                <div className="text-center z-20 py-5">
                    <h2 className=" text-white text-2xl sm:text-3xl font-extrabold tracking-wide">{resTitle}</h2>
                    <input
                        type="text"
                        className="w-[70%] font-medium mt-4 p-3 outline-none border-2 border-orange-500 focus:border-4"
                        placeholder="Search Restaurant name here..."
                        value={searchText}
                        onChange={(e) => {
                            setSearchText(e.target.value);
                        }}
                    />
                </div>
            </div>
            <div className="md:mx-[100px]" >
                {/* ***** filter with button section ***** */}
                <div className="px-1 pt-4 flex justify-items-end overflow-x-scroll mx-4" id="horizontal-scroll" >
                { 
                    filterCategories.map((category) => (
                        <div className={`border-slate-300 border-[1px] py-2 px-3 min-w-36 md:min-w-20 rounded-md mb-2 mr-2 hover:bg-gray-300 ${activeFilter == category.filter}
                            ? "bg-bg-gray-300"
                            : "bg-white"}`}
                        >
                            <button onClick={category.function}>
                               {category.name}
                            </button>
                    
                            {activeFilter == category.filter &&
                                <button className="pl-2 text-slate-700" onClick={removeFilter}>
                                    <RxCross2 />
                                </button>
                            }
                        </div>
                        
                        
                    ))
                }
                </div>
            
                {searchError && <div className="text-center m-4 font-bold text-3xl text-slate-600">{searchError}</div>}

                {/* Displaying data based on filter */}
                <div className="flex flex-wrap justify-center ">
                    {
                        filteredRestaurants.map((restaurant) => (
                            <Link key={restaurant.info.id} to={"/restaurant/" + restaurant.info.id}>
                            
                                {(restaurant.info.avgRating >= 4.5)
                                    ? <RestaurantCardTopRated resData={restaurant} />
                                    : <RestaurantCard resData={restaurant} />
                                }
                            </Link>
                        ))
                    }
                </div>
            </div>

            
        </div>
    )
}

export default RestaurantOnline;
