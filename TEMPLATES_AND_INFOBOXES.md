# MediaWiki Templates & Infoboxes Reference Guide

This document provides a comprehensive technical reference for all **38 templates and infoboxes** extracted from the Exodus Wars MediaWiki database (`wiki_ew.dump`).

It details their classifications, parameter definitions, field schemas, usage statistics, styling patterns, and sample wikitext invocations.

## Table of Contents

- [Executive Summary & Classification](#executive-summary--classification)
- [Styling & Design Architecture](#styling--design-architecture)
- [Infobox Catalog (24 Templates)](#infobox-catalog-24-templates)
  - [Person_Information (92 pages)](#person-information)
  - [Starship_Class_Information (68 pages)](#starship-class-information)
  - [Planet_Information (46 pages)](#planet-information)
  - [Military_Conflict (38 pages)](#military-conflict)
  - [Aircraft_Information (33 pages)](#aircraft-information)
  - [City_Information (31 pages)](#city-information)
  - [Nation_Information (31 pages)](#nation-information)
  - [Star_Information (31 pages)](#star-information)
  - [Starship_Information (29 pages)](#starship-information)
  - [Military_Branch_Information (22 pages)](#military-branch-information)
  - [Stellar_Navigation_Information (13 pages)](#stellar-navigation-information)
  - [Military_Overview_Information (7 pages)](#military-overview-information)
  - [Vehicle_Information (7 pages)](#vehicle-information)
  - [Military_Operation_Information (6 pages)](#military-operation-information)
  - [Treaty_Information (6 pages)](#treaty-information)
  - [Alliance_Information (5 pages)](#alliance-information)
  - [Infantry_Information (5 pages)](#infantry-information)
  - [Region_Information (5 pages)](#region-information)
  - [Squadron_Information (4 pages)](#squadron-information)
  - [Historical_Period_Information (3 pages)](#historical-period-information)
  - [Military_Force_Information (2 pages)](#military-force-information)
  - [War_Information (2 pages)](#war-information)
  - [Weapon_Information (2 pages)](#weapon-information)
  - [Intelligence_Branch_Information (1 pages)](#intelligence-branch-information)
  - [Space_Station_Information (1 pages)](#space-station-information)
- [Navigation Boxes Catalog (9 Templates)](#navigation-boxes-catalog-9-templates)
  - [Second_Exodus_War_Navbox (45 pages)](#second-exodus-war-navbox)
  - [Tempest_War_Navbox (15 pages)](#tempest-war-navbox)
  - [UCS_Fleet (7 pages)](#ucs-fleet)
  - [Volucris_Incursion_Navbox (6 pages)](#volucris-incursion-navbox)
  - [Mesarthrim_Fleet (3 pages)](#mesarthrim-fleet)
  - [Onyx_Empire (1 pages)](#onyx-empire)
  - [Pelagrim_Crisis_Navbox (1 pages)](#pelagrim-crisis-navbox)
  - [United_Earth_Alliance (1 pages)](#united-earth-alliance)
  - [Volucris_War_Navbox (1 pages)](#volucris-war-navbox)
- [Utility & Documentation Templates (5 Templates)](#utility--documentation-templates-5-templates)
  - [Aircraft_Variant (3 pages)](#aircraft-variant)
  - [Pp-template (3 pages)](#pp-template)
  - [Template_doc_inline (2 pages)](#template-doc-inline)
  - [Template_doc (1 pages)](#template-doc)
- [Static Site Migration Recommendations for Templates](#static-site-migration-recommendations-for-templates)

## Executive Summary & Classification

| Category | Template Count | Total Page Invocations | Description |
| :--- | :---: | :---: | :--- |
| **Infoboxes** | 25 | 490 | Structured entity cards for characters, ships, planets, military units, and historical conflicts. |
| **Navigation Boxes** | 9 | 80 | Footer and sidebar horizontal/vertical link menus grouping fleets, factions, and wars. |
| **Utilities & Docs** | 4 | 9 | Sub-templates (e.g. `Aircraft_Variant`), protection notices, and template documentation. |
| **Total** | **38** | **579** | **Full template library of the Exodus Wars Wiki** |

## Styling & Design Architecture

Across all infoboxes, the wiki maintains a consistent visual design language:
- **Primary Theme Color**: `#1E5188` (Exodus Wars navy blue) used for title banner background, section dividers, and table borders.
- **Typography**: White bold headings `<font color="white">` on `#1E5188` background. Body labels in normal text, values right-aligned.
- **Layout**: Floated right (`align="right"`), width ranging from `35%` to `40%` with margins `margin: 0 0 1em 1em` to allow article text to flow naturally alongside.
- **Border Styling**: `border: 1px solid #1E5188` or `border: 3px solid #1E5188` with cell padding `cellpadding="2"` or `0`.
- **Image Handling**: Centered thumbnail with caption wrapped in `<small><small>{{{caption}}}</small></small>`.

---

## Infobox Catalog (24 Templates)

### `Person_Information`

- **Type**: Infobox Entity Card
- **Usage Count**: 92 articles
- **Template Source**: [`wiki/templates/Person_Information.md`](file:///c:/Users/jdavi/Documents/GitHub/exodus-wars/wiki/templates/Person_Information.md)
- **Sample Articles Using This**: `Anthony_Hadrian`, `Lucius_Black`, `Emil_Torsc`, `Marcus_Rathbone`, `Jack_Ivonrud`

#### Parameter Schema

| Parameter | Data Type | Notes / Description |
| :--- | :--- | :--- |
| `achievements` | Text / Wikilink | Field value for achievements |
| `allegiance` | Wikilink | Faction or governing entity |
| `birth_date` | Date / Year | In-universe or historical date |
| `birth_place` | Date / Year | In-universe or historical date |
| `caption` | String | Image description / caption |
| `death_date` | Date / Year | In-universe or historical date |
| `death_place` | Date / Year | In-universe or historical date |
| `image` | Image Link / Filename | Embedded image wikilink e.g. `[[Image:filename.png|200px]]` or bare filename |
| `name` | String | Primary name / title of the entity |
| `profession` | Text / Wikilink | Field value for profession |
| `recognitions` | Text / Wikilink | Field value for recognitions |

#### Sample Invocation in Wikitext

```wikitext
{{Person Information|
|name =Antonius "Anthony" Aurelius Hadrian
|image =
|caption =
|birth_date =November 7, [[2060]]
|birth_place =[[Ailqot]], [[Torimur]], [[Cildeng System]]
|death_date =
|death_place =
|allegiance =[[Federated Districts of the Prefecture]]
|profession =Military Strategist<br/>Political Leader
|recognitions =Office of [[Prefect]]
|achievements =Founder of the [[Prefecture]]
}}
```

---

### `Starship_Class_Information`

- **Type**: Infobox Entity Card
- **Usage Count**: 68 articles
- **Template Source**: [`wiki/templates/Starship_Class_Information.md`](file:///c:/Users/jdavi/Documents/GitHub/exodus-wars/wiki/templates/Starship_Class_Information.md)
- **Sample Articles Using This**: `Vigilant_Class_Frigate`, `Gremlin_Class_Gunship`, `Nimitz_Class_Gunship`, `Trident_Class_Gunship`, `Adelisk_Class_Corvette`

#### Parameter Schema

| Parameter | Data Type | Notes / Description |
| :--- | :--- | :--- |
| `acceleration` | Numeric / Measurement | Specification value with unit (meters, tons, etc.) |
| `aircraft` | Text / Wikilink | Field value for aircraft |
| `armor` | Text / Wikilink | Field value for armor |
| `beam` | Numeric / Measurement | Specification value with unit (meters, tons, etc.) |
| `builder` | Wikilink | Faction or governing entity |
| `caption` | String | Image description / caption |
| `crew` | Numeric / Measurement | Specification value with unit (meters, tons, etc.) |
| `designation` | Wikilink | Faction or governing entity |
| `ftl_drive` | Text / Wikilink | Field value for ftl_drive |
| `height` | Numeric / Measurement | Specification value with unit (meters, tons, etc.) |
| `image` | Image Link / Filename | Embedded image wikilink e.g. `[[Image:filename.png|200px]]` or bare filename |
| `length` | Numeric / Measurement | Specification value with unit (meters, tons, etc.) |
| `list_of_ships` | Text / Wikilink | Field value for list_of_ships |
| `name` | String | Primary name / title of the entity |
| `number_of_ships` | Text / Wikilink | Field value for number_of_ships |
| `operator` | Wikilink | Faction or governing entity |
| `personnel` | Text / Wikilink | Field value for personnel |
| `powerplant` | Text / Wikilink | Field value for powerplant |
| `processing_system` | Text / Wikilink | Field value for processing_system |
| `propulsion` | Text / Wikilink | Field value for propulsion |
| `sensors` | Text / Wikilink | Field value for sensors |
| `shields` | Text / Wikilink | Field value for shields |
| `special` | Text / Wikilink | Field value for special |
| `support_capacity` | Text / Wikilink | Field value for support_capacity |
| `total_volume` | Numeric / Measurement | Specification value with unit (meters, tons, etc.) |
| `weapons` | Text / Wikilink | Field value for weapons |

#### Sample Invocation in Wikitext

```wikitext
{{Starship Class Information|
|name =Vigilant Class Frigate
|image = [[Image:Vigilant Class Frigate Normal View.png|150px]]
|caption =Vigilant Class Frigate
|designation =Medium [[:Category:Frigates|Frigate]]
|builder =[[Haven Shipyards]]
|operator =[[Royal Imperial Navy]]<br/>[[Prefecture Galactic Navy]]<br/>[[Kalidasa Air and Space Corps]]<br/>[[Sirius Families]]
|number_of_ships = 670
|list_of_ships = [[HMS Vigilant|HMS ''Vigilant'' (FG-1)]]<br/>[[Vigilant Class Frigate#Complete List of Ships|View Complete List]]
|crew =950 Ship Crew
|length =389
|beam =85.7
|height =93.8
|total_volume =1,394,944.5
|powerplant =1 x Tolwin F1E 400mW Fission Reactor
|propulsion =<small>2 x Series-1 Ion Drives (pre-refit)<br/>2 x Gravity Cavitation Drives (post-refit)</small>
|ftl_drive =1 x Volstamik-Krenschov Jump Drive (Rated for [[Shest Band]])
|acceleration =55
|sensors =
|processing_system =C<sup>3</sup>TAR <small><small><small>Computerized<br/>Control, Communications,<br/>Target Acquisition<br/>and Reconnaissance</small></small></small>
|aircraft =None
|personnel =96 Marines <small>(standard troop complement)</small>
|support_capacity =209,241.7
|weapons =1 x [[Relativistic Mass Driver| MAC-1 Cannon]]<br/>4 x [[Gauss Cannons| GC-1 Cannons]]<br/>28 x [[Close-In Weapon System| CIWS-1]] Railguns
|armor =Series-2 Composite Armor Plating
|shields =PDS-1 Plasma Field
|special =
}}
```

---

### `Planet_Information`

- **Type**: Infobox Entity Card
- **Usage Count**: 46 articles
- **Template Source**: [`wiki/templates/Planet_Information.md`](file:///c:/Users/jdavi/Documents/GitHub/exodus-wars/wiki/templates/Planet_Information.md)
- **Sample Articles Using This**: `Earth`, `Theia`, `Mars`, `Ueda`, `Laojiu`

#### Parameter Schema

| Parameter | Data Type | Notes / Description |
| :--- | :--- | :--- |
| `capital` | Text / Wikilink | Field value for capital |
| `caption` | String | Image description / caption |
| `image` | Image Link / Filename | Embedded image wikilink e.g. `[[Image:filename.png|200px]]` or bare filename |
| `name` | String | Primary name / title of the entity |
| `orbit` | Text / Wikilink | Field value for orbit |
| `population` | Numeric / Measurement | Specification value with unit (meters, tons, etc.) |
| `rotation` | Text / Wikilink | Field value for rotation |
| `satellite` | Text / Wikilink | Field value for satellite |
| `satellite_orbit` | Text / Wikilink | Field value for satellite_orbit |
| `sovereign` | Wikilink | Faction or governing entity |
| `star_system` | Text / Wikilink | Field value for star_system |

#### Sample Invocation in Wikitext

```wikitext
{{Planet Information|
|name =Earth
|image =[[Image:Earth seen from Orbit.png|150px|center]]
|caption =The Earth, as seen from orbit
|star_system =[[Sol System]]
|population =4.35 billion
|sovereign =<small>[[Pax Anthronoris]] <small>Until [[18000BC]]<br/>Various [[:Category:Terran Nations|nations]] [[18000BC]]-[[2017]]<br/>[[United Earth Alliance]] [[2017]]-[[2315]]<br/>[[Onyx Empire]] [[2315]]-[[2323]]<br/>[[Sol System Authority]] [[2323]]-onwards.</small>
|capital =<small>[[Denver]] (under the [[United Earth Alliance]])<br/>[[Memphis]] (under the [[Onyx Empire]])<br/>[[Rio de Janeiro]] (under the [[Sol System Authority]])</small>
|orbit =365.2564 days
|rotation =23.95 hours
|satellite =[[Luna]]
|satellite_orbit =27.32 days
}}
```

---

### `Military_Conflict`

- **Type**: Infobox Entity Card
- **Usage Count**: 38 articles
- **Template Source**: [`wiki/templates/Military_Conflict.md`](file:///c:/Users/jdavi/Documents/GitHub/exodus-wars/wiki/templates/Military_Conflict.md)
- **Sample Articles Using This**: `Mesarthrim_Civil_War`, `Tempest_War`, `Second_Tirshan_Uprising`, `Third_Battle_of_Cronus`, `Volucris_Incursion`

#### Parameter Schema

| Parameter | Data Type | Notes / Description |
| :--- | :--- | :--- |
| `combatant1` | Text / Wikilink | Field value for combatant1 |
| `combatant2` | Text / Wikilink | Field value for combatant2 |
| `commander1` | Text / Wikilink | Field value for commander1 |
| `commander2` | Text / Wikilink | Field value for commander2 |
| `conflict` | Text / Wikilink | Field value for conflict |
| `date` | Date / Year | In-universe or historical date |
| `partof` | Text / Wikilink | Field value for partof |
| `place` | Text / Wikilink | Field value for place |
| `result` | Text / Wikilink | Field value for result |
| `status` | Text / Wikilink | Field value for status |
| `strength1` | Text / Wikilink | Field value for strength1 |
| `strength2` | Text / Wikilink | Field value for strength2 |
| `territory` | Text / Wikilink | Field value for territory |

#### Sample Invocation in Wikitext

```wikitext
{{Military Conflict|
|conflict=Sirius Incursion
|partof= Second Exodus War
|image=
|caption=
|date=January, [[2319]]
|place=Interstellar Conflict
|territory=[[Sirius Cluster]]
|status=[[Titan Peace Accords]]
|result=[[Onyx Empire|Empire]] repulsed.  [[Sirius Families]] officially recognized.
|combatant1 =[[Image:OnyxEmpireFlag.png|20px]] [[Onyx Empire]]<br/>
|combatant2 =[[Image:Sirius.png|20px]] [[Sirius Families]]
|commander1 =Rear Admiral [[Victor Pryce]]<br/>Commodore [[James Arnette]]
|commander2 =Commodore [[Chetana Sharma]]<br/>Admiral [[Dimitri Lavrov]]
|strength1=5 [[Royal Imperial Navy#Carrier_Group|Naval Carrier Groups]]<br/>10 [[Royal Imperial Army#Battalion|Army Battalions]]<br/>10 [[Mercury Class Transport|Mercury Transports]]
|strength2=[[Asanova Territorial Naval Forces|Asanova Black Fleet]]<br/>[[Berlusconi Territorial Naval Forces|Berlusconi Naval Guard]]<br/>[[Blazton Territorial Naval Forces|Blasius Defense Fleet]]<br/>[[Nakamura Territorial Naval Forces|Nakamura Navy]]
|losses1=5 [[Royal Imperial Navy#Carrier_Group|Naval Carrier Groups]]<br/>10 [[Royal Imperial Army#Battalion|Army Battalions]]<br/>10 [[Mercury Class Transport|Mercury Transports]]
|losses2=
}}
```

---

### `Aircraft_Information`

- **Type**: Infobox Entity Card
- **Usage Count**: 33 articles
- **Template Source**: [`wiki/templates/Aircraft_Information.md`](file:///c:/Users/jdavi/Documents/GitHub/exodus-wars/wiki/templates/Aircraft_Information.md)
- **Sample Articles Using This**: `F-09_Carrier_Fighter_-_"Valkyrie"`, `K-6_Eituk`, `XF-1_(Imperial_Experimental_Airframe)`, `XF-2_(Imperial_Experimental_Airframe)`, `XF-3_(Imperial_Experimental_Airframe)`

#### Parameter Schema

| Parameter | Data Type | Notes / Description |
| :--- | :--- | :--- |
| `acceleration_rate` | Numeric / Measurement | Specification value with unit (meters, tons, etc.) |
| `armor` | Text / Wikilink | Field value for armor |
| `avionics` | Text / Wikilink | Field value for avionics |
| `caption` | String | Image description / caption |
| `communications` | Text / Wikilink | Field value for communications |
| `controls` | Text / Wikilink | Field value for controls |
| `countermeasures` | Text / Wikilink | Field value for countermeasures |
| `crew` | Numeric / Measurement | Specification value with unit (meters, tons, etc.) |
| `cruising_airspeed` | Numeric / Measurement | Specification value with unit (meters, tons, etc.) |
| `first_flight` | Text / Wikilink | Field value for first_flight |
| `fixed_weapons` | Text / Wikilink | Field value for fixed_weapons |
| `height` | Numeric / Measurement | Specification value with unit (meters, tons, etc.) |
| `image` | Image Link / Filename | Embedded image wikilink e.g. `[[Image:filename.png|200px]]` or bare filename |
| `length` | Numeric / Measurement | Specification value with unit (meters, tons, etc.) |
| `manufacturer` | Wikilink | Faction or governing entity |
| `max_airspeed` | Numeric / Measurement | Specification value with unit (meters, tons, etc.) |
| `max_velocity` | Numeric / Measurement | Specification value with unit (meters, tons, etc.) |
| `mission_profile` | Text / Wikilink | Field value for mission_profile |
| `name` | String | Primary name / title of the entity |
| `operation_time` | Text / Wikilink | Field value for operation_time |
| `operator` | Wikilink | Faction or governing entity |
| `powerplant` | Text / Wikilink | Field value for powerplant |
| `propulsion` | Text / Wikilink | Field value for propulsion |
| `sensors` | Text / Wikilink | Field value for sensors |
| `shields` | Text / Wikilink | Field value for shields |
| `variable_payload` | Text / Wikilink | Field value for variable_payload |
| `variants` | Text / Wikilink | Field value for variants |
| `wingspan` | Text / Wikilink | Field value for wingspan |

#### Sample Invocation in Wikitext

```wikitext
{{Aircraft Information|
|image = [[Image:F-9 Valkyrie Standard View.png|150px]]
|caption =
|name = F-9E "Valkyrie"
|mission_profile =Carrier-Based Air and Space Superiority Fighter
|crew = 1 pilot
|first_flight = November 6, [[2309]] (YF-9)
|manufacturer = [[Royal Imperial Labs]] <br/>[[Alexi-Wrought Airworks]] <br/>[[Reimao Airworks]] <br/>[[Rahn Industries]]
|operator = [[Royal Imperial Air Force]] <br/> [[Prefecture Air Force]] <br/>[[Prefecture Marine Corps]]
|variants =YF-9, F-9, F-9A, F-9B, F-9C, F-9D, F-9E
|length =12
|wingspan =10
|height =5
|powerplant =1 x Rankine AC-14f 65mW Fusion Reactor
|propulsion =2 x Dwight SJ-6n Scramjets<br/>2 x Dwight GCD-1f Gravity Cavitation Drives
|controls =Aeroelastic Control Surface for Atmospheric Flight
|avionics =Helsin Electronics FCS-14z "FC-HUD" Software Package
|sensors =Hullsmeyer ODLR-22y "Lantern" Sensor Suite
|communications =Helsin Electronics "OmniComm" 22-5c Microwave/Optical Transceiver
|max_airspeed =24
|cruising_airspeed =1520
|acceleration_rate =215
|max_velocity =600
|operation_time = 18
|fixed_weapons =2 x [[GC-05 Medium Gauss Cannon - "Screamer"|GC-5 "Screamer" Gauss Cannons]]
|variable_payload =4 x [[ASIM-05 Medium Range Guided Missile - "Hound"|ASIM-5 "Hound" Missiles]]
|armor = Everest Composites Reinforced Boron-Nitride Airframe
|shields =Irridescent Labs P-5x "Phalanx" Shield System
|countermeasures =None
}}
```

---

### `City_Information`

- **Type**: Infobox Entity Card
- **Usage Count**: 31 articles
- **Template Source**: [`wiki/templates/City_Information.md`](file:///c:/Users/jdavi/Documents/GitHub/exodus-wars/wiki/templates/City_Information.md)
- **Sample Articles Using This**: `Stone_Bridge`, `Rio_de_Andes`, `Nueva_Ceará`, `Memphis`, `New_Hanover`

#### Parameter Schema

| Parameter | Data Type | Notes / Description |
| :--- | :--- | :--- |
| `name` | String | Primary name / title of the entity |
| `planet` | Text / Wikilink | Field value for planet |

#### Sample Invocation in Wikitext

```wikitext
{{City Information|
|name =Stone Bridge
|planet =Mesar
}}
```

---

### `Nation_Information`

- **Type**: Infobox Entity Card
- **Usage Count**: 31 articles
- **Template Source**: [`wiki/templates/Nation_Information.md`](file:///c:/Users/jdavi/Documents/GitHub/exodus-wars/wiki/templates/Nation_Information.md)
- **Sample Articles Using This**: `Federated_Districts_of_the_Prefecture`, `Auellal_League`, `United_Mesarthrim_Clans`, `United_Earth_Alliance`, `Meroniri_Terinasi`

#### Parameter Schema

| Parameter | Data Type | Notes / Description |
| :--- | :--- | :--- |
| `anthem` | Text / Wikilink | Field value for anthem |
| `area` | Text / Wikilink | Field value for area |
| `capital` | Text / Wikilink | Field value for capital |
| `caption` | String | Image description / caption |
| `currency` | Text / Wikilink | Field value for currency |
| `formation` | Text / Wikilink | Field value for formation |
| `gdp` | Text / Wikilink | Field value for gdp |
| `government` | Text / Wikilink | Field value for government |
| `head_of_state` | Text / Wikilink | Field value for head_of_state |
| `image` | Image Link / Filename | Embedded image wikilink e.g. `[[Image:filename.png|200px]]` or bare filename |
| `language` | Text / Wikilink | Field value for language |
| `motto` | Text / Wikilink | Field value for motto |
| `name` | String | Primary name / title of the entity |
| `national_symbol` | Wikilink | Faction or governing entity |
| `population` | Numeric / Measurement | Specification value with unit (meters, tons, etc.) |
| `status` | Text / Wikilink | Field value for status |

#### Sample Invocation in Wikitext

```wikitext
{{Nation Information|
|image =
|caption =
|name =Kabila Damu'kizuka
|motto =
|anthem =
|national_symbol =
|capital =
|language =[[English]]
|government =Kabila
|head_of_state =[[Kuu]] (tribal head)<br/>[[A'Pili Kuu]] (military)
|formation =
|status =Active
|area =
|population =
|gdp =
|currency =
}}
```

---

### `Star_Information`

- **Type**: Infobox Entity Card
- **Usage Count**: 31 articles
- **Template Source**: [`wiki/templates/Star_Information.md`](file:///c:/Users/jdavi/Documents/GitHub/exodus-wars/wiki/templates/Star_Information.md)
- **Sample Articles Using This**: `Sol_System`, `Alpha_Centauri_System`, `Proxima_Procyon_System`, `Lyrae_System`, `Epsilon_Indi_System`

#### Parameter Schema

| Parameter | Data Type | Notes / Description |
| :--- | :--- | :--- |
| `name` | String | Primary name / title of the entity |
| `planets` | Text / Wikilink | Field value for planets |
| `sector` | Text / Wikilink | Field value for sector |
| `stellar_class` | Text / Wikilink | Field value for stellar_class |

#### Sample Invocation in Wikitext

```wikitext
{{Star Information|
|name= Sol System
|sector = [[Sol Sector]]
|stellar_class = G2V Yellow
|planets = [[Mercury]]<br/>[[Venus]]<br/>[[Earth]]<br/>[[Mars]]<br/>[[Jupiter]]<br/>[[Saturn]]<br/>[[Uranus]]<br/>[[Neptune]]<br/>[[Pluto]]
}}
```

---

### `Starship_Information`

- **Type**: Infobox Entity Card
- **Usage Count**: 29 articles
- **Template Source**: [`wiki/templates/Starship_Information.md`](file:///c:/Users/jdavi/Documents/GitHub/exodus-wars/wiki/templates/Starship_Information.md)
- **Sample Articles Using This**: `FDS_Drake`, `FDS_Bastion`, `FDS_Delphinus`, `FDS_Triumph`, `FDS_Victory`

#### Parameter Schema

| Parameter | Data Type | Notes / Description |
| :--- | :--- | :--- |
| `caption` | String | Image description / caption |
| `commander` | Text / Wikilink | Field value for commander |
| `commissioned` | Text / Wikilink | Field value for commissioned |
| `crew` | Numeric / Measurement | Specification value with unit (meters, tons, etc.) |
| `image` | Image Link / Filename | Embedded image wikilink e.g. `[[Image:filename.png|200px]]` or bare filename |
| `laid_down` | Text / Wikilink | Field value for laid_down |
| `launched` | Text / Wikilink | Field value for launched |
| `name` | String | Primary name / title of the entity |
| `processing_system` | Text / Wikilink | Field value for processing_system |
| `ship_class` | Text / Wikilink | Field value for ship_class |
| `squadrons` | Text / Wikilink | Field value for squadrons |
| `status` | Text / Wikilink | Field value for status |
| `unique` | Text / Wikilink | Field value for unique |

#### Sample Invocation in Wikitext

```wikitext
{{Starship Information|
|name =FDS ''Drake'' (CG-3)
|image =[[Image:Avenger Class Battlecruiser Standard View.png|200px]]
|caption =Federated Districts' Ship ''Drake''
|ship_class =[[Avenger Class Battlecruiser]]
|laid_down =May 6, [[2322]]
|launched =November 2, [[2322]]
|commissioned =November 3, [[2322]]
|status =Active Duty
|commander 
|crew =Standard Complement
|processing_system =Standard
|squadrons = None
|unique ="Francis" [[AI]]
}}
```

---

### `Military_Branch_Information`

- **Type**: Infobox Entity Card
- **Usage Count**: 22 articles
- **Template Source**: [`wiki/templates/Military_Branch_Information.md`](file:///c:/Users/jdavi/Documents/GitHub/exodus-wars/wiki/templates/Military_Branch_Information.md)
- **Sample Articles Using This**: `Prefecture_Legion_Corps`, `Prefecture_Galactic_Navy`, `Federated_Districts_Air_Force`, `Prefecture_Marine_Corps`, `Aseta_Serada`

#### Parameter Schema

| Parameter | Data Type | Notes / Description |
| :--- | :--- | :--- |
| `active` | Text / Wikilink | Field value for active |
| `branch` | Text / Wikilink | Field value for branch |
| `caption` | String | Image description / caption |
| `chief_enlisted_staff` | Text / Wikilink | Field value for chief_enlisted_staff |
| `chief_of_operations` | Text / Wikilink | Field value for chief_of_operations |
| `chief_of_staff` | Text / Wikilink | Field value for chief_of_staff |
| `colors` | Text / Wikilink | Field value for colors |
| `engagements` | Text / Wikilink | Field value for engagements |
| `headquarters` | Text / Wikilink | Field value for headquarters |
| `image` | Image Link / Filename | Embedded image wikilink e.g. `[[Image:filename.png|200px]]` or bare filename |
| `march` | Text / Wikilink | Field value for march |
| `motto` | Text / Wikilink | Field value for motto |
| `name` | String | Primary name / title of the entity |
| `nation` | Wikilink | Faction or governing entity |
| `size` | Text / Wikilink | Field value for size |

#### Sample Invocation in Wikitext

```wikitext
{{Military Branch Information|
|image = [[Image:Badge of the Federated Districts Air Force.png|right|300px]]
|caption =Badge of the Federated Districts Air Force
|name =Federated Districts Air Force
|active =[[2322]]-Current
|nation = [[Federated Districts of the Prefecture]]
|branch = Air Superiority
|size = 5 Major Commands
|headquarters = [[Ueda]], [[Hydrae System]]
|motto = "Conquer the Skies, and Conquer All."
|colors = Black and Yellow
|march = How do They Rise Up
|engagements = [[Imperial Civil War]]<br/>[[Volucris Incursion]]<br/>[[Tempest War]]
|chief_of_operations = <small>Sky Marshal [[Marcus Rathbone]] ([[2322]])</small><br/><small>Sky Marshal [[Jack Ivonrud]] ([[2322]]-[[2323]])</small><small>Sky Marshal [[Jan Brooks]] ([[2323]]-Current)</small>
|chief_of_staff = <small>General [[Jack Ivonrud]] ([[2322]])</small><br/><small>General [[Jan Brooks]] ([[2322]]-[[2323]])</small>
|chief_enlisted_staff = <small>Chief Sergeant </small>
}}
```

---

### `Stellar_Navigation_Information`

- **Type**: Infobox Entity Card
- **Usage Count**: 13 articles
- **Template Source**: [`wiki/templates/Stellar_Navigation_Information.md`](file:///c:/Users/jdavi/Documents/GitHub/exodus-wars/wiki/templates/Stellar_Navigation_Information.md)
- **Sample Articles Using This**: `Sol_Sector`, `Sirius_Cluster`, `Njiorin_Sector`, `Carina_Spur`, `Teeth_of_Orion`

#### Parameter Schema

| Parameter | Data Type | Notes / Description |
| :--- | :--- | :--- |
| `name` | String | Primary name / title of the entity |
| `part_of` | Text / Wikilink | Field value for part_of |
| `type` | Text / Wikilink | Field value for type |

#### Sample Invocation in Wikitext

```wikitext
{{Stellar Navigation Information|
|name =Sol Sector
|type =[[:Category:Sectors|Sector]]
|part_of =the [[Orion Arm]]
}}
```

---

### `Military_Overview_Information`

- **Type**: Infobox Entity Card
- **Usage Count**: 7 articles
- **Template Source**: [`wiki/templates/Military_Overview_Information.md`](file:///c:/Users/jdavi/Documents/GitHub/exodus-wars/wiki/templates/Military_Overview_Information.md)
- **Sample Articles Using This**: `Military_of_the_Federated_Districts_of_the_Prefecture`, `Military_of_the_Meroniri_Terinasi`, `Military_of_Rikaz_o_Fii_Huern_iv_Lorithan`, `Military_of_the_Ikronin_Jurekön`, `Military_of_the_Auellal_League`

#### Parameter Schema

| Parameter | Data Type | Notes / Description |
| :--- | :--- | :--- |
| `branches` | Text / Wikilink | Field value for branches |
| `caption` | String | Image description / caption |
| `commander_in_chief` | Text / Wikilink | Field value for commander_in_chief |
| `image` | Image Link / Filename | Embedded image wikilink e.g. `[[Image:filename.png|200px]]` or bare filename |
| `military_age` | Text / Wikilink | Field value for military_age |
| `name` | String | Primary name / title of the entity |
| `ranks` | Text / Wikilink | Field value for ranks |

#### Sample Invocation in Wikitext

```wikitext
{{Military Overview Information|
|name =Military of the Federated Districts of the Prefecture
|image =
|caption =
|branches =[[Prefecture Legion Corps]]<br/>[[Prefecture Galactic Navy]]<br/>[[Prefecture Air Force| Prefecture Air Force]]<br/>[[Prefecture Marine Corps| Prefecture Marine Corps]]
|commander_in_chief =[[Prefect]]
|military_age =18-60
|ranks =[[Ranks in the Legion Corps|Army Ranks]]<br/>[[Ranks in the Galactic Navy|Navy Ranks]]<br/>[[Ranks in the Air Force|Air Force Ranks]]<br/>[[Ranks in the Marine Corps|Marine Ranks]]
}}
```

---

### `Vehicle_Information`

- **Type**: Infobox Entity Card
- **Usage Count**: 7 articles
- **Template Source**: [`wiki/templates/Vehicle_Information.md`](file:///c:/Users/jdavi/Documents/GitHub/exodus-wars/wiki/templates/Vehicle_Information.md)
- **Sample Articles Using This**: `Vulture_Siege_Tank`, `Zieldar_Light_Hovertank`, `T-88_Armored_Combat_Vehicle_-_"Archer"`, `Brehvok_Main_Battle_Tank`, `M-41_Main_Battle_Tank_Chassis_-_"Dragon"`

#### Parameter Schema

| Parameter | Data Type | Notes / Description |
| :--- | :--- | :--- |
| `armor` | Text / Wikilink | Field value for armor |
| `caption` | String | Image description / caption |
| `countermeasures` | Text / Wikilink | Field value for countermeasures |
| `crew` | Numeric / Measurement | Specification value with unit (meters, tons, etc.) |
| `fixed_weapons` | Text / Wikilink | Field value for fixed_weapons |
| `image` | Image Link / Filename | Embedded image wikilink e.g. `[[Image:filename.png|200px]]` or bare filename |
| `manufacturer` | Wikilink | Faction or governing entity |
| `max_speed` | Numeric / Measurement | Specification value with unit (meters, tons, etc.) |
| `mission_profile` | Text / Wikilink | Field value for mission_profile |
| `name` | String | Primary name / title of the entity |
| `operator` | Wikilink | Faction or governing entity |
| `powerplant` | Text / Wikilink | Field value for powerplant |
| `propulsion` | Text / Wikilink | Field value for propulsion |
| `shields` | Text / Wikilink | Field value for shields |

#### Sample Invocation in Wikitext

```wikitext
{{Vehicle Information|
|name=Vulture Siege Tank
|image=[[Image:VultureSiegeTank1.jpg|200px]]
|caption=The mighty Vulture
|mission_profile=
|crew=3 to 4, depending on mission
|manufacturer=
|operator=
|powerplant=1 x Cybeck SV-28a Reactor
|propulsion=
|max_speed=210KPH (on-road)<br/>175KPH (off-road)
|fixed_weapons=2 x Type-5a Railguns (5,000 rounds)<br/>6 x Type-B1 Blazers
|armor=Leifstein Composite Armor
|shields=Automated Adaptive Shielding
|countermeasures=
}}
```

---

### `Military_Operation_Information`

- **Type**: Infobox Entity Card
- **Usage Count**: 6 articles
- **Template Source**: [`wiki/templates/Military_Operation_Information.md`](file:///c:/Users/jdavi/Documents/GitHub/exodus-wars/wiki/templates/Military_Operation_Information.md)
- **Sample Articles Using This**: `Operation_Lawless`, `Operation_Tartarus`, `Operation_Durandal`, `First_Invasion_of_Sol`, `Operation_White-Eye`

#### Parameter Schema

| Parameter | Data Type | Notes / Description |
| :--- | :--- | :--- |
| `executor` | Text / Wikilink | Field value for executor |
| `name` | String | Primary name / title of the entity |
| `operation_theater` | Text / Wikilink | Field value for operation_theater |
| `planner` | Text / Wikilink | Field value for planner |
| `timeframe` | Text / Wikilink | Field value for timeframe |

#### Sample Invocation in Wikitext

```wikitext
{{Military Operation Information|
|name =Operation Lawless
|operation_theater = [[Sirius Cluster]]
|executor =[[Onyx Empire]]
|planner =[[Victor Pryce]]
|timeframe =[[2319]]
}}
```

---

### `Treaty_Information`

- **Type**: Infobox Entity Card
- **Usage Count**: 6 articles
- **Template Source**: [`wiki/templates/Treaty_Information.md`](file:///c:/Users/jdavi/Documents/GitHub/exodus-wars/wiki/templates/Treaty_Information.md)
- **Sample Articles Using This**: `Treaty_of_Memphis`, `Annexation_of_Bethija`, `Treaty_of_Volyn`, `Treaty_of_Tavou`, `Treaty_of_Cinaed`

#### Parameter Schema

| Parameter | Data Type | Notes / Description |
| :--- | :--- | :--- |
| `date` | Date / Year | In-universe or historical date |
| `place` | Text / Wikilink | Field value for place |
| `result` | Text / Wikilink | Field value for result |
| `signatory1` | Text / Wikilink | Field value for signatory1 |
| `signatory2` | Text / Wikilink | Field value for signatory2 |
| `treaty` | Text / Wikilink | Field value for treaty |

#### Sample Invocation in Wikitext

```wikitext
{{Treaty Information|
|treaty=Bethijan Articles of Annexation
|date=October 5, [[2315]]
|place=[[Volyn]], [[Bethija]], [[Proxima Procyon System]]
|result=Annexation of Bethija into the [[Onyx Empire]]
|signatory1=[[Onyx Empire]]
|signatory2=Premier of Bethija
}}
```

---

### `Alliance_Information`

- **Type**: Infobox Entity Card
- **Usage Count**: 5 articles
- **Template Source**: [`wiki/templates/Alliance_Information.md`](file:///c:/Users/jdavi/Documents/GitHub/exodus-wars/wiki/templates/Alliance_Information.md)
- **Sample Articles Using This**: `Alliance_of_Planets`, `Council_of_Independent_Nations`, `Tripartite_Alliance`, `Prometheus_Protocols`, `Cinaed_Accords`

#### Parameter Schema

| Parameter | Data Type | Notes / Description |
| :--- | :--- | :--- |
| `badge` | Text / Wikilink | Field value for badge |
| `building` | Text / Wikilink | Field value for building |
| `date` | Date / Year | In-universe or historical date |
| `event` | Text / Wikilink | Field value for event |
| `flag` | Text / Wikilink | Field value for flag |
| `headquarters` | Text / Wikilink | Field value for headquarters |
| `leader` | Text / Wikilink | Field value for leader |
| `members` | Text / Wikilink | Field value for members |
| `name` | String | Primary name / title of the entity |
| `number` | Text / Wikilink | Field value for number |
| `title` | Text / Wikilink | Field value for title |

#### Sample Invocation in Wikitext

```wikitext
{{Alliance Information|
|name=Prometheus Protocols
|flag=[[Image:PPFlag.png|200px]]
|badge=[[Image:PPBadge.png|200px]]
|building=[[Embassy Tower]]
|headquarters=[[Prometheus Stardock]]
|title=Overseer
|leader=Unknown
|event=[[Prometheus Summit]]
|date=[[2324]]
|number=Two
|members=[[Taviridis Somarchada]]<br/>[[United Mesarthrim Clans]]
}}
```

---

### `Infantry_Information`

- **Type**: Infobox Entity Card
- **Usage Count**: 5 articles
- **Template Source**: [`wiki/templates/Infantry_Information.md`](file:///c:/Users/jdavi/Documents/GitHub/exodus-wars/wiki/templates/Infantry_Information.md)
- **Sample Articles Using This**: `Prefecture_Legion_Corps_Infantry`, `Finnis`, `Prefecture_Legion_Corps_Army_Hunters`, `Reigenjord`, `Prefecture_Marine`

#### Parameter Schema

| Parameter | Data Type | Notes / Description |
| :--- | :--- | :--- |
| `image` | Image Link / Filename | Embedded image wikilink e.g. `[[Image:filename.png|200px]]` or bare filename |
| `military` | Text / Wikilink | Field value for military |
| `mission` | Text / Wikilink | Field value for mission |
| `name` | String | Primary name / title of the entity |

#### Sample Invocation in Wikitext

```wikitext
{{Infantry Information|
|name= Prefecture Legion Corps Infantry
|image=
|mission= Combat Infantry
|military= [[Prefecture Legion Corps]]
}}
```

---

### `Region_Information`

- **Type**: Infobox Entity Card
- **Usage Count**: 5 articles
- **Template Source**: [`wiki/templates/Region_Information.md`](file:///c:/Users/jdavi/Documents/GitHub/exodus-wars/wiki/templates/Region_Information.md)
- **Sample Articles Using This**: `Huon_Jehz`, `Vuranct_Jehz`, `Jehz_Modar`, `Dzarning_Mountain_Range`, `Nihru`

#### Parameter Schema

| Parameter | Data Type | Notes / Description |
| :--- | :--- | :--- |
| `capital` | Text / Wikilink | Field value for capital |
| `caption` | String | Image description / caption |
| `history` | Text / Wikilink | Field value for history |
| `image` | Image Link / Filename | Embedded image wikilink e.g. `[[Image:filename.png|200px]]` or bare filename |
| `location` | Text / Wikilink | Field value for location |
| `major_cities` | Text / Wikilink | Field value for major_cities |
| `name` | String | Primary name / title of the entity |
| `population` | Numeric / Measurement | Specification value with unit (meters, tons, etc.) |
| `sovereign` | Wikilink | Faction or governing entity |

#### Sample Invocation in Wikitext

```wikitext
{{Region Information|
|name =Huon Jehz
|image =
|caption =
|population =1.6 billion [[Lorithos]]<br/>10,000 [[Terrans]]<br/>6,000 [[Meroniri]]
|capital =[[Hamur Hauren]] - 2.5 million residents
|major_cities =[[Kihtor Modar]] - 1.2 billion residents<br/>[[Zysk]] - 100,000 residents<br/>[[Rehzak]] - 100,000 residents<br/>[[Oln Zaur]] - 100,000 residents<br/>[[Plovirsk]] - 100,000 residents<br/>[[Talire Hauren]] - Ruins
|location =[[Jehz Modar]], [[Lorithan]], [[Mirdek System]]
|sovereign =[[Rikaz o fii Huern iv Lorithan]]
|history =Cradle of [[Lorithos]] civilization
}}
```

---

### `Squadron_Information`

- **Type**: Infobox Entity Card
- **Usage Count**: 4 articles
- **Template Source**: [`wiki/templates/Squadron_Information.md`](file:///c:/Users/jdavi/Documents/GitHub/exodus-wars/wiki/templates/Squadron_Information.md)
- **Sample Articles Using This**: `VF-01_Imperial_Naval_Fighter_Squadron_-_"Scimitar_Squadron"`, `No.1416_Squadron_ADF_-_"Saint_Michael's_Sword"`, `VF-11_Imperial_Naval_Fighter_Squadron_-_"Hell's_Kittens"`, `Raven's_Wings`

#### Parameter Schema

| Parameter | Data Type | Notes / Description |
| :--- | :--- | :--- |
| `active` | Text / Wikilink | Field value for active |
| `aircraft_type` | Text / Wikilink | Field value for aircraft_type |
| `battles` | Text / Wikilink | Field value for battles |
| `caption` | String | Image description / caption |
| `garrison` | Text / Wikilink | Field value for garrison |
| `image` | Image Link / Filename | Embedded image wikilink e.g. `[[Image:filename.png|200px]]` or bare filename |
| `military_branch` | Text / Wikilink | Field value for military_branch |
| `name` | String | Primary name / title of the entity |
| `nation` | Wikilink | Faction or governing entity |
| `nickname` | String | Primary name / title of the entity |
| `role` | Text / Wikilink | Field value for role |

#### Sample Invocation in Wikitext

```wikitext
{{Squadron Information|
|image = [[Image:VF-01 Imperial Naval Fighter Squadron - "Scimitar Squadron" logo.png|150px|center]]
|caption = VF-1's Official Logo
|name = VF-1 "Scimitar Squadron"
|active = [[2315]]-[[2324]]
|nation = [[Onyx Empire]]
|military_branch = [[Royal Imperial Navy]]
|aircraft_type = [[F-09 Carrier Fighter - "Valkyrie"|F-9 Valkyrie]]<br/>[[F-12 Superiority Fighter - "Vampire"|F-12 Vampire]]
|role = Air/Space Superiority
|garrison = [[HMS Atlas|HMS ''Atlas'']]
|nickname = Scimitar Squadron
|battles = [[Second Exodus War]]
}}
```

---

### `Historical_Period_Information`

- **Type**: Infobox Entity Card
- **Usage Count**: 3 articles
- **Template Source**: [`wiki/templates/Historical_Period_Information.md`](file:///c:/Users/jdavi/Documents/GitHub/exodus-wars/wiki/templates/Historical_Period_Information.md)
- **Sample Articles Using This**: `First_Exodus`, `Magrinoch_Trials`, `Damanir_Incident`

#### Parameter Schema

| Parameter | Data Type | Notes / Description |
| :--- | :--- | :--- |
| `began` | Date / Year | In-universe or historical date |
| `ended` | Date / Year | In-universe or historical date |
| `period` | Text / Wikilink | Field value for period |

#### Sample Invocation in Wikitext

```wikitext
{{Historical Period Information|
|period=The First Exodus
|began=[[2080]]
|ended=[[2086]]
}}
```

---

### `Military_Force_Information`

- **Type**: Infobox Entity Card
- **Usage Count**: 2 articles
- **Template Source**: [`wiki/templates/Military_Force_Information.md`](file:///c:/Users/jdavi/Documents/GitHub/exodus-wars/wiki/templates/Military_Force_Information.md)
- **Sample Articles Using This**: `Iron_Armada_of_the_Royal_Imperial_Navy`, `Black_Armada_of_the_Royal_Imperial_Navy`

#### Parameter Schema

| Parameter | Data Type | Notes / Description |
| :--- | :--- | :--- |
| `branch` | Text / Wikilink | Field value for branch |
| `caption` | String | Image description / caption |
| `commander` | Text / Wikilink | Field value for commander |
| `headquarters` | Text / Wikilink | Field value for headquarters |
| `image` | Image Link / Filename | Embedded image wikilink e.g. `[[Image:filename.png|200px]]` or bare filename |
| `name` | String | Primary name / title of the entity |
| `nation` | Wikilink | Faction or governing entity |
| `size` | Text / Wikilink | Field value for size |

#### Sample Invocation in Wikitext

```wikitext
{{Military Force Information|
|image = 
|caption =
|name =Iron Armada
|active =[[2301]]-[[2324]]
|nation = [[Onyx Empire]]
|branch = [[Royal Imperial Navy]]
|size = 2 Fleets
|headquarters = [[Earth]], [[Sol System]]
|commander = <small>Grand Admiral [[Anthony Hadrian]] ([[2300]]-[[2322]])<br/>Grand Admiral [[Michael Burke]] ([[2322]]-[[2324]])</small>
}}
```

---

### `War_Information`

- **Type**: Infobox Entity Card
- **Usage Count**: 2 articles
- **Template Source**: [`wiki/templates/War_Information.md`](file:///c:/Users/jdavi/Documents/GitHub/exodus-wars/wiki/templates/War_Information.md)
- **Sample Articles Using This**: `Second_Exodus_War`, `First_Exodus_War`

#### Parameter Schema

| Parameter | Data Type | Notes / Description |
| :--- | :--- | :--- |
| `combatant1` | Text / Wikilink | Field value for combatant1 |
| `combatant2` | Text / Wikilink | Field value for combatant2 |
| `conflict` | Text / Wikilink | Field value for conflict |
| `date` | Date / Year | In-universe or historical date |
| `place` | Text / Wikilink | Field value for place |
| `result` | Text / Wikilink | Field value for result |

#### Sample Invocation in Wikitext

```wikitext
{{War Information|
|conflict=The First Exodus War
|date=[[2063]], [[2078]] - [[2080]]
|place=The [[Sol Sector]]
|result=[[United Earth Alliance]] siezes control of the [[Sol Sector]].<br/>Seperatist factions dissolved.<br/>[[Torimur]] bombed.<br/>[[Treaty of Volyn]] signed.
|combatant1=[[Bethija]]<br/>[[Torimur]]<br/>[[Sirius Cluster]]
|combatant2=[[Image:UnitedEarthAllianceFlag.png|20px]] [[United Earth Alliance]]
}}
```

---

### `Weapon_Information`

- **Type**: Infobox Entity Card
- **Usage Count**: 2 articles
- **Template Source**: [`wiki/templates/Weapon_Information.md`](file:///c:/Users/jdavi/Documents/GitHub/exodus-wars/wiki/templates/Weapon_Information.md)
- **Sample Articles Using This**: `M-33_Heavy_Anti-Armor_Weapon`, `ASIM-05_Medium_Range_Guided_Missile_-_"Hound"`

#### Parameter Schema

| Parameter | Data Type | Notes / Description |
| :--- | :--- | :--- |
| `name` | String | Primary name / title of the entity |
| `operator` | Wikilink | Faction or governing entity |
| `origin` | Text / Wikilink | Field value for origin |
| `range` | Text / Wikilink | Field value for range |
| `type` | Text / Wikilink | Field value for type |

#### Sample Invocation in Wikitext

```wikitext
{{Weapon Information|
|name =M-33 Heavy Anti-Armor Weapon
|type =Direct-Fire Kinetic-Driven Anti-Armor Explosive
|origin =[[Onyx Empire]]
|range =25 kilometers
|operator =[[Onyx Empire]]<br/>[[Federated Districts of the Prefecture]]
}}
```

---

### `Intelligence_Branch_Information`

- **Type**: Infobox Entity Card
- **Usage Count**: 1 articles
- **Template Source**: [`wiki/templates/Intelligence_Branch_Information.md`](file:///c:/Users/jdavi/Documents/GitHub/exodus-wars/wiki/templates/Intelligence_Branch_Information.md)
- **Sample Articles Using This**: `Omegas`

#### Parameter Schema

| Parameter | Data Type | Notes / Description |
| :--- | :--- | :--- |
| `command1` | Text / Wikilink | Field value for command1 |
| `command2` | Text / Wikilink | Field value for command2 |
| `designation` | Wikilink | Faction or governing entity |
| `headquarters` | Text / Wikilink | Field value for headquarters |
| `name` | String | Primary name / title of the entity |
| `nation` | Wikilink | Faction or governing entity |
| `size` | Text / Wikilink | Field value for size |

#### Sample Invocation in Wikitext

```wikitext
{{Intelligence Branch Information|
|name =хоньч нохой, AKA "Omegas"
|nation = [[Onyx Empire]]
|designation = Secret Police
|size = Approximately 23,000 operatives
|headquarters = [[Earth]], [[Sol System]]
|command1 = <small>Chief Operative [[Lavik Nighthawk]]</small>
|command2 = <small>Operations Coordinator [[Jarek Nighthawk]]</small>
}}
```

---

### `Space_Station_Information`

- **Type**: Infobox Entity Card
- **Usage Count**: 1 articles
- **Template Source**: [`wiki/templates/Space_Station_Information.md`](file:///c:/Users/jdavi/Documents/GitHub/exodus-wars/wiki/templates/Space_Station_Information.md)
- **Sample Articles Using This**: `Haven_Class_Station`

#### Parameter Schema

| Parameter | Data Type | Notes / Description |
| :--- | :--- | :--- |
| `aircraft` | Text / Wikilink | Field value for aircraft |
| `armor` | Text / Wikilink | Field value for armor |
| `beam` | Numeric / Measurement | Specification value with unit (meters, tons, etc.) |
| `builder` | Wikilink | Faction or governing entity |
| `caption` | String | Image description / caption |
| `crew` | Numeric / Measurement | Specification value with unit (meters, tons, etc.) |
| `designation` | Wikilink | Faction or governing entity |
| `height` | Numeric / Measurement | Specification value with unit (meters, tons, etc.) |
| `image` | Image Link / Filename | Embedded image wikilink e.g. `[[Image:filename.png|200px]]` or bare filename |
| `length` | Numeric / Measurement | Specification value with unit (meters, tons, etc.) |
| `name` | String | Primary name / title of the entity |
| `operator` | Wikilink | Faction or governing entity |
| `powerplant` | Text / Wikilink | Field value for powerplant |
| `processing_system` | Text / Wikilink | Field value for processing_system |
| `sensors` | Text / Wikilink | Field value for sensors |
| `shields` | Text / Wikilink | Field value for shields |
| `special` | Text / Wikilink | Field value for special |
| `support_capacity` | Text / Wikilink | Field value for support_capacity |
| `total_volume` | Numeric / Measurement | Specification value with unit (meters, tons, etc.) |
| `weapons` | Text / Wikilink | Field value for weapons |

#### Sample Invocation in Wikitext

```wikitext
{{Space Station Information|
|name =Haven Class Station
|image = 
|caption =
|designation =Starship Drydock/Harborage
|builder =[[Haven Shipyards]]
|operator =[[Royal Imperial Navy]]<br/>[[Prefecture Galactic Navy]]
|crew =2,500
|length =500
|beam =600
|height =400
|total_volume =
|powerplant =1 x Tolwin T1S 1.7gW Fission Reactor
|sensors =
|processing_system =
|aircraft =
|support_capacity =
|weapons =Unarmed
|armor =Series-1 Composite Armor Plating
|shields =PDS-1 Plasma Field
|special =
}}
```

---

## Navigation Boxes Catalog (9 Templates)

### `Second_Exodus_War_Navbox`

- **Type**: Navigation Box
- **Usage Count**: 45 articles
- **Template Source**: [`wiki/templates/Second_Exodus_War_Navbox.md`](file:///c:/Users/jdavi/Documents/GitHub/exodus-wars/wiki/templates/Second_Exodus_War_Navbox.md)
- **Customizable Parameters**: *None (Standard static link table)*
- **Sample Articles Using This**: `Second_Exodus_War`, `Storming_of_San_Francisco`, `Third_Battle_of_Cronus`, `Treaty_of_Memphis`, `Titan_Peace_Accords`

#### Sample Invocation in Wikitext

```wikitext
{{Second Exodus War Navbox}}
```

---

### `Tempest_War_Navbox`

- **Type**: Navigation Box
- **Usage Count**: 15 articles
- **Template Source**: [`wiki/templates/Tempest_War_Navbox.md`](file:///c:/Users/jdavi/Documents/GitHub/exodus-wars/wiki/templates/Tempest_War_Navbox.md)
- **Customizable Parameters**: *None (Standard static link table)*
- **Sample Articles Using This**: `Tempest_War`, `Second_Tirshan_Uprising`, `Treaty_of_Tavou`, `Magrinoch_Trials`, `Cinaed_Accords`

#### Sample Invocation in Wikitext

```wikitext
{{Tempest War Navbox}}
```

---

### `UCS_Fleet`

- **Type**: Navigation Box
- **Usage Count**: 7 articles
- **Template Source**: [`wiki/templates/UCS_Fleet.md`](file:///c:/Users/jdavi/Documents/GitHub/exodus-wars/wiki/templates/UCS_Fleet.md)
- **Customizable Parameters**: `Caption`, `Citation`, `Commandant`, `Cross`, `Designation`, `First`, `Fleets`, `Head`, `Image`, `Medal`, `Motto`, `Name`, `Tempest`
- **Sample Articles Using This**: `United_Centusi_States_First_Fleet`, `United_Centusi_States_Second_Fleet`, `United_Centusi_States_Third_Fleet`, `United_Centusi_States_Fourth_Fleet`, `United_Centusi_States_Support_Fleet`

#### Sample Invocation in Wikitext

```wikitext
{{UCS Fleet|
|Name = Erste Flotte
|Image = [[Image:UCS-First-Fleet.png]]
|Caption = Badge of the First Centusi Fleet
|Designation = Highguard Fleet
|Motto = Our Time, Our War.
|Head = [[Anthony Koch]]
|First = forthcoming
|Commandant = forthcoming
|Tempest = forthcoming
|Cross = forthcoming
|Citation = forthcoming
|Medal = forthcoming
|Fleets = '''First Fleet''' - [[United Centusi States Second Fleet|Second Fleet]] - [[United Centusi States Third Fleet|Third Fleet]] - [[United Centusi States Fourth Fleet|Fourth Fleet]]<br/>
[[United Centusi States Support Fleet|Support Fleet]] - [[United Centusi States Warfleet|Warfleet]]
}}
```

---

### `Volucris_Incursion_Navbox`

- **Type**: Navigation Box
- **Usage Count**: 6 articles
- **Template Source**: [`wiki/templates/Volucris_Incursion_Navbox.md`](file:///c:/Users/jdavi/Documents/GitHub/exodus-wars/wiki/templates/Volucris_Incursion_Navbox.md)
- **Customizable Parameters**: *None (Standard static link table)*
- **Sample Articles Using This**: `Volucris_Incursion`, `Volucris_First_Contact`, `Volucris_Raid_on_Mirach`, `Volucris_Raid_on_Ueda`, `Volucris_Invasion_of_Tavou`

---

### `Mesarthrim_Fleet`

- **Type**: Navigation Box
- **Usage Count**: 3 articles
- **Template Source**: [`wiki/templates/Mesarthrim_Fleet.md`](file:///c:/Users/jdavi/Documents/GitHub/exodus-wars/wiki/templates/Mesarthrim_Fleet.md)
- **Customizable Parameters**: `Anderung`, `Caption`, `Citation`, `Commandant`, `Cross`, `Designation`, `Exodus`, `First`, `Fleets`, `Head`, `Image`, `Medal`, `Mesarthrim`, `Name`, `Onyx`
- **Sample Articles Using This**: `United_Mesarthrim_Clans_First_Fleet`, `United_Mesarthrim_Clans_Second_Fleet`, `United_Mesarthrim_Clans_Third_Fleet`

#### Sample Invocation in Wikitext

```wikitext
{{Mesarthrim Fleet|
|Name = Erste Flotte
|Image = [[Image:UMC-First-Fleet.png]]
|Caption = Badge of the First Mesarthrim Fleet
|Designation = Guardian of Terra ''(final)''
|Head = [[Wilfred Stafgard von Stadt]] ''(final)''
|First = [[Uther Gilhund von Dietrich]] ''(final)''
|Commandant = [[Ernest Filmunt von Dietrich]] ''(final)''
|Anderung = [[Battle of Ice Crown Bay]]<br>[[Battle for the North Star]]<br>[[War of the Overseers]]<br>[[Morningstar Strike]]<br>[[First Battle for Lusar]]<br>[[Defense of Centus]]<br>[[Centus Massacre]]<br>[[Battle of Overseer Command]]<br>[[Second Battle for Lusar]]<br>[[Battle for Comur]]<br>[[Battle for Mesar]]<br>[[Anderung Assault]]<br>[[Anderung Hunt]]
|Exodus = [[Third Battle of Cronus]]<br>[[Operation Arrow Fold]]<br>[[Cronus Star Command]]
|Onyx = [[Invasion of Terra]]<br>[[Assault on Mars]]<br>[[Battle for Pluto]]<br>[[Battle for Io]]<br>[[Terra Occupational Force]]
|Mesarthrim = [[Raumstraff Island Massacre]]
|Tempest = ''disbanded''
|Cross = 62 Battle Crosses
|Citation = Tischler Citation of Honour<br>Tischler Citation of Valour<br>Stadt Citation of Valour<br>Stadt Citation of Honour<br>Stadt Citation of Integrity<br>Brandt Citation of Valour<br>Brandt Citation of Honour<br>Brandt Citation of Integrity
|Medal = Anderung Victory<br>Second Exodus War Victory<br>Silver Campaign Medal<br>Vigilant Guardian Medal
|Fleets = '''First Fleet''' - [[United Mesarthrim Clans Second Fleet|Second Fleet]] - [[United Mesarthrim Clans Third Fleet|Third Fleet]]
}}
```

---

### `Onyx_Empire`

- **Type**: Navigation Box
- **Usage Count**: 1 articles
- **Template Source**: [`wiki/templates/Onyx_Empire.md`](file:///c:/Users/jdavi/Documents/GitHub/exodus-wars/wiki/templates/Onyx_Empire.md)
- **Customizable Parameters**: *None (Standard static link table)*
- **Sample Articles Using This**: `First_Invasion_of_Theta_Algedi`

#### Sample Invocation in Wikitext

```wikitext
{{Onyx Empire}}
```

---

### `Pelagrim_Crisis_Navbox`

- **Type**: Navigation Box
- **Usage Count**: 1 articles
- **Template Source**: [`wiki/templates/Pelagrim_Crisis_Navbox.md`](file:///c:/Users/jdavi/Documents/GitHub/exodus-wars/wiki/templates/Pelagrim_Crisis_Navbox.md)
- **Customizable Parameters**: *None (Standard static link table)*
- **Sample Articles Using This**: `The_Pelagrim_Crisis`

---

### `United_Earth_Alliance`

- **Type**: Navigation Box
- **Usage Count**: 1 articles
- **Template Source**: [`wiki/templates/United_Earth_Alliance.md`](file:///c:/Users/jdavi/Documents/GitHub/exodus-wars/wiki/templates/United_Earth_Alliance.md)
- **Customizable Parameters**: *None (Standard static link table)*
- **Sample Articles Using This**: `First_Invasion_of_Theta_Algedi`

#### Sample Invocation in Wikitext

```wikitext
{{United Earth Alliance}}
```

---

### `Volucris_War_Navbox`

- **Type**: Navigation Box
- **Usage Count**: 1 articles
- **Template Source**: [`wiki/templates/Volucris_War_Navbox.md`](file:///c:/Users/jdavi/Documents/GitHub/exodus-wars/wiki/templates/Volucris_War_Navbox.md)
- **Customizable Parameters**: *None (Standard static link table)*
- **Sample Articles Using This**: `Volucris_War`

---

## Utility & Documentation Templates (5 Templates)

### `Aircraft_Variant`

- **Type**: Utility / System Template
- **Usage Count**: 3 pages
- **Template Source**: [`wiki/templates/Aircraft_Variant.md`](file:///c:/Users/jdavi/Documents/GitHub/exodus-wars/wiki/templates/Aircraft_Variant.md)
- **Parameters**: `acceleration_rate`, `fixed_weapons`, `max_airspeed`, `name`, `powerplant`, `propulsion`

#### Sample Invocation in Wikitext

```wikitext
{{Aircraft Variant|
|name = YF-9
|powerplant = 1 x Tolwin AC-7 15.2mW Fission Reactor
|propulsion =1 x Alexi-Wrought RJ-13r Ramjet<br/>1 x Alexi-Wrought MPD-2x MP Drive
|max_airspeed =4.5
|acceleration_rate =28.9
|fixed_weapons =1 x [[BC-01 Light Beam Cannon - "Toaster"|BC-1 "Toaster" Laser Cannon]] <br/>1 x [[GC-02 Medium Gauss Cannon - "Shrieker"|GC-2 "Shrieker" Gauss Cannon]] <br/>4 x [[ASIM-01 Short Range Guided Missile - "Javelin"|ASIM-1 "Javelin" Missiles]]
}}
```

---

### `Pp-template`

- **Type**: Utility / System Template
- **Usage Count**: 3 pages
- **Template Source**: [`wiki/templates/Pp-template.md`](file:///c:/Users/jdavi/Documents/GitHub/exodus-wars/wiki/templates/Pp-template.md)
- **Parameters**: `expiry`, `small`

#### Sample Invocation in Wikitext

```wikitext
{{pp-template|small=yes}}
```

---

### `Template_doc_inline`

- **Type**: Utility / System Template
- **Usage Count**: 2 pages
- **Template Source**: [`wiki/templates/Template_doc_inline.md`](file:///c:/Users/jdavi/Documents/GitHub/exodus-wars/wiki/templates/Template_doc_inline.md)
- **Parameters**: `1`, `2`

---

### `Template_doc`

- **Type**: Utility / System Template
- **Usage Count**: 1 pages
- **Template Source**: [`wiki/templates/Template_doc.md`](file:///c:/Users/jdavi/Documents/GitHub/exodus-wars/wiki/templates/Template_doc.md)
- **Parameters**: `1`

#### Sample Invocation in Wikitext

```wikitext
{{template doc}}
```

---

## Static Site Migration Recommendations for Templates


When migrating this wiki to a modern static site generator (Astro, Starlight, Hugo, VitePress, or Quartz), templates should NOT be maintained as raw MediaWiki table markup. Instead, consider these modern component patterns:

### 1. Infobox as Structured Frontmatter + Component
Rather than parsing raw `{| ... |}` wikitext tables, extract the infobox key-value pairs directly into the page's YAML frontmatter:
```yaml
---
title: "Anthony Hadrian"
infobox:
  type: "Person_Information"
  name: "Antonius 'Anthony' Aurelius Hadrian"
  birth_date: "November 7, 2060"
  birth_place: "Ailqot, Torimur, Cildeng System"
  allegiance: "Federated Districts of the Prefecture"
  profession: "Officer, Politician"
---
```
Then render a reusable UI component (e.g. `<Infobox data={frontmatter.infobox} />` in Astro or a Hugo shortcode `{{< infobox >}}`). This provides:
- Clean separation of content from presentation
- Mobile-responsive styling (e.g. collapses to top or expands in a sidebar)
- Type safety and schema validation (e.g. Zod in Astro/Content Collections)

### 2. Navboxes as Dynamic Sidebars or Footer Collections
In MediaWiki, navigation boxes are manually transcluded at the bottom of each article (`{{Second_Exodus_War_Navbox}}`). In modern static sites:
- Navboxes can be declared as **Astro/Starlight sidebar groups** or **footer menus** defined in a central configuration (`config.ts` or `_sidebar.json`).
- Alternatively, render them as a `<Navbox name="Second_Exodus_War" />` component reading from a shared JSON data file (`wiki/manifests/templates_summary.json`).

### 3. Re-using `css/ew.css`
The existing repository includes `css/ew.css` which already defines custom fonts (such as `Iceland`), palette tokens, and responsive layout wrappers. You can map the MediaWiki infobox class `.infobox` or `.ew-infobox` directly to the styling rules in `ew.css`.
