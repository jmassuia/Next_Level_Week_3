import React, { useEffect,useState } from 'react'

import {Link} from 'react-router-dom';
import {FiPlus, FiArrowRight} from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import api from '../services/api';

import Leaftet from 'leaflet';
 
import 'leaflet/dist/leaflet.css'

import mapMarkerImg from '../images/Logo2.png';

import '../styles/pages/orphanagesMap.css';

interface Orphanage{
    id: number,
    latitude: number,
    longitude: number,
    name: string
}

export default function OrphanagesMap(){

    const mapIcon = Leaftet.icon({
        iconUrl: mapMarkerImg,
        iconSize: [40,50],
        iconAnchor: [20,50],
        popupAnchor: [0,-48]
    })

    const [orphanages,setOrphanages] = useState<Orphanage[]>([]);

    useEffect(()=>{
        api.get('orphanages').then(response =>{
            setOrphanages(response.data);
            console.log(response.data);
        })
    },[])

    return(
    <div id="page-map">
        <aside>
            <header>
                <img src={mapMarkerImg} alt="Mapmarker"/>
                <h2>Escolha um orfanato no mapa</h2>
                <p>Muitas crianças estão esperando a sua visita :)</p>
            </header>
            <footer>
                <strong>Campinas</strong>
                <span>Interior de São Paulo</span>
            </footer>
        </aside>

        <Map 
            className='map'
            center={[-22.9412058,-47.1527329]}
            zoom={13}
            style={{width:'100%',height:'100%'}}
        >
            <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

            {orphanages.map(orphanage =>{
                return(
                    <Marker
                    position={[orphanage.latitude,orphanage.longitude]}
                    icon={mapIcon}
                    key={orphanage.id}
                    >
                        <Popup closeButton={false} minWidth={240} maxHeight={240} className="map-popup">
                            {orphanage.name}
                            <Link to={`/orphanage/${orphanage.id}`}>
                                <FiArrowRight size={20} color="#FFF"/>
                            </Link>
                        </Popup>
                    </Marker>
                )
            })}
        </Map>

        <Link to="/newOrphanage" className="create-orphanage">
            <FiPlus size={32} color="#fff"/>
        </Link>
    </div>
    )
}