import { RiWifiOffLine } from "react-icons/ri";

const UserOffline = () => {

    return (
        <div className="w-full text-center mx-auto mt-[15vh]">
            <RiWifiOffLine className="w-full mx-auto text-4xl text-red-500"/>
            <h1 className=" text-4xl text-red-500">OFFLINE !</h1>
            <h1 className="font-semibold">Look like you are offline, Please check your internet connection</h1>
        </div>
    )
}

export default UserOffline;