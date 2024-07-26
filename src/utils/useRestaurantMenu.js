import { useState, useEffect } from "react";
import { useSelector } from "react-redux";


// **** Custom Hook for Fetching RestaurntMenu API Data ****
const useRestaurantMenu = (resId) => {

    const [resInfo, setResInfo] = useState(null);
    const {latitude, longitude} = useSelector((store) => store.location)

    useEffect(() => {
        fetchMenu();
    }, []);
    
    // *** Api call for restaurantMenu of swiggy restaurant ***
    const fetchMenu = async () => {
        const data = await fetch(
            `https://cors-handlers.vercel.app/api/?url=https%3A%2F%2Fwww.swiggy.com%2Fdapi%2Fmenu%2Fpl%3Fpage-type%3DREGULAR_MENU%26complete-menu%3Dtrue%26lat%3D${latitude}%26lng%3D${longitude}%26restaurantId%3D${resId}%26catalog_qa%3Dundefined%26submitAction%3DENTER"`
        );
    
        const json = await data.json();
        setResInfo(json.data);
    }

    return resInfo;  // returning Data
}

export default useRestaurantMenu;