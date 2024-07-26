import { useState } from "react";
import ItemList from "./ItemList";
import { MdKeyboardArrowUp } from "react-icons/md";

const RestaurantCategory = ({ data, resInfo, showItems, setShowIndex, itemIndex }) => {

    const handleClick = () => {        
        const nextIndex = showItems ? null : itemIndex;
        
        setShowIndex(nextIndex); // updating state of its parent component indirectly (LIFTING THE STATE UP)
    }

    return (
        <>
            <div className="w-[90vw] md:w-[70vw] mx-auto my-2 bg-gray-100 shadow-lg p-2 ">
                {/* Accordian Header */}
                <div
                    className="flex justify-between p-2 border-gray-200 shadow-md border-b-2 cursor-pointer"
                    onClick={handleClick}
                >
                    <span className="font-semibold">
                        {data.title} [{data.itemCards.length}]
                    </span>

                    <MdKeyboardArrowUp
                        style={{
                            fontSize: "1.6rem",
                            transform: showItems ? "rotate(360deg)" : "rotate(180deg)",
                        }}
                    />
                </div>

                {/* Accordian Category */}
                { showItems && <ItemList items={data.itemCards} resInfo={resInfo} />}
            </div>
        </>
    )
}

export default RestaurantCategory;