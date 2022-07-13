import React from "react";
import { useState } from "react";
import { YMaps, Map, Clusterer, Placemark, GeolocationControl } from "react-yandex-maps";

import points from "./shops.json";

import "./shopspage.scss";


const getPointOptions = () => {
    return {
        preset: "islands#brownIcon"
    };
};
const ShopsPage = () => {
    const [cluster, setCluster] = useState({
        center: [55.751774, 37.573856],
        zoom: 9,
        behaviors: ["default", "scrollZoom"]
    });

   
    const getPointOnMap = (coords) => () => {
        setCluster({ center: coords, zoom: 16, behaviors: ["default", "scrollZoom"] });
    }
    
    return (
        <div className="shops__block">
            <div className="block__info-wrapper">
                <h3>Магазины </h3>
                <div className="info-shop__block block">
                    {points.map(({ shop, adress, phone, time, coordinates }, idx) => (
                        <div key={idx}
                            onClick={getPointOnMap(coordinates)}
                            className="block__info info">
                            <h5>{shop}</h5>
                            <div className="info-adress">{adress}</div>
                            <div className="info-work">Время работы {time}</div>
                            <div className="info-phone">Телефон {phone}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="map__block">

                <YMaps>
                    <Map state={cluster}
                        width="70vw"
                        height="100vh" >
                        <GeolocationControl />
                        <Clusterer
                            options={{
                                preset: "islands#invertedBrownClusterIcons",
                                checkZoomRange: true,
                                // groupByCoordinates: false,
                                // clusterDisableClickZoom: true,
                                // clusterHideIconOnBalloonOpen: false,
                                // geoObjectHideIconOnBalloonOpen: true
                            }}
                        >
                            {points.length > 0 ?
                                points.map(({ shop, adress, phone, time, coordinates }, idx) => (
                                    <Placemark
                                        key={idx}
                                        modules={["geoObject.addon.balloon"]}
                                        geometry={coordinates}
                                        properties={{
                                            balloonContentHeader: '<strong>12STOREES</strong><br/>',
                                            balloonContent: `Адрес: <strong>${adress}</strong><br/>${shop} <br/>
                                            <br/>
                                            Время работы: ${time} <br/>
                                            <br/>Телефон: ${phone}
                                           `
                                        }}
                                        options={getPointOptions()}
                                    />
                                )) : ''
                            }
                        </Clusterer>
                    </Map>
                </YMaps>
            </div>
        </div>
    );
}
export default ShopsPage;