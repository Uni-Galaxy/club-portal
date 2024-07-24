import img from '../assets/Colour01 copy.png'

interface Club {
    description: string;
    title: string;
    key: string;
}

const ClubCards = ({description, title, key}:Club) => {
    return (
        <div
            className="rounded-lg border bg-card text-card-foreground shadow-sm h-[120px] "
            data-v0-t="card"
            key={key}
        >
            <div className="flex items-center gap-4 p-4 h-full">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                    <img
                        src={img}
                        width="48"
                        height="48"
                        alt="Club Logo"
                        className="h-8 w-8"
                        style={{ aspectRatio: '48 / 48', objectFit: 'cover' }}
                    />
                </div>
                <div className="flex-1 w-[max-content] max-w-[220px]">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className="text-sm text-muted-foreground">
                        {description}
                    </p>
                </div>
                <a
                    className="inline-flex items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    href="#"
                >
                    View Details
                </a>
            </div>
        </div>
    )
}

export default ClubCards
