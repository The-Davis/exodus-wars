import { describe, it, expect } from 'vitest';
import { CodexRenderer } from './CodexRenderer';
import { getCodexArticle } from './articleRegistry';

describe('Technological Catalogs & Tactical Hardware Specifications', () => {
    describe('Starship Class Information Template Rendering', () => {
        it('renders starship class specification with naval header and technical specs', () => {
            const wikitext = `{{Starship Class Information|
|name = Vigilant Class Frigate
|image = [[Image:VigilantClassFrigate.jpg|300px]]
|caption = Vigilant Class patrol frigate
|designation = Fast Escort Frigate
|builder = Staatliche Werften
|operator = United Centusi States Kriegsmarine
|number_of_ships = 42
|crew = 180
|length = 240
|beam = 45
|height = 38
|total_volume = 120000
|powerplant = 2 x Hyperion Fission Reactors
|propulsion = Dual Ion Impulse Drives
|ftl_drive = Class-3 Hyperspace Shunt
|acceleration = 35
|sensors = Long-Range Tachyon Phased Array
|processing_system = Argus Mark IV Naval Core
|aircraft = 4 x Interceptors
|personnel = 40 Marines
|support_capacity = 5000
|weapons = 4 x Heavy Railgun Batteries, 12 x Point Defense CIWS
|armor = Composite Trinium Plating
|shields = Dual-Layer Graviton Screen
|special = Stealth Subspace Diver System
}}
The Vigilant Class represents the backbone of outer colony patrol operations.`;

            const html = CodexRenderer.render(wikitext);

            // Container and header
            expect(html).toContain('class="codex-infobox starship-information"');
            expect(html).toContain('class="infobox-header starship-header"');
            expect(html).toContain('NAVAL ARCHIVE // CAPITAL SHIP SPECIFICATION');
            expect(html).toContain('Vigilant Class Frigate');

            // Image & Caption
            expect(html).toContain('VigilantClassFrigate.jpg');
            expect(html).toContain('Vigilant Class patrol frigate');

            // Sections
            expect(html).toContain('Class Features');
            expect(html).toContain('Dimensions & Personnel');
            expect(html).toContain('Propulsion & Systems');
            expect(html).toContain('Accommodations');
            expect(html).toContain('Combat Systems');

            // Formatted values and units
            expect(html).toContain('Fast Escort Frigate');
            expect(html).toContain('Staatliche Werften');
            expect(html).toContain('Total 42');
            expect(html).toContain('240 meters');
            expect(html).toContain('45 meters');
            expect(html).toContain('120000 m³');
            expect(html).toContain('35 km/h/s');
            expect(html).toContain('Class-3 Hyperspace Shunt');
            expect(html).toContain('Composite Trinium Plating');
            expect(html).toContain('Dual-Layer Graviton Screen');
            expect(html).toContain('Stealth Subspace Diver System');

            // Body text preserved
            expect(html).toContain('The Vigilant Class represents the backbone of outer colony patrol operations.');
        });
    });

    describe('Starship Information Template Rendering', () => {
        it('renders individual capital ship record with hull data and commander', () => {
            const wikitext = `{{Starship Information|
|name = BG-1 Jerome Black
|image = BG1JeromeBlack1.jpg
|caption = Flagship of the First Fleet of the Line
|ship_class = Jerome Black Class Dreadnought
|laid_down = 2120
|launched = 2124
|commissioned = January 22, 2324
|status = Active Fleet Flagship
|commander = Admiral Robert Marshall
|crew = 2,200
|processing_system = Prism (Biomechanical Neural Core)
|squadrons = 3rd Strike Wing "Valkyrie"
|unique = 55 Gradient Gravity Shield Couplings
}}
The Jerome Black is the most celebrated dreadnought in the fleet.`;

            const html = CodexRenderer.render(wikitext);

            expect(html).toContain('class="codex-infobox starship-information"');
            expect(html).toContain('class="infobox-header starship-header"');
            expect(html).toContain('NAVAL REGISTRY // CAPITAL SHIP RECORD');
            expect(html).toContain('BG-1 Jerome Black');
            expect(html).toContain('Flagship of the First Fleet of the Line');

            expect(html).toContain('Hull Information');
            expect(html).toContain('Operational Registry');

            expect(html).toContain('Jerome Black Class Dreadnought');
            expect(html).toContain('2120');
            expect(html).toContain('Active Fleet Flagship');
            expect(html).toContain('Admiral Robert Marshall');
            expect(html).toContain('2,200');
            expect(html).toContain('Prism (Biomechanical Neural Core)');
            expect(html).toContain('55 Gradient Gravity Shield Couplings');

            expect(html).toContain('The Jerome Black is the most celebrated dreadnought in the fleet.');
        });
    });

    describe('Aircraft Information Template Rendering', () => {
        it('renders aerospace craft specifications with speed ratings and weapon loads', () => {
            const wikitext = `{{Aircraft Information|
|name = F-9E "Valkyrie"
|image = F-9_Valkyrie.png
|caption = Carrier-Based Air and Space Superiority Fighter
|mission_profile = Air and Space Superiority
|crew = 1 pilot
|first_flight = November 6, 2309
|manufacturer = Royal Imperial Labs
|operator = Royal Imperial Air Force
|variants = YF-9, F-9A, F-9E
|length = 12
|wingspan = 10
|height = 5
|powerplant = 1 x Tolwin AC-7 15.2mW Fission Reactor
|propulsion = Ramjet and MPD Thrusters
|avionics = Ghost-Eye Targeting Suite
|controls = Fly-by-Light Neural Uplink
|sensors = Multispectral Phased Array
|communications = Secure Burst Laser
|max_airspeed = 4.5
|cruising_airspeed = 2400
|acceleration_rate = 28.9
|max_velocity = 45
|operation_time = 12
|fixed_weapons = 1 x BC-1 Laser, 1 x GC-2 Gauss Cannon
|variable_payload = 4 x ASIM-1 Missiles
|armor = Titanium-Boron Composite
|shields = Micro-Deflector Screen
|countermeasures = Chaff / Flare / Active ECM
}}
The F-9 Valkyrie is the premier fighter in service.`;

            const html = CodexRenderer.render(wikitext);

            expect(html).toContain('class="codex-infobox aircraft-information"');
            expect(html).toContain('class="infobox-header aircraft-header"');
            expect(html).toContain('AEROSPACE ARCHIVE // FLIGHT SYSTEM SPECIFICATION');
            expect(html).toContain('F-9E "Valkyrie"');

            expect(html).toContain('General Characteristics');
            expect(html).toContain('Main Systems');
            expect(html).toContain('Performance Ratings');
            expect(html).toContain('Combat Systems');

            expect(html).toContain('Air and Space Superiority');
            expect(html).toContain('12 meters');
            expect(html).toContain('10 meters');
            expect(html).toContain('5 meters');
            expect(html).toContain('Mach 4.5');
            expect(html).toContain('2400 km/h');
            expect(html).toContain('28.9 km/h/s');
            expect(html).toContain('45 km/s');
            expect(html).toContain('12 hours');
            expect(html).toContain('Titanium-Boron Composite');
            expect(html).toContain('Chaff / Flare / Active ECM');

            expect(html).toContain('The F-9 Valkyrie is the premier fighter in service.');
        });
    });

    describe('Aircraft Variant Card Rendering', () => {
        it('renders inline variant specification cards', () => {
            const wikitext = `== Variants ==
{{Aircraft Variant|
|name = YF-9 Prototype
|powerplant = Tolwin AC-7 Fission Unit
|propulsion = Ramjet RJ-13r
|max_airspeed = 4.2
|acceleration_rate = 26.5
|fixed_weapons = 2 x Gauss Autocannons
}}
The YF-9 was the pre-production prototype airframe.`;

            const html = CodexRenderer.render(wikitext);

            expect(html).toContain('class="aircraft-variant-card"');
            expect(html).toContain('AEROSPACE SPEC // VARIANT RECORD');
            expect(html).toContain('YF-9 Prototype');
            expect(html).toContain('Tolwin AC-7 Fission Unit');
            expect(html).toContain('Mach 4.2');
            expect(html).toContain('26.5 km/h/s');
            expect(html).toContain('2 x Gauss Autocannons');
            expect(html).toContain('The YF-9 was the pre-production prototype airframe.');
        });
    });

    describe('Vehicle Information Template Rendering', () => {
        it('renders ground vehicle specification with armored cavalry header', () => {
            const wikitext = `{{Vehicle Information|
|name = M-21 Hercules
|image = M-5Hercules_A.jpg
|caption = Light Combat Rig in deployment
|mission_profile = Light Bipedal Combat Walker
|crew = 1 pilot
|manufacturer = New Dallas Industries
|operator = Prefecture Marine Corps
|powerplant = Micro-Fusion Turbine
|propulsion = Dual Bipedal Servo Actuators
|max_speed = 65
|fixed_weapons = 1 x 30mm Autocannon, 2 x TOW Missile Tubes
|armor = Reactive Chobham Composite
|shields = Low-Frequency Kinetic Barrier
|countermeasures = Smoke Dispensers
}}
The Hercules is a versatile combat walker.`;

            const html = CodexRenderer.render(wikitext);

            expect(html).toContain('class="codex-infobox vehicle-information"');
            expect(html).toContain('class="infobox-header vehicle-header"');
            expect(html).toContain('TACTICAL ARCHIVE // MECHANIZED UNIT SPECIFICATION');
            expect(html).toContain('M-21 Hercules');
            expect(html).toContain('Light Combat Rig in deployment');

            expect(html).toContain('Description');
            expect(html).toContain('Systems & Ratings');

            expect(html).toContain('Light Bipedal Combat Walker');
            expect(html).toContain('New Dallas Industries');
            expect(html).toContain('Prefecture Marine Corps');
            expect(html).toContain('65 km/h');
            expect(html).toContain('1 x 30mm Autocannon, 2 x TOW Missile Tubes');
            expect(html).toContain('Reactive Chobham Composite');

            expect(html).toContain('The Hercules is a versatile combat walker.');
        });
    });

    describe('Topic Hub Navigation & Article Registry', () => {
        it('resolves Technological_Catalogs index article via various slugs and aliases', () => {
            const article = getCodexArticle('Technological_Catalogs');
            expect(article).toBeDefined();
            expect(article?.title).toBe('Technological Catalogs');
            expect(article?.categories).toContain('Warships');
            expect(article?.categories).toContain('Aircraft');

            // Alternate cases and aliases
            expect(getCodexArticle('Technological Catalogs')).toBe(article);
            expect(getCodexArticle('technological_catalogs')).toBe(article);
            expect(getCodexArticle('technological catalogs')).toBe(article);
            expect(getCodexArticle('Category:Technological_Catalogs')).toBe(article);
            expect(getCodexArticle('Category:Technological Catalogs')).toBe(article);
            expect(getCodexArticle('Technology')).toBe(article);
            expect(getCodexArticle('technology')).toBe(article);

            // Major category aliases resolve to index
            expect(getCodexArticle('Warships')).toBe(article);
            expect(getCodexArticle('Category:Aircraft')).toBe(article);
            expect(getCodexArticle('Category:Starships')).toBe(article);
            expect(getCodexArticle('Vehicles')).toBe(article);
            expect(getCodexArticle('Category:Fighters')).toBe(article);
            expect(getCodexArticle('Category:Tanks')).toBe(article);
            expect(getCodexArticle('Category:Rigs')).toBe(article);
        });

        it('resolves imported articles across all four branches', () => {
            // 1. Warship
            const warship = getCodexArticle('BG-1_Jerome_Black');
            expect(warship).toBeDefined();
            expect(warship?.categories).toContain('Battleships');

            // 2. Aircraft
            const aircraft = getCodexArticle('O-24_Vadrie');
            expect(aircraft).toBeDefined();
            expect(aircraft?.categories).toContain('Fighters');

            // 3. Starship
            const starship = getCodexArticle('Interstellar_Exploration_Vehicle');
            expect(starship).toBeDefined();
            expect(starship?.categories).toContain('Exploration_Vessels');

            // 4. Vehicle
            const vehicle = getCodexArticle('M-10_Puma');
            expect(vehicle).toBeDefined();
            expect(vehicle?.categories).toContain('Tanks');
        });
    });
});
