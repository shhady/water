import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHomeUser, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { MyContext } from "../../services/MyProvider";
import Window from '../Window/Window'


/**
 * The 404 page.
 * @returns The 404 page.
 */
export default function NotFound() {

    const navigate = useNavigate();
    const { setIsLoading } = useContext(MyContext);

    useEffect(() => {
        setIsLoading(false)
    }, [])

    return (
        <div className="canvas">
            <Window title={`I-Jet`} smallTitle={`404`}>
                <div style={{ margin: "5rem" }}>
                    {/* <h1 style={{ textAlign: "center" }}>404</h1> */}
                    <h1>אופס.. לא היית אמור להגיע לכאן</h1>
                    <div className="btnContainer" style={{ marginTop: "1rem" }}>
                        <button
                            onClick={() => { navigate(-1) }}
                            className="btn"><FontAwesomeIcon icon={faArrowRight} />&nbsp;אחורה
                        </button>
                        <button
                            onClick={() => { navigate('/') }}
                            className="btn wideBtn">חזרה&nbsp;לדף&nbsp;הבית&nbsp;
                            <FontAwesomeIcon icon={faHomeUser} />
                        </button>
                    </div>
                </div>
            </Window>
        </div>
    )
}
