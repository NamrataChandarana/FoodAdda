
const Shimmer = () => {

    const multiShimmer = Array.from ({length: 10}).map((e, index)=> {
        return (
            <>
                <div style={{marginLeft: "10px", marginRight: "10px"}} >
                    <div key={index} className="animate-pulse m-2 p-3 w-[250px] h-[300px] rounded-lg bg-gray-300" >
                        <div className="h-[70%] w-[100%] rounded-lg bg-slate-200"></div>
                        <div className="mt-2 w-full h-4 rounded-lg bg-slate-200"></div>
                        <div className="mt-2 w-[70%] h-4 rounded-lg bg-slate-200"></div>
                        <div className="mt-2 w-full h-4 rounded-lg bg-slate-200"></div>
                    </div>
                </div>
            </>
            
        );
    });

    return (
        <div className="w-full flex justify-center items-center flex-wrap mt-[15vh]">
            {multiShimmer}
        </div>
    );
};


// Shimmer UI for RestaurantMenu page
export const ResMenuShimmer = ()=> {
    const multiShimmer = Array.from ({length: 10}).map((e, index)=> {
        return (
            <div key={index} className="animate-pulse border-box relative m-4 p-3 w-[90vw] h-[15vh] md:w-[50vw]  rounded-lg bg-gray-300" >
                <div className="absolute right-4 top-2 h-[80%] w-[20%] rounded-lg bg-slate-200"></div>
                <div className="mt-2 w-[60%] h-4 rounded-lg bg-slate-200"></div>
                <div className="mt-2 w-[50%] h-4 rounded-lg bg-slate-200"></div>
                <div className="mt-2 w-[60%] h-4 rounded-lg bg-slate-200"></div>
            </div>
        );
    });

    return (
        <div className="w-full flex justify-center items-center flex-wrap mt-[15vh]">
            {multiShimmer}
        </div>
    )
}

export default Shimmer;