import './App.css';
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {useEffect, useRef, useState} from "react";
import logo from './logo.svg';
import locatorIcon from './locator.png'
import L from 'leaflet';

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

const markers = {
    'a': [
        {id: 1, position: [45.6292, 9.1471], message: 'Foo'},
        {id: 2, position: [45.6282, 9.1471], message: 'Bar'}
    ]
}

const getMarkerPositions = (code) => {
    return markers[code]
}

function App() {
    const [code, setCode] = useState()
    const [visited, setVisited] = useState([]);
    const [noNavigator, setNoNavigator] = useState(false)
    const [ownPosition, setOwnPosition] = useState()
    const next = code ? getMarkerPositions(code).find(x => x.id > Math.max(visited))?.id ?? 1 : -1

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.watchPosition(
                (pos) => {
                    setOwnPosition([pos.coords.latitude, pos.coords.longitude])
                },
                () => setNoNavigator(true),
                {
                    enableHighAccuracy: true,
                });
        } else {
            setNoNavigator(true);
        }
    }, [])

    if (!code) {
        return <CodeInput setCode={setCode}/>
    }

    return (
        <div className="App">
            <MapContainer center={[45.6292, 9.1471]} zoom={16} id='map'>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {getMarkerPositions(code).map(pos => (
                    <Marker
                        title={pos.id}
                        position={pos.position}
                        key={`${pos.position[0]}${pos.position[1]}`}
                        icon={pos.id === next ? nextMarkerIcon : visited.includes(pos.id) ? visitedMarkerIcon : markerIcon}
                    >
                        <Popup>
                            {pos.message}
                            <div style={{marginTop: 4}}>
                                {visited.includes(pos.id)
                                    ? <button onClick={() => window.confirm("") ? setVisited(x => x.filter(y => y !== pos.id)) : null}>No avevo sbagliato, non ci siamo ancora passati</button>
                                    : <button onClick={() => window.confirm("Segno questa base come completata? Se non l'avete davvero fatta sono fatti vostri eh, io ve l'ho detto!") ? setVisited(x => [...x, pos.id]) : null}>Siamo arrivati!</button>
                                }
                            </div>
                        </Popup>
                    </Marker>
                ))}
                {ownPosition && <Marker position={ownPosition} icon={ownMarkerIcon}/>}
            </MapContainer>
        </div>
    );
}

function CodeInput({setCode}) {
    const inputRef = useRef();
    const [error, setError] = useState(false);

    const handleSubmit = () => {
        const code = inputRef.current.value?.toLowerCase();

        if (getMarkerPositions(code)) {
            setError(false);
            setCode(code);
        } else {
            setError(true);
        }
    }

    return (
        <div className={'inputContainer'}>
            <img src={logo} alt='CNGEI'/>
            <div className={'inputTitle'}>Inserisci il codice della tua bipattuglia</div>
            {error && <div className={'inputError'}>Il codice inserito non &egrave; valido!</div>}
            <form className={'inputBar'} onSubmit={handleSubmit}>
                <input ref={inputRef} placeholder={'Codice...'}/>
                <button type={'submit'}>Inizia</button>
            </form>
        </div>
    )
}

export default App;
