const MatricCard = ({title, stitle, icon, count, status, type}) => {
    return(
       <div className="matric__card">
        <div className="matric__header">
            <h4 className="matric__title">{title}</h4>
            <span className="matric__stitle">{stitle}</span>
        </div>
        <div className="matric__body">
            <span className="matric__icon">{icon}</span>
            <div>
                <span className="matric__count">{count}</span><br />
                <span className="matric__type"><strong className="matric__status">{status}</strong> {type}</span>
            </div>
        </div>
       </div>
    )
}

export default MatricCard;