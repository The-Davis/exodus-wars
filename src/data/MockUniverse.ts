/* eslint-disable */
export interface POI {
  id: string;
  x: number;
  y: number;
  name: string;
}

export interface PlanetPOI extends POI {
  orbitRadius: number;
  mass: string;
  orbitTime: string;
  rotation: string;
  temperature: string;
  history: string;
  color: string;
}

export interface StarPOI extends POI {
  planets: PlanetPOI[];
  color: string;
}

export interface ClusterPOI extends POI {
  stars: StarPOI[];
  image: string;
}

export interface GalaxyData {
  clusters: ClusterPOI[];
}

export const Universe: GalaxyData = {
    clusters: [
        {
            id: 'local_cluster',
            x: 0.35,
            y: 0.6,
            name: 'Local Cluster',
            image: '/assets/galaxy/Local_Cluster.png',
            stars: [
                {
                    id: 'sol',
                    x: 0.5,
                    y: 0.5,
                    name: 'Sol',
                    color: '#ffdd44',
                    planets: [
                        {
                            id: 'earth',
                            x: 0,
                            y: 0,
                            name: 'Earth',
                            orbitRadius: 150,
                            mass: '1.0 Earths',
                            orbitTime: '365.25 Days',
                            rotation: '24 Hours',
                            temperature: '288 K',
                            history: 'The cradle of humanity and the capital of the Systems Alliance. Despite centuries of industrialization, the planet has largely recovered due to advanced environmental engineering.',
                            color: '#3366ff'
                        },
                        {
                            id: 'mars',
                            x: 0,
                            y: 0,
                            name: 'Mars',
                            orbitRadius: 250,
                            mass: '0.107 Earths',
                            orbitTime: '687 Days',
                            rotation: '24.6 Hours',
                            temperature: '210 K',
                            history: 'The site of the ancient Prothean ruins that propelled humanity into the galactic community. It is heavily colonized and industrialized.',
                            color: '#ff4422'
                        }
                    ]
                }
            ]
        },
        {
            id: 'exodus_cluster',
            x: 0.45,
            y: 0.4,
            name: 'Exodus Cluster',
            image: '/assets/galaxy/Exodus_Cluster.png',
            stars: [
                {
                    id: 'utopia',
                    x: 0.5,
                    y: 0.5,
                    name: 'Utopia',
                    color: '#aaaaff',
                    planets: [
                        {
                            id: 'eden_prime',
                            x: 0,
                            y: 0,
                            name: 'Eden Prime',
                            orbitRadius: 180,
                            mass: '0.98 Earths',
                            orbitTime: '312 Days',
                            rotation: '22 Hours',
                            temperature: '295 K',
                            history: "One of humanity's most idyllic colonies, representing the pinnacle of terrestrial engineering before the Geth attack.",
                            color: '#44cc66'
                        }
                    ]
                }
            ]
        },
        {
            id: 'arcturus_stream',
            x: 0.4,
            y: 0.5,
            name: 'Arcturus Stream',
            image: '/assets/galaxy/Arcturus_Stream.png',
            stars: [
                {
                    id: 'arcturus',
                    x: 0.5,
                    y: 0.5,
                    name: 'Arcturus',
                    color: '#ffaa33',
                    planets: [
                        {
                            id: 'arcturus_station',
                            x: 0,
                            y: 0,
                            name: 'Arcturus Station',
                            orbitRadius: 100,
                            mass: 'N/A (Space Station)',
                            orbitTime: 'Geosynchronous',
                            rotation: 'Artificial',
                            temperature: 'Controlled',
                            history: 'The hub of the Systems Alliance military and government. Serves as the central command for all human forces.',
                            color: '#999999'
                        }
                    ]
                }
            ]
        }
    ]
};
