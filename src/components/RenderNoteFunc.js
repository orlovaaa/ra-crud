export default function RenderNote(props) {
    const { apiURL, body,  handleClickRemove} = props

    return (
        <div className="note">
            <p className="note__text">
                {body.content}
            </p>
            <button className="note__close" onClick={() => handleClickRemove(apiURL, body.id)}>
                &#10060;
            </button>
        </div>
    )
}