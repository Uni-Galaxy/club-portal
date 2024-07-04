

const Calendar = () => {
    return (
        <div className="w-screen md:w-[calc(100vw-207px)] h-[calc(100vh-56px)]">
            <iframe src="https://embed.styledcalendar.com/#JBCvJlBZIgJML8y55q3f" title="Styled Calendar" className="styled-calendar-container" style={{width: "100%", border: "none", height:"100%" }} data-cy="calendar-embed-iframe"></iframe>
            <script async type="module" src="https://embed.styledcalendar.com/assets/parent-window.js"></script>
        </div>
    )
}

export default Calendar
