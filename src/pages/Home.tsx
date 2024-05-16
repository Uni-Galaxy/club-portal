import { useEffect } from "react";
import { toast } from 'react-toastify';
import { getToken, getMessaging } from "firebase/messaging";

const Home = () => {

    const messaging = getMessaging();


    const requestPermission = async () => {
        const permission = await Notification.requestPermission()
        if (permission === 'granted') {
            toast.success("Notification Enable", {
                theme: "dark"
            })
            const token = await getToken(messaging, { vapidKey: 'BN0KnW-O5Ul6YYNYJbylMtVbx3DgNhGP-S08PGHne6ZHCxjY1APtrxxbSqBUnU7sDr1kUaEA3sJaQY5qhgoM9Bk' })
            console.log('Token: ', token);
        } else if (permission == 'denied') {
            alert('Permission denied');
            toast.error("Notification Disable", {
                theme: "dark",
            })
        }
    }

    useEffect(() => {
        requestPermission();
    }, [])

    return (
        <div>
            <h1>Home [Dashbord page]</h1>
        </div>
    )
}

export default Home
