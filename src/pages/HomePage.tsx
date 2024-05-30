import { Link } from "react-router-dom"


const HomePage = () => {
    return (
        <div className="h-full">
            {/*Nav*/}
            <div className="w-full container mx-auto">
                <div className="w-full flex items-center justify-between">
                    <a
                        className="flex items-center text-indigo-400 no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
                        href="#"
                    >
                        Uni
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">
                            Galaxy
                        </span>
                    </a>
                    <div className="flex w-1/2 justify-end content-center">
                        <Link
                            className="inline-block text-blue-300 no-underline hover:text-pink-500 hover:text-underline text-center h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out"
                            to="/signin"
                        >
                        Log In
                        </Link>
                    </div>
                </div>
            </div>
            {/*Main*/}
            <div className="container pt-24 md:pt-36 mx-auto flex flex-wrap flex-col md:flex-row items-center">
                {/*Left Col*/}
                <div className="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden">
                    <h1 className="my-4 text-3xl md:text-5xl text-white opacity-75 font-bold leading-tight text-center md:text-left">
                        Main
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">
                            Hero Message
                        </span>
                        to sell yourself!
                    </h1>
                    <p className="leading-normal text-base md:text-2xl mb-8 text-center md:text-left">
                        Sub-hero message, not too long and not too short. Make it just right!
                    </p>
                    <form className="bg-gray-900 opacity-75 w-full shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <label
                                className="block text-blue-300 py-2 font-bold mb-2"
                                htmlFor="emailaddress"
                            >
                                Signup for our newsletter
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                                id="emailaddress"
                                type="text"
                                placeholder="you@somewhere.com"
                            />
                        </div>
                        <div className="flex items-center justify-between pt-4">
                            <button
                                className="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                                type="button"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
                {/*Right Col*/}
                <div className="w-full xl:w-3/5 p-12 overflow-hidden">
                    <img
                        className="mx-auto w-full md:w-4/5 transform -rotate-6 transition hover:scale-105 duration-700 ease-in-out hover:rotate-6"
                        src="macbook.svg"
                    />
                </div>
                {/*Footer*/}
                <div className="w-full pt-16 pb-6 text-sm text-center md:text-left fade-in">
                    <a className="text-gray-500 no-underline hover:no-underline" href="#">
                        © May 2024
                    </a>
                    - Created by {' '}
                    <span
                        className="text-gray-500 no-underline hover:no-underline"
                    > Rachit Kumar, Subham Mahapatra, Yash Lunawat
                    </span>
                </div>
            </div>
        </div>

    )
}

export default HomePage
