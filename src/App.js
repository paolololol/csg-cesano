import './App.css';
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {useEffect, useRef, useState} from "react";
import logo from './logo.svg';
import locatorIcon from './locator.png'
import L from 'leaflet';
import {getMarkers} from "./pattuglie";

const ownMarkerIcon = L.icon({
    iconUrl: locatorIcon,
    iconSize: 48,
})

const markerIcon = L.icon({
    iconUrl: logo,
    iconSize: 32,
    className: 'market notVisited'
})

const visitedMarkerIcon = L.icon({
    iconUrl: logo,
    iconSize: 32,
    className: 'marker visited'
})

const nextMarkerIcon = L.icon({
    iconUrl: logo,
    iconSize: 32,
    className: 'marker next'
})

function App() {
    const [code, setCode] = useState(localStorage.getItem('code'))
    const [visited, setVisited] = useState(JSON.parse(localStorage.getItem('visited')) ?? []);
    const [ownPosition, setOwnPosition] = useState()
    const next = code ? getMarkers(code).find(x => x.id > (visited.length ? Math.max(...visited) : -1))?.id ?? -999 : -1

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.watchPosition(
                (pos) => {
                    setOwnPosition([pos.coords.latitude, pos.coords.longitude])
                },
                () => null,
                {
                    enableHighAccuracy: true,
                });
        }
    }, [])

    useEffect(() => {
       if(next === -999) {
          window.alert("Avete completato tutte le tappe! Potete rientrare al sottocampo!")
       }
    }, [next])

    useEffect(() => {
       localStorage.setItem('visited', JSON.stringify(visited))
    }, [visited])

    useEffect(() => {
        if(code) {
            localStorage.setItem('code', code)
        }
    }, [code])

    if (!code) {
        return <CodeInput setCode={setCode}/>
    }

    return (
        <div className="App">
            <MapContainer center={getMarkers(code)[0].position} zoom={14} id='map'>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {getMarkers(code).map(pos => (
                    <Marker
                        title={pos.id}
                        position={pos.position}
                        key={`${pos.position[0]}${pos.position[1]}`}
                        icon={pos.id === next ? nextMarkerIcon : visited.includes(pos.id) ? visitedMarkerIcon : markerIcon}
                    >
                        <Popup>
                            <div className={'tappaDescription'}>{pos.name}</div>
                            <div style={{marginTop: 4}}>
                                {visited.includes(pos.id)
                                    ? <button className={'tappaButton'} onClick={() => window.confirm("Facciamo finta di nulla e la segno come non fatta? Amici come prima?") ? setVisited(x => x.filter(y => y !== pos.id)) : null}>No avevo sbagliato, non ci siamo ancora passati</button>
                                    : <button className={'tappaButton'} onClick={() => window.confirm("Segno questa base come completata? Se non l'avete davvero fatta sono fatti vostri eh, io ve l'ho detto!") ? setVisited(x => ([...x, pos.id])) : null}>Siamo arrivati!</button>
                                }
                            </div>
                        </Popup>
                    </Marker>
                ))}
                {ownPosition && <Marker position={ownPosition} icon={ownMarkerIcon}/>}
            </MapContainer>
            <button className={'resetButton'} onClick={() => window.confirm("Ripartirai da zero, sei sicuro?") ? (localStorage.clear(), window.location.reload()) : null}>Cancella tutti i dati</button>
        </div>
    );
}

function CodeInput({setCode}) {
    const inputRef = useRef();
    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const code = inputRef.current.value?.toLowerCase();

        if (getMarkers(code)) {
            setError(false);
            setCode(code);
        } else {
            setError(true);
        }
    }

    return (
        <div className={'inputContainer'}>
            <img src={logo} alt='CNGEI' className={'introLogo'}/>
            <div className={'inputTitle'}>Inserisci il codice della tua bipattuglia</div>
            {error && <div className={'inputError'}>Il codice inserito non &egrave; valido!</div>}
            <form className={'inputBar'} onSubmit={handleSubmit}>
                <input ref={inputRef} placeholder={'Codice...'}/>
                <button type={'submit'}>Inizia</button>
            </form>
            <div className={'descrizione'}>
                <p><strong>Istruzioni:</strong> dovrete andare nei luoghi indicati sulla mappa. Poi premete il logo della vostra base e segnate quando ci siete passati e avete svolto l'attivit&agrave;</p>
                <p>C'&egrave; un ordine da seguire! Guardate i simboli sulla mappa:</p>
                <ul>
                    <li><img src={logo} width={32} height={32} className={'visited'}/>Ci siete gi&agrave; passati, tutto ok!</li>
                    <li><img src={logo} width={32} height={32} className={'next'}/>Dovete andare qui come prossima tappa</li>
                    <li><img src={logo} width={32} height={32} className={'notVisited'}/>Dovete ancora passare, ma non &egrave; la vostra prossima</li>
                </ul>
            </div>
        </div>
    )
}

export default App;
