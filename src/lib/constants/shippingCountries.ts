// import { Country, State } from "country-state-city";

// const places = ["AT", "AU", "GB", "NL", "US", "SE", "ZA", "SA", "CA", "IE"].map((code) => {
// 	const country = Country.getCountryByCode(code);
// 	console.log("places ~ country:", country);
// 	State.getStatesOfCountry(country.isoCode);
// 	return {
// 		name: country.name,
// 		isoCode: country.isoCode,
// 		states: State.getStatesOfCountry(country.isoCode).map((state) => {
// 			return {
// 				name: state.name,
// 				isoCode: state.isoCode
// 			};
// 		})
// 	};
// });

// places.sort((a, b) => (a.name > b.name ? 1 : -1));
// console.log("places ~ places:", places);

export const shippingCountries = [
	{
		name: "Australia",
		isoCode: "AU",
		states: [
			{
				name: "Australian Capital Territory",
				isoCode: "ACT"
			},
			{
				name: "New South Wales",
				isoCode: "NSW"
			},
			{
				name: "Northern Territory",
				isoCode: "NT"
			},
			{
				name: "Queensland",
				isoCode: "QLD"
			},
			{
				name: "South Australia",
				isoCode: "SA"
			},
			{
				name: "Tasmania",
				isoCode: "TAS"
			},
			{
				name: "Victoria",
				isoCode: "VIC"
			},
			{
				name: "Western Australia",
				isoCode: "WA"
			}
		]
	},
	{
		name: "Austria",
		isoCode: "AT",
		states: [
			{
				name: "Burgenland",
				isoCode: "1"
			},
			{
				name: "Carinthia",
				isoCode: "2"
			},
			{
				name: "Lower Austria",
				isoCode: "3"
			},
			{
				name: "Salzburg",
				isoCode: "5"
			},
			{
				name: "Styria",
				isoCode: "6"
			},
			{
				name: "Tyrol",
				isoCode: "7"
			},
			{
				name: "Upper Austria",
				isoCode: "4"
			},
			{
				name: "Vienna",
				isoCode: "9"
			},
			{
				name: "Vorarlberg",
				isoCode: "8"
			}
		]
	},
	{
		name: "Canada",
		isoCode: "CA",
		states: [
			{
				name: "Alberta",
				isoCode: "AB"
			},
			{
				name: "British Columbia",
				isoCode: "BC"
			},
			{
				name: "Manitoba",
				isoCode: "MB"
			},
			{
				name: "New Brunswick",
				isoCode: "NB"
			},
			{
				name: "Newfoundland and Labrador",
				isoCode: "NL"
			},
			{
				name: "Northwest Territories",
				isoCode: "NT"
			},
			{
				name: "Nova Scotia",
				isoCode: "NS"
			},
			{
				name: "Nunavut",
				isoCode: "NU"
			},
			{
				name: "Ontario",
				isoCode: "ON"
			},
			{
				name: "Prince Edward Island",
				isoCode: "PE"
			},
			{
				name: "Quebec",
				isoCode: "QC"
			},
			{
				name: "Saskatchewan",
				isoCode: "SK"
			},
			{
				name: "Yukon",
				isoCode: "YT"
			}
		]
	},
	{
		name: "Ireland",
		isoCode: "IE",
		states: [
			{
				name: "Carlow",
				isoCode: "CW"
			},
			{
				name: "Cavan",
				isoCode: "CN"
			},
			{
				name: "Clare",
				isoCode: "CE"
			},
			{
				name: "Connacht",
				isoCode: "C"
			},
			{
				name: "Cork",
				isoCode: "CO"
			},
			{
				name: "Donegal",
				isoCode: "DL"
			},
			{
				name: "Dublin",
				isoCode: "D"
			},
			{
				name: "Galway",
				isoCode: "G"
			},
			{
				name: "Kerry",
				isoCode: "KY"
			},
			{
				name: "Kildare",
				isoCode: "KE"
			},
			{
				name: "Kilkenny",
				isoCode: "KK"
			},
			{
				name: "Laois",
				isoCode: "LS"
			},
			{
				name: "Leinster",
				isoCode: "L"
			},
			{
				name: "Limerick",
				isoCode: "LK"
			},
			{
				name: "Longford",
				isoCode: "LD"
			},
			{
				name: "Louth",
				isoCode: "LH"
			},
			{
				name: "Mayo",
				isoCode: "MO"
			},
			{
				name: "Meath",
				isoCode: "MH"
			},
			{
				name: "Monaghan",
				isoCode: "MN"
			},
			{
				name: "Munster",
				isoCode: "M"
			},
			{
				name: "Offaly",
				isoCode: "OY"
			},
			{
				name: "Roscommon",
				isoCode: "RN"
			},
			{
				name: "Sligo",
				isoCode: "SO"
			},
			{
				name: "Tipperary",
				isoCode: "TA"
			},
			{
				name: "Ulster",
				isoCode: "U"
			},
			{
				name: "Waterford",
				isoCode: "WD"
			},
			{
				name: "Westmeath",
				isoCode: "WH"
			},
			{
				name: "Wexford",
				isoCode: "WX"
			},
			{
				name: "Wicklow",
				isoCode: "WW"
			}
		]
	},
	{
		name: "Netherlands",
		isoCode: "NL",
		states: [
			{
				name: "Bonaire",
				isoCode: "BQ1"
			},
			{
				name: "Drenthe",
				isoCode: "DR"
			},
			{
				name: "Flevoland",
				isoCode: "FL"
			},
			{
				name: "Friesland",
				isoCode: "FR"
			},
			{
				name: "Gelderland",
				isoCode: "GE"
			},
			{
				name: "Groningen",
				isoCode: "GR"
			},
			{
				name: "Limburg",
				isoCode: "LI"
			},
			{
				name: "North Brabant",
				isoCode: "NB"
			},
			{
				name: "North Holland",
				isoCode: "NH"
			},
			{
				name: "Overijssel",
				isoCode: "OV"
			},
			{
				name: "Saba",
				isoCode: "BQ2"
			},
			{
				name: "Sint Eustatius",
				isoCode: "BQ3"
			},
			{
				name: "South Holland",
				isoCode: "ZH"
			},
			{
				name: "Utrecht",
				isoCode: "UT"
			},
			{
				name: "Zeeland",
				isoCode: "ZE"
			}
		]
	},
	{
		name: "Saudi Arabia",
		isoCode: "SA",
		states: [
			{
				name: "'Asir",
				isoCode: "14"
			},
			{
				name: "Al Bahah",
				isoCode: "11"
			},
			{
				name: "Al Jawf",
				isoCode: "12"
			},
			{
				name: "Al Madinah",
				isoCode: "03"
			},
			{
				name: "Al-Qassim",
				isoCode: "05"
			},
			{
				name: "Eastern Province",
				isoCode: "04"
			},
			{
				name: "Ha'il",
				isoCode: "06"
			},
			{
				name: "Jizan",
				isoCode: "09"
			},
			{
				name: "Makkah",
				isoCode: "02"
			},
			{
				name: "Najran",
				isoCode: "10"
			},
			{
				name: "Northern Borders",
				isoCode: "08"
			},
			{
				name: "Riyadh",
				isoCode: "01"
			},
			{
				name: "Tabuk",
				isoCode: "07"
			}
		]
	},
	{
		name: "South Africa",
		isoCode: "ZA",
		states: [
			{
				name: "Eastern Cape",
				isoCode: "EC"
			},
			{
				name: "Free State",
				isoCode: "FS"
			},
			{
				name: "Gauteng",
				isoCode: "GP"
			},
			{
				name: "KwaZulu-Natal",
				isoCode: "KZN"
			},
			{
				name: "Limpopo",
				isoCode: "LP"
			},
			{
				name: "Mpumalanga",
				isoCode: "MP"
			},
			{
				name: "North West",
				isoCode: "NW"
			},
			{
				name: "Northern Cape",
				isoCode: "NC"
			},
			{
				name: "Western Cape",
				isoCode: "WC"
			}
		]
	},
	{
		name: "Sweden",
		isoCode: "SE",
		states: [
			{
				name: "Blekinge",
				isoCode: "K"
			},
			{
				name: "Dalarna County",
				isoCode: "W"
			},
			{
				name: "Gotland County",
				isoCode: "I"
			},
			{
				name: "Gävleborg County",
				isoCode: "X"
			},
			{
				name: "Halland County",
				isoCode: "N"
			},
			{
				name: "Jönköping County",
				isoCode: "F"
			},
			{
				name: "Kalmar County",
				isoCode: "H"
			},
			{
				name: "Kronoberg County",
				isoCode: "G"
			},
			{
				name: "Norrbotten County",
				isoCode: "BD"
			},
			{
				name: "Skåne County",
				isoCode: "M"
			},
			{
				name: "Stockholm County",
				isoCode: "AB"
			},
			{
				name: "Södermanland County",
				isoCode: "D"
			},
			{
				name: "Uppsala County",
				isoCode: "C"
			},
			{
				name: "Värmland County",
				isoCode: "S"
			},
			{
				name: "Västerbotten County",
				isoCode: "AC"
			},
			{
				name: "Västernorrland County",
				isoCode: "Y"
			},
			{
				name: "Västmanland County",
				isoCode: "U"
			},
			{
				name: "Västra Götaland County",
				isoCode: "O"
			},
			{
				name: "Örebro County",
				isoCode: "T"
			},
			{
				name: "Östergötland County",
				isoCode: "E"
			}
		]
	},
	{
		name: "United Kingdom",
		isoCode: "GB",
		states: [
			{
				name: "Aberdeen",
				isoCode: "ABE"
			},
			{
				name: "Aberdeenshire",
				isoCode: "ABD"
			},
			{
				name: "Angus",
				isoCode: "ANS"
			},
			{
				name: "Antrim",
				isoCode: "ANT"
			},
			{
				name: "Antrim and Newtownabbey",
				isoCode: "ANN"
			},
			{
				name: "Ards",
				isoCode: "ARD"
			},
			{
				name: "Ards and North Down",
				isoCode: "AND"
			},
			{
				name: "Argyll and Bute",
				isoCode: "AGB"
			},
			{
				name: "Armagh City and District Council",
				isoCode: "ARM"
			},
			{
				name: "Armagh, Banbridge and Craigavon",
				isoCode: "ABC"
			},
			{
				name: "Ascension Island",
				isoCode: "SH-AC"
			},
			{
				name: "Ballymena Borough",
				isoCode: "BLA"
			},
			{
				name: "Ballymoney",
				isoCode: "BLY"
			},
			{
				name: "Banbridge",
				isoCode: "BNB"
			},
			{
				name: "Barnsley",
				isoCode: "BNS"
			},
			{
				name: "Bath and North East Somerset",
				isoCode: "BAS"
			},
			{
				name: "Bedford",
				isoCode: "BDF"
			},
			{
				name: "Belfast district",
				isoCode: "BFS"
			},
			{
				name: "Birmingham",
				isoCode: "BIR"
			},
			{
				name: "Blackburn with Darwen",
				isoCode: "BBD"
			},
			{
				name: "Blackpool",
				isoCode: "BPL"
			},
			{
				name: "Blaenau Gwent County Borough",
				isoCode: "BGW"
			},
			{
				name: "Bolton",
				isoCode: "BOL"
			},
			{
				name: "Bournemouth",
				isoCode: "BMH"
			},
			{
				name: "Bracknell Forest",
				isoCode: "BRC"
			},
			{
				name: "Bradford",
				isoCode: "BRD"
			},
			{
				name: "Bridgend County Borough",
				isoCode: "BGE"
			},
			{
				name: "Brighton and Hove",
				isoCode: "BNH"
			},
			{
				name: "Buckinghamshire",
				isoCode: "BKM"
			},
			{
				name: "Bury",
				isoCode: "BUR"
			},
			{
				name: "Caerphilly County Borough",
				isoCode: "CAY"
			},
			{
				name: "Calderdale",
				isoCode: "CLD"
			},
			{
				name: "Cambridgeshire",
				isoCode: "CAM"
			},
			{
				name: "Carmarthenshire",
				isoCode: "CMN"
			},
			{
				name: "Carrickfergus Borough Council",
				isoCode: "CKF"
			},
			{
				name: "Castlereagh",
				isoCode: "CSR"
			},
			{
				name: "Causeway Coast and Glens",
				isoCode: "CCG"
			},
			{
				name: "Central Bedfordshire",
				isoCode: "CBF"
			},
			{
				name: "Ceredigion",
				isoCode: "CGN"
			},
			{
				name: "Cheshire East",
				isoCode: "CHE"
			},
			{
				name: "Cheshire West and Chester",
				isoCode: "CHW"
			},
			{
				name: "City and County of Cardiff",
				isoCode: "CRF"
			},
			{
				name: "City and County of Swansea",
				isoCode: "SWA"
			},
			{
				name: "City of Bristol",
				isoCode: "BST"
			},
			{
				name: "City of Derby",
				isoCode: "DER"
			},
			{
				name: "City of Kingston upon Hull",
				isoCode: "KHL"
			},
			{
				name: "City of Leicester",
				isoCode: "LCE"
			},
			{
				name: "City of London",
				isoCode: "LND"
			},
			{
				name: "City of Nottingham",
				isoCode: "NGM"
			},
			{
				name: "City of Peterborough",
				isoCode: "PTE"
			},
			{
				name: "City of Plymouth",
				isoCode: "PLY"
			},
			{
				name: "City of Portsmouth",
				isoCode: "POR"
			},
			{
				name: "City of Southampton",
				isoCode: "STH"
			},
			{
				name: "City of Stoke-on-Trent",
				isoCode: "STE"
			},
			{
				name: "City of Sunderland",
				isoCode: "SND"
			},
			{
				name: "City of Westminster",
				isoCode: "WSM"
			},
			{
				name: "City of Wolverhampton",
				isoCode: "WLV"
			},
			{
				name: "City of York",
				isoCode: "YOR"
			},
			{
				name: "Clackmannanshire",
				isoCode: "CLK"
			},
			{
				name: "Coleraine Borough Council",
				isoCode: "CLR"
			},
			{
				name: "Conwy County Borough",
				isoCode: "CWY"
			},
			{
				name: "Cookstown District Council",
				isoCode: "CKT"
			},
			{
				name: "Cornwall",
				isoCode: "CON"
			},
			{
				name: "County Durham",
				isoCode: "DUR"
			},
			{
				name: "Coventry",
				isoCode: "COV"
			},
			{
				name: "Craigavon Borough Council",
				isoCode: "CGV"
			},
			{
				name: "Cumbria",
				isoCode: "CMA"
			},
			{
				name: "Darlington",
				isoCode: "DAL"
			},
			{
				name: "Denbighshire",
				isoCode: "DEN"
			},
			{
				name: "Derbyshire",
				isoCode: "DBY"
			},
			{
				name: "Derry City Council",
				isoCode: "DRY"
			},
			{
				name: "Derry City and Strabane",
				isoCode: "DRS"
			},
			{
				name: "Devon",
				isoCode: "DEV"
			},
			{
				name: "Doncaster",
				isoCode: "DNC"
			},
			{
				name: "Dorset",
				isoCode: "DOR"
			},
			{
				name: "Down District Council",
				isoCode: "DOW"
			},
			{
				name: "Dudley",
				isoCode: "DUD"
			},
			{
				name: "Dumfries and Galloway",
				isoCode: "DGY"
			},
			{
				name: "Dundee",
				isoCode: "DND"
			},
			{
				name: "Dungannon and South Tyrone Borough Council",
				isoCode: "DGN"
			},
			{
				name: "East Ayrshire",
				isoCode: "EAY"
			},
			{
				name: "East Dunbartonshire",
				isoCode: "EDU"
			},
			{
				name: "East Lothian",
				isoCode: "ELN"
			},
			{
				name: "East Renfrewshire",
				isoCode: "ERW"
			},
			{
				name: "East Riding of Yorkshire",
				isoCode: "ERY"
			},
			{
				name: "East Sussex",
				isoCode: "ESX"
			},
			{
				name: "Edinburgh",
				isoCode: "EDH"
			},
			{
				name: "England",
				isoCode: "ENG"
			},
			{
				name: "Essex",
				isoCode: "ESS"
			},
			{
				name: "Falkirk",
				isoCode: "FAL"
			},
			{
				name: "Fermanagh District Council",
				isoCode: "FER"
			},
			{
				name: "Fermanagh and Omagh",
				isoCode: "FMO"
			},
			{
				name: "Fife",
				isoCode: "FIF"
			},
			{
				name: "Flintshire",
				isoCode: "FLN"
			},
			{
				name: "Gateshead",
				isoCode: "GAT"
			},
			{
				name: "Glasgow",
				isoCode: "GLG"
			},
			{
				name: "Gloucestershire",
				isoCode: "GLS"
			},
			{
				name: "Gwynedd",
				isoCode: "GWN"
			},
			{
				name: "Halton",
				isoCode: "HAL"
			},
			{
				name: "Hampshire",
				isoCode: "HAM"
			},
			{
				name: "Hartlepool",
				isoCode: "HPL"
			},
			{
				name: "Herefordshire",
				isoCode: "HEF"
			},
			{
				name: "Hertfordshire",
				isoCode: "HRT"
			},
			{
				name: "Highland",
				isoCode: "HLD"
			},
			{
				name: "Inverclyde",
				isoCode: "IVC"
			},
			{
				name: "Isle of Wight",
				isoCode: "IOW"
			},
			{
				name: "Isles of Scilly",
				isoCode: "IOS"
			},
			{
				name: "Kent",
				isoCode: "KEN"
			},
			{
				name: "Kirklees",
				isoCode: "KIR"
			},
			{
				name: "Knowsley",
				isoCode: "KWL"
			},
			{
				name: "Lancashire",
				isoCode: "LAN"
			},
			{
				name: "Larne Borough Council",
				isoCode: "LRN"
			},
			{
				name: "Leeds",
				isoCode: "LDS"
			},
			{
				name: "Leicestershire",
				isoCode: "LEC"
			},
			{
				name: "Limavady Borough Council",
				isoCode: "LMV"
			},
			{
				name: "Lincolnshire",
				isoCode: "LIN"
			},
			{
				name: "Lisburn City Council",
				isoCode: "LSB"
			},
			{
				name: "Lisburn and Castlereagh",
				isoCode: "LBC"
			},
			{
				name: "Liverpool",
				isoCode: "LIV"
			},
			{
				name: "London Borough of Barking and Dagenham",
				isoCode: "BDG"
			},
			{
				name: "London Borough of Barnet",
				isoCode: "BNE"
			},
			{
				name: "London Borough of Bexley",
				isoCode: "BEX"
			},
			{
				name: "London Borough of Brent",
				isoCode: "BEN"
			},
			{
				name: "London Borough of Bromley",
				isoCode: "BRY"
			},
			{
				name: "London Borough of Camden",
				isoCode: "CMD"
			},
			{
				name: "London Borough of Croydon",
				isoCode: "CRY"
			},
			{
				name: "London Borough of Ealing",
				isoCode: "EAL"
			},
			{
				name: "London Borough of Enfield",
				isoCode: "ENF"
			},
			{
				name: "London Borough of Hackney",
				isoCode: "HCK"
			},
			{
				name: "London Borough of Hammersmith and Fulham",
				isoCode: "HMF"
			},
			{
				name: "London Borough of Haringey",
				isoCode: "HRY"
			},
			{
				name: "London Borough of Harrow",
				isoCode: "HRW"
			},
			{
				name: "London Borough of Havering",
				isoCode: "HAV"
			},
			{
				name: "London Borough of Hillingdon",
				isoCode: "HIL"
			},
			{
				name: "London Borough of Hounslow",
				isoCode: "HNS"
			},
			{
				name: "London Borough of Islington",
				isoCode: "ISL"
			},
			{
				name: "London Borough of Lambeth",
				isoCode: "LBH"
			},
			{
				name: "London Borough of Lewisham",
				isoCode: "LEW"
			},
			{
				name: "London Borough of Merton",
				isoCode: "MRT"
			},
			{
				name: "London Borough of Newham",
				isoCode: "NWM"
			},
			{
				name: "London Borough of Redbridge",
				isoCode: "RDB"
			},
			{
				name: "London Borough of Richmond upon Thames",
				isoCode: "RIC"
			},
			{
				name: "London Borough of Southwark",
				isoCode: "SWK"
			},
			{
				name: "London Borough of Sutton",
				isoCode: "STN"
			},
			{
				name: "London Borough of Tower Hamlets",
				isoCode: "TWH"
			},
			{
				name: "London Borough of Waltham Forest",
				isoCode: "WFT"
			},
			{
				name: "London Borough of Wandsworth",
				isoCode: "WND"
			},
			{
				name: "Magherafelt District Council",
				isoCode: "MFT"
			},
			{
				name: "Manchester",
				isoCode: "MAN"
			},
			{
				name: "Medway",
				isoCode: "MDW"
			},
			{
				name: "Merthyr Tydfil County Borough",
				isoCode: "MTY"
			},
			{
				name: "Metropolitan Borough of Wigan",
				isoCode: "WGN"
			},
			{
				name: "Mid Ulster",
				isoCode: "MUL"
			},
			{
				name: "Mid and East Antrim",
				isoCode: "MEA"
			},
			{
				name: "Middlesbrough",
				isoCode: "MDB"
			},
			{
				name: "Midlothian",
				isoCode: "MLN"
			},
			{
				name: "Milton Keynes",
				isoCode: "MIK"
			},
			{
				name: "Monmouthshire",
				isoCode: "MON"
			},
			{
				name: "Moray",
				isoCode: "MRY"
			},
			{
				name: "Moyle District Council",
				isoCode: "MYL"
			},
			{
				name: "Neath Port Talbot County Borough",
				isoCode: "NTL"
			},
			{
				name: "Newcastle upon Tyne",
				isoCode: "NET"
			},
			{
				name: "Newport",
				isoCode: "NWP"
			},
			{
				name: "Newry and Mourne District Council",
				isoCode: "NYM"
			},
			{
				name: "Newry, Mourne and Down",
				isoCode: "NMD"
			},
			{
				name: "Newtownabbey Borough Council",
				isoCode: "NTA"
			},
			{
				name: "Norfolk",
				isoCode: "NFK"
			},
			{
				name: "North Ayrshire",
				isoCode: "NAY"
			},
			{
				name: "North Down Borough Council",
				isoCode: "NDN"
			},
			{
				name: "North East Lincolnshire",
				isoCode: "NEL"
			},
			{
				name: "North Lanarkshire",
				isoCode: "NLK"
			},
			{
				name: "North Lincolnshire",
				isoCode: "NLN"
			},
			{
				name: "North Somerset",
				isoCode: "NSM"
			},
			{
				name: "North Tyneside",
				isoCode: "NTY"
			},
			{
				name: "North Yorkshire",
				isoCode: "NYK"
			},
			{
				name: "Northamptonshire",
				isoCode: "NTH"
			},
			{
				name: "Northern Ireland",
				isoCode: "NIR"
			},
			{
				name: "Northumberland",
				isoCode: "NBL"
			},
			{
				name: "Nottinghamshire",
				isoCode: "NTT"
			},
			{
				name: "Oldham",
				isoCode: "OLD"
			},
			{
				name: "Omagh District Council",
				isoCode: "OMH"
			},
			{
				name: "Orkney Islands",
				isoCode: "ORK"
			},
			{
				name: "Outer Hebrides",
				isoCode: "ELS"
			},
			{
				name: "Oxfordshire",
				isoCode: "OXF"
			},
			{
				name: "Pembrokeshire",
				isoCode: "PEM"
			},
			{
				name: "Perth and Kinross",
				isoCode: "PKN"
			},
			{
				name: "Poole",
				isoCode: "POL"
			},
			{
				name: "Powys",
				isoCode: "POW"
			},
			{
				name: "Reading",
				isoCode: "RDG"
			},
			{
				name: "Redcar and Cleveland",
				isoCode: "RCC"
			},
			{
				name: "Renfrewshire",
				isoCode: "RFW"
			},
			{
				name: "Rhondda Cynon Taf",
				isoCode: "RCT"
			},
			{
				name: "Rochdale",
				isoCode: "RCH"
			},
			{
				name: "Rotherham",
				isoCode: "ROT"
			},
			{
				name: "Royal Borough of Greenwich",
				isoCode: "GRE"
			},
			{
				name: "Royal Borough of Kensington and Chelsea",
				isoCode: "KEC"
			},
			{
				name: "Royal Borough of Kingston upon Thames",
				isoCode: "KTT"
			},
			{
				name: "Rutland",
				isoCode: "RUT"
			},
			{
				name: "Saint Helena",
				isoCode: "SH-HL"
			},
			{
				name: "Salford",
				isoCode: "SLF"
			},
			{
				name: "Sandwell",
				isoCode: "SAW"
			},
			{
				name: "Scotland",
				isoCode: "SCT"
			},
			{
				name: "Scottish Borders",
				isoCode: "SCB"
			},
			{
				name: "Sefton",
				isoCode: "SFT"
			},
			{
				name: "Sheffield",
				isoCode: "SHF"
			},
			{
				name: "Shetland Islands",
				isoCode: "ZET"
			},
			{
				name: "Shropshire",
				isoCode: "SHR"
			},
			{
				name: "Slough",
				isoCode: "SLG"
			},
			{
				name: "Solihull",
				isoCode: "SOL"
			},
			{
				name: "Somerset",
				isoCode: "SOM"
			},
			{
				name: "South Ayrshire",
				isoCode: "SAY"
			},
			{
				name: "South Gloucestershire",
				isoCode: "SGC"
			},
			{
				name: "South Lanarkshire",
				isoCode: "SLK"
			},
			{
				name: "South Tyneside",
				isoCode: "STY"
			},
			{
				name: "Southend-on-Sea",
				isoCode: "SOS"
			},
			{
				name: "St Helens",
				isoCode: "SHN"
			},
			{
				name: "Staffordshire",
				isoCode: "STS"
			},
			{
				name: "Stirling",
				isoCode: "STG"
			},
			{
				name: "Stockport",
				isoCode: "SKP"
			},
			{
				name: "Stockton-on-Tees",
				isoCode: "STT"
			},
			{
				name: "Strabane District Council",
				isoCode: "STB"
			},
			{
				name: "Suffolk",
				isoCode: "SFK"
			},
			{
				name: "Surrey",
				isoCode: "SRY"
			},
			{
				name: "Swindon",
				isoCode: "SWD"
			},
			{
				name: "Tameside",
				isoCode: "TAM"
			},
			{
				name: "Telford and Wrekin",
				isoCode: "TFW"
			},
			{
				name: "Thurrock",
				isoCode: "THR"
			},
			{
				name: "Torbay",
				isoCode: "TOB"
			},
			{
				name: "Torfaen",
				isoCode: "TOF"
			},
			{
				name: "Trafford",
				isoCode: "TRF"
			},
			{
				name: "United Kingdom",
				isoCode: "UKM"
			},
			{
				name: "Vale of Glamorgan",
				isoCode: "VGL"
			},
			{
				name: "Wakefield",
				isoCode: "WKF"
			},
			{
				name: "Wales",
				isoCode: "WLS"
			},
			{
				name: "Walsall",
				isoCode: "WLL"
			},
			{
				name: "Warrington",
				isoCode: "WRT"
			},
			{
				name: "Warwickshire",
				isoCode: "WAR"
			},
			{
				name: "West Berkshire",
				isoCode: "WBK"
			},
			{
				name: "West Dunbartonshire",
				isoCode: "WDU"
			},
			{
				name: "West Lothian",
				isoCode: "WLN"
			},
			{
				name: "West Sussex",
				isoCode: "WSX"
			},
			{
				name: "Wiltshire",
				isoCode: "WIL"
			},
			{
				name: "Windsor and Maidenhead",
				isoCode: "WNM"
			},
			{
				name: "Wirral",
				isoCode: "WRL"
			},
			{
				name: "Wokingham",
				isoCode: "WOK"
			},
			{
				name: "Worcestershire",
				isoCode: "WOR"
			},
			{
				name: "Wrexham County Borough",
				isoCode: "WRX"
			}
		]
	},
	{
		name: "United States",
		isoCode: "US",
		states: [
			{
				name: "Alabama",
				isoCode: "AL"
			},
			{
				name: "Alaska",
				isoCode: "AK"
			},
			{
				name: "American Samoa",
				isoCode: "AS"
			},
			{
				name: "Arizona",
				isoCode: "AZ"
			},
			{
				name: "Arkansas",
				isoCode: "AR"
			},
			{
				name: "Baker Island",
				isoCode: "UM-81"
			},
			{
				name: "California",
				isoCode: "CA"
			},
			{
				name: "Colorado",
				isoCode: "CO"
			},
			{
				name: "Connecticut",
				isoCode: "CT"
			},
			{
				name: "Delaware",
				isoCode: "DE"
			},
			{
				name: "District of Columbia",
				isoCode: "DC"
			},
			{
				name: "Florida",
				isoCode: "FL"
			},
			{
				name: "Georgia",
				isoCode: "GA"
			},
			{
				name: "Guam",
				isoCode: "GU"
			},
			{
				name: "Hawaii",
				isoCode: "HI"
			},
			{
				name: "Howland Island",
				isoCode: "UM-84"
			},
			{
				name: "Idaho",
				isoCode: "ID"
			},
			{
				name: "Illinois",
				isoCode: "IL"
			},
			{
				name: "Indiana",
				isoCode: "IN"
			},
			{
				name: "Iowa",
				isoCode: "IA"
			},
			{
				name: "Jarvis Island",
				isoCode: "UM-86"
			},
			{
				name: "Johnston Atoll",
				isoCode: "UM-67"
			},
			{
				name: "Kansas",
				isoCode: "KS"
			},
			{
				name: "Kentucky",
				isoCode: "KY"
			},
			{
				name: "Kingman Reef",
				isoCode: "UM-89"
			},
			{
				name: "Louisiana",
				isoCode: "LA"
			},
			{
				name: "Maine",
				isoCode: "ME"
			},
			{
				name: "Maryland",
				isoCode: "MD"
			},
			{
				name: "Massachusetts",
				isoCode: "MA"
			},
			{
				name: "Michigan",
				isoCode: "MI"
			},
			{
				name: "Midway Atoll",
				isoCode: "UM-71"
			},
			{
				name: "Minnesota",
				isoCode: "MN"
			},
			{
				name: "Mississippi",
				isoCode: "MS"
			},
			{
				name: "Missouri",
				isoCode: "MO"
			},
			{
				name: "Montana",
				isoCode: "MT"
			},
			{
				name: "Navassa Island",
				isoCode: "UM-76"
			},
			{
				name: "Nebraska",
				isoCode: "NE"
			},
			{
				name: "Nevada",
				isoCode: "NV"
			},
			{
				name: "New Hampshire",
				isoCode: "NH"
			},
			{
				name: "New Jersey",
				isoCode: "NJ"
			},
			{
				name: "New Mexico",
				isoCode: "NM"
			},
			{
				name: "New York",
				isoCode: "NY"
			},
			{
				name: "North Carolina",
				isoCode: "NC"
			},
			{
				name: "North Dakota",
				isoCode: "ND"
			},
			{
				name: "Northern Mariana Islands",
				isoCode: "MP"
			},
			{
				name: "Ohio",
				isoCode: "OH"
			},
			{
				name: "Oklahoma",
				isoCode: "OK"
			},
			{
				name: "Oregon",
				isoCode: "OR"
			},
			{
				name: "Palmyra Atoll",
				isoCode: "UM-95"
			},
			{
				name: "Pennsylvania",
				isoCode: "PA"
			},
			{
				name: "Puerto Rico",
				isoCode: "PR"
			},
			{
				name: "Rhode Island",
				isoCode: "RI"
			},
			{
				name: "South Carolina",
				isoCode: "SC"
			},
			{
				name: "South Dakota",
				isoCode: "SD"
			},
			{
				name: "Tennessee",
				isoCode: "TN"
			},
			{
				name: "Texas",
				isoCode: "TX"
			},
			{
				name: "United States Minor Outlying Islands",
				isoCode: "UM"
			},
			{
				name: "United States Virgin Islands",
				isoCode: "VI"
			},
			{
				name: "Utah",
				isoCode: "UT"
			},
			{
				name: "Vermont",
				isoCode: "VT"
			},
			{
				name: "Virginia",
				isoCode: "VA"
			},
			{
				name: "Wake Island",
				isoCode: "UM-79"
			},
			{
				name: "Washington",
				isoCode: "WA"
			},
			{
				name: "West Virginia",
				isoCode: "WV"
			},
			{
				name: "Wisconsin",
				isoCode: "WI"
			},
			{
				name: "Wyoming",
				isoCode: "WY"
			}
		]
	}
];
