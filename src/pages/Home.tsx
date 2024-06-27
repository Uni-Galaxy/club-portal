import { useEffect } from "react";
import { toast } from 'react-toastify';
import { getToken, getMessaging } from "firebase/messaging";
import { getDatabase, ref, push } from "firebase/database";
import { getAuth } from "firebase/auth";


const Home = () => {

    const messaging = getMessaging();

    const auth = getAuth();

    const requestPermission = async () => {
        const permission = await Notification.requestPermission()
        if (permission === 'granted') {
            toast.success("Notification Enable", {
                theme: "dark"
            })
            await getToken(messaging, { vapidKey: 'BN0KnW-O5Ul6YYNYJbylMtVbx3DgNhGP-S08PGHne6ZHCxjY1APtrxxbSqBUnU7sDr1kUaEA3sJaQY5qhgoM9Bk' })
        } else if (permission == 'denied') {
            alert('Permission denied');
            toast.error("Notification Disable", {
                theme: "dark",
            })
        }
    }

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            const uid = user.uid;
            const database = getDatabase();
            const timestampsRef = ref(database, '/logs/' + uid);
            push(timestampsRef, {
                time: Date()
            });
        }
    }, [])

    useEffect(() => {
        requestPermission();
    }, [])

    return (
        <div className="h-full w-full">
            
        </div>
    )
}

export default Home;