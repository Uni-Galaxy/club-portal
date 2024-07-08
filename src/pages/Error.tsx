import { Link } from "react-router-dom";


const Error = () => {
    return (
        <section className="w-screen h-screen pt-10 pb-10 flex items-center justify-center bg-[url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')] bg-cover bg-center" >
            <div className="absolute top-[15%] flex flex-col items-center justify-center">
                <h1 className="text-5xl text-black font-bold dark:text-white">404</h1>
                <p className="text-2xl text-black dark:text-white">This pages does not exist..</p>
            </div>
            <Link to={"/"} className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 absolute bottom-[15%]">
                Home Page
            </Link>
        </section>
    );
};

export default Error;