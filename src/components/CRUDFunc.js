import RenderNote from "./RenderNoteFunc";
import { addNote, removeNote, refresh } from "./FetchApiFunc";
import { useState, useEffect } from "react";

export default function CRUD() {
    const [noteText, setNoteText] = useState({content: ''});
    const [preloader, setPreloader] = useState(false)
    const [notes, setNotes] = useState([]);

    const apiURL = 'http://localhost:7070/';

    const refreshFunction = () => {
        setPreloader(true);

        refresh(apiURL).then((result) => {
            setNotes(() => result);
            setPreloader(false);
        });
    }

    useEffect(() => {
        refreshFunction();
    }, []);

    const handleChange = (e) => {
        const { value } = e.target;
        setNoteText((prevText => ({...prevText, content: value})));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        await addNote(apiURL, noteText);
  
        refreshFunction();

        setNoteText({content: ''});
    };

    const handleClickRemove = async (apiURL, id) => {
        await removeNote(apiURL, id);
        refreshFunction();
    };

    return (
        <div className="crud">
            <div className="notes">
                <div className="notes__header">
                    <h2 className="notes__header-title">NOTES</h2>
                    <button className="notes__header-btn btn">
                        &#11118;
                    </button>
                </div>
                <div className="notes__body">
                    {notes.map(item => <RenderNote key={item.id} apiURL={apiURL} body={item} handleClickRemove={handleClickRemove}/>)}
                </div>
            </div>
            <form className="crud__form" onSubmit={handleSubmit}>
                <span className="crud__form-title">New note</span>
                <textarea className="crud__form-input" value={noteText.content} required onChange={handleChange}>

                </textarea>
                <button className="crud__form-btn btn">
                    &#10148;
                </button>
            </form>
        </div>
    )
}