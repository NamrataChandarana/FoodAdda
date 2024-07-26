import {useState, useEffect} from "react";

// *** custom Hook ( To check onlineStatus ) ***
const useOnlineStatus = () => {

    const [onlineStatus, setOnlineStatus] = useState(true); 

    useEffect(()=> {
        const handleOnline = () => setOnlineStatus(true);
        const handleOffline = () => setOnlineStatus(false);

        // browser eventlistener (online,offline)
        window.addEventListener("offline", handleOffline);
        window.addEventListener("online", handleOnline);

        // Cleanup function to remove event listeners after unmount
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };

    }, []);

    return onlineStatus;
}

export default useOnlineStatus;