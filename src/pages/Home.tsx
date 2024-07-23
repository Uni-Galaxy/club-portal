import ClubClouser from "../components/ClubClouser";
import EventClouser from "../components/EventClouser";


const Home = () => {

    return (
        <div className="h-full w-full">
            <EventClouser />
            <ClubClouser />
        </div>
    )
}

export default Home;