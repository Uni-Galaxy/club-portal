import { useEffect, useState } from "react"

const AddMembers = () => {
    const [members, setMembers] = useState();
    const [alluser, setAllUser] = useState();
    const [loding, setLoading] = useState(true);
    const [allUserLoading, setAllUserLoading] = useState(false);

    useEffect(() => {
        const data = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const headers: HeadersInit = {};
                if (token) {
                    headers['Authorization'] = token;
                }
                const url = `${import.meta.env.VITE_API_URL}/clubs/members`
                const response = await fetch(url, {
                    method: 'GET',
                    headers
                });
                const data = await response.json();
                setMembers(data)
                setLoading(false)

            } catch (err) {
                console.log(err);
            }
        }
        data();
    }, [])

    useEffect(() => {
        const data = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const headers: HeadersInit = {};
                if (token) {
                    headers['Authorization'] = token;
                }
                const url = `${import.meta.env.VITE_API_URL}/users`
                const response = await fetch(url, {
                    method: 'GET',
                    headers
                });
                const data = await response.json();
                setAllUser(data)
                setAllUserLoading(false)

            } catch (err) {
                console.log(err);
            }
        }
        data();
    }, [])

    console.log(members)
    console.log(alluser)
    console.log(loding)
    console.log(allUserLoading)


    return (
        <div>
            <h1>Add Members</h1>
        </div>
    )
}

export default AddMembers
