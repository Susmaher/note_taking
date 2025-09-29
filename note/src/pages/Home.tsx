import { useState, useEffect, type JSX } from "react";
import Note from "../Components/note";
import { Link } from "react-router-dom";
import "../css/home.css";
import api from "../ts/api";
import { useAuth } from "../context/UseAuth";

interface NoteData {
    content: string;
    id: string;
    title: string;
    isPublic: string;
}

function Home(): JSX.Element {
    const auth = useAuth();
    const { isAuthorized, verifyAuth } = auth;

    const [noteList, setNoteList] = useState<NoteData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchNotes = async () => {
        try {
            setLoading(true);
            const response = await api.get("/api/Notes/public-notes");
            console.log("API response:", response.data);
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
                {!isAuthorized ? (
                    <div className="button-div-home-page">
                        <Link to="/sign-in" className="home-page-link-element">
                            Sign in
                        </Link>
                        <Link to="/sign-up" className="home-page-link-element">
                            Sign up
                        </Link>
                    </div>
                ) : (
                    <div className="button-div-home-page">
                        <button
                            onClick={async () => {
                                await api.get("api/Auth/logout/");
                                verifyAuth();
                            }}
                        >
                            Log out
                        </button>
                    </div>
                )}
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
                            <Note
                                initial={note.content}
                                id={note.id}
                                isPublic="true"
                            />
                        </div>
                    ))}
            </div>
        </>
    );
}

export default Home;
