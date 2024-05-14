import { useState } from "react";
const Signin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    return (
        <div>
            <h1>Sign In</h1>
            <input
                type="text"
                className=""
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
            />
            <br/>
            <input
                type="password"
                className=""
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
            />
            <br/>
            <button type="submit" onClick={handleSubmit}>Sign In</button>
        </div>
    )
}

export default Signin
