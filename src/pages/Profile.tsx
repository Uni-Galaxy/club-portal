import { getAuth } from "firebase/auth"

const Profile = () => {
    const auth = getAuth()

    return (
        <div className="w-screen md:w-[calc(100vw-207px)] h-[calc(100vh-56px)] flex flex-col justify-center items-center p-3">
            <h1 className="text-3xl font-bold">Profile</h1>
            <div className="flex flex-col justify-center items-center">
                <h1 className="">Name - {auth.currentUser?.displayName}</h1>
                <h3>User Profile img - </h3><img src={auth.currentUser?.photoURL} alt="User Image" />
            </div>

        </div>
    )
}

export default Profile
