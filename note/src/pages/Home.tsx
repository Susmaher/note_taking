import { useState, useEffect, type JSX } from "react";
import Note from "../Components/note";
import { Link } from "react-router-dom";
import "../css/home.css";
import api from "../ts/api";

interface NoteData {
    content: string;
    id: string;
    title: string;
}

function Home(): JSX.Element {
    const [noteList, setNoteList] = useState<NoteData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchNotes = async () => {
        try {
            setLoading(true);
            const response = await api.get("/api/Auth/notes-get");
            console.log("API response:", response.data);

            // Based on your attachment, the data seems to be directly an array
            const notesData = response.data || [];
            setNoteList(notesData);
            setError(null);
        } catch (err) {
            console.log("Something went wrong fetching notes:", err);
            setError("Failed to fetch notes");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    const handleTeszt = () => {
        fetchNotes();
    };

    return (
        <>
            <div>
                <h1>Hi!</h1>
                <p>
                    This is a note taking app, where you can add private and
                    public notes after you logged in. You can see the public
                    notes below
                </p>
                <div className="button-div-home-page">
                    <Link to="/sign-in" className="home-page-link-element">
                        Sign in
                    </Link>
                    <Link to="/sign-up" className="home-page-link-element">
                        Sign up
                    </Link>
                </div>
                <button onClick={handleTeszt}>Teszt</button>
            </div>
            <div className="home-page-notes-div">
                <h2>Public notes:</h2>
                {loading && <p>Loading notes...</p>}
                {error && <p style={{ color: "red" }}>Error: {error}</p>}
                {!loading && !error && noteList.length === 0 && (
                    <p>No public notes available.</p>
                )}
                {!loading &&
                    !error &&
                    noteList.map((note: NoteData) => (
                        <div
                            key={note.id}
                            style={{
                                marginBottom: "20px",
                                border: "1px solid #ccc",
                                padding: "10px",
                                borderRadius: "5px",
                            }}
                        >
                            <h3>Note: {note.title}</h3>
                            <Note initial={note.content} />
                        </div>
                    ))}
            </div>
        </>
    );
}

export default Home;

/*<Note
                    initial={JSON.stringify([
                        {
                            type: "paragraph",
                            children: [
                                {
                                    text: "asd dSAad",
                                },
                                {
                                    text: "snklvd",
                                    italic: true,
                                },
                                {
                                    text: "skk kéA",
                                },
                                {
                                    bold: true,
                                    text: " lidsne o",
                                },
                                {
                                    text: "f text in a p",
                                },
                                {
                                    text: "aragra",
                                    underline: true,
                                },
                                {
                                    text: "ph. ",
                                },
                            ],
                        },
                        {
                            type: "heading-one",
                            children: [
                                {
                                    text: "dsa",
                                },
                            ],
                        },
                        {
                            type: "paragraph",
                            align: "right",
                            children: [
                                {
                                    text: "ez egy teszt nem tom",
                                },
                            ],
                        },
                    ])}
                /> */
