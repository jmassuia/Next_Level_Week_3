import React from 'react'

import {Link} from 'react-router-dom';
import {FiPlus} from 'react-icons/fi';
import { Map, TileLayer } from 'react-leaflet';
 
import 'leaflet/dist/leaflet.css'

import mapMarkerImg from '../images/Logo2.png';

import '../styles/pages/orphanagesMap.css';

export default function OrphanagesMap(){
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
        </Map>

        <Link to="" className="create-orphanage">
            <FiPlus size={32} color="#fff"/>
        </Link>
    </div>
    )
}