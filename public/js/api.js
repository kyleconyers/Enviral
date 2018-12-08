//Check categories id to api calls also in kilowatthours
var APIkey = 'd84f8f53c83715f73e4dccd041c94ca8'
const urlStringRenewables = "http://api.eia.gov/category/?api_key=" + APIkey + "&category_id=2783646"
const urlStringElectricity = `http://api.eia.gov/series/?api_key=${APIkey}&series_id=INTL.2-12-WORL-BKWH.A`;
const urlStringFFuel = "http://api.eia.gov/series/?api_key=" + APIkey + "&series_id=INTL.28-12-WORL-BKWH.A";
const urlStringCoal = "http://api.eia.gov/series/?api_key=" + APIkey + "&series_id=INTL.29-12-WORL-BKWH.A";



const urlStringAusCoal = "http://api.eia.gov/series/?api_key=" + APIkey + "&series_id=INTL.4411-2-AUS-QBTU.A";

var isoArray = ["AUS", "BRA", "CHN", "COD", "FRA", "IND", "RUS", "USA"]
var electricArray = [];
var coalArray = [];
var ffuelArray = [];
var AusCoalArray = [];
var worldCreated;
var totalCoalArrayList = [];
var totalNaturalGasList = [];

// Scott's added code
var countryDataLookup = { };
 
var usaTotal = [];


const coalArr = [];
const naturalGasArr = [];
var UsaArr = [];


const urlCountriesCoal = "http://api.eia.gov/series/?api_key=" + APIkey + "&series_id=INTL.4411-2-" + "USA" + "-QBTU.A"
const urlCountriesNaturalGas = "http://api.eia.gov/series/?api_key=" + APIkey + "&series_id=INTL.4413-2-" + "USA" + "-QBTU.A";
const urlCountriesPetroleum = "http://api.eia.gov/series/?api_key=" + APIkey + "&series_id=INTL.5-2-" + "USA" + "-QBTU.A";
const urlCountriesJetFuel = "http://api.eia.gov/series/?api_key=" + APIkey + "&series_id=INTL.63-2-" + "USA" + "-QBTU.A";
//renewable
const urlCountriesNuclear = "http://api.eia.gov/series/?api_key=" + APIkey + "&series_id=INTL.27-12-" + "USA" + "-BKWH.A";
const urlCountriesSolar = "http://api.eia.gov/series/?api_key=" + APIkey + "&series_id=INTL.116-12-" + "USA" + "-BKWH.A";
const urlCountriesWind = "http://api.eia.gov/series/?api_key=" + APIkey + "&series_id=INTL.37-12-" + "USA" + "-QBTU.A";
const urlCountriesBiofuels = "http://api.eia.gov/series/?api_key=" + APIkey + "&series_id=INTL.79-2-" + "USA" + "-QBTU.A";
const urlStringAUSCoal = "http://api.eia.gov/series/?api_key=" + APIkey + "&series_id=INTL.4411-2-" + "AUS" + "-QBTU.A";
const usaTotalApi = [urlCountriesCoal, urlCountriesNaturalGas, urlCountriesPetroleum, urlCountriesJetFuel, urlCountriesNuclear, urlCountriesSolar, urlCountriesWind, urlCountriesBiofuels, urlStringAUSCoal];


function fetchTotalUsa(url) {
    return fetch(url).then(function (res) {
        return res.json()
    }).then(function (dataTotalUsa) {
        // console.log("data Coal here ", dataCoal)
        // console.log(dataTotalCoal)
        totalUsaArray = dataTotalUsa['series'][0]['data'];
        // console.log("Coal array is heeeere", coalArray);
        // console.log("Total coal", totalCoalArray);
        UsaArr.push(totalUsaArray)
        // console.log("test", totalUsaArray);
        return totalUsaArray;
        
    });

};
// fetchTotalCoal();
var totalUsaArray = usaTotalApi.map(function(url){
    // console.log("http://api.eia.gov/series/?api_key=" + APIkey + "&series_id=INTL.4411-2-" + element + "-QBTU.A");
    return fetchTotalUsa(url)
})

Promise.all(totalUsaArray).then(function(values) {
    console.log('USA', values)
})










function fetchTotalCoal(url) {
    return fetch(url).then(function (res) {
        return res.json()
    }).then(function (dataTotalCoal) {
        // console.log("data Coal here ", dataCoal)
        // console.log(dataTotalCoal)
        totalCoalArray = dataTotalCoal['series'][0]['data'];
        // console.log("Coal array is heeeere", coalArray);
        // console.log("Total coal", totalCoalArray);
        coalArr.push(totalCoalArray)
        return totalCoalArray;
    });

};
// fetchTotalCoal();
var totalCoalArray = isoArray.map(function(element){
    // console.log("http://api.eia.gov/series/?api_key=" + APIkey + "&series_id=INTL.4411-2-" + element + "-QBTU.A");
    return fetchTotalCoal("http://api.eia.gov/series/?api_key=" + APIkey + "&series_id=INTL.4411-2-" + element + "-QBTU.A")
})

Promise.all(totalCoalArray).then(function(values) {
    console.log('coal values', values)
})

function fetchTotalNaturalGas(url) {
    return fetch(url).then(function (res) {
        return res.json();
    }).then(function (json) {
        // console.log("data Coal here ", dataCoal)
        // console.log(dataTotalCoal)
        var data = json['series'][0]['data'];
        totalNaturalGasArray = data;
        var countryCode = json['series'][0]['geography'];
        // console.log("Coal array is heeeere", coalArray);
        // console.log("Total coal", totalCoalArray);
        naturalGasArr.push(json);
        return { countryCode: countryCode, data: data};
    });

};
// fetchTotalCoal();
var totalNaturalGasArray = isoArray.map(function(countryCode){
    // console.log("http://api.eia.gov/series/?api_key=" + APIkey + "&series_id=INTL.4411-2-" + countryCode + "-QBTU.A");
    return fetchTotalNaturalGas("http://api.eia.gov/series/?api_key=" + APIkey + "&series_id=INTL.4413-2-" + countryCode + "-QBTU.A")
})

Promise.all(totalNaturalGasArray).then(function(pair) {
    countryDataLookup[pair.countryCode] = pair.data;
})

// console.log(totalCoalArray)
// console.log('arr', arr)
// console.log(totalCoalArray)
// for(let i = 0; i < totalCoalArray.length; i++) {
//    console.log(totalCoalArray[i])

//    function fetchTotalCoal() {
//     return fetch(totalCoalArray[i]).then(function (res) {
//         return res.json()
//     }).then(function (dataTotalCoal) {
//         // console.log("data Coal here ", dataCoal)
//         // console.log(dataTotalCoal)
//         totalCoalArray = dataTotalCoal['series'][0]['data'];
//         // console.log("Coal array is heeeere", coalArray);
//         console.log("Total coal", totalCoalArray);
//         return totalCoalArray;
//     });

// };
// fetchTotalCoal();
// }




// Scope issue if we don't return the entire function body. The lesson learned is not to return up to the body but to the entire body. 
function fetchElec() {
    return fetch(urlStringElectricity).then(function (res) {
        return res.json()
    }).then(function (dataE) {
        // console.log('dataE', dataE['series'][0]['data']);
        electricArray = dataE['series'][0]['data'];
        // console.log("It's meeeeeeee", electricArray);
        return electricArray;
    })
    
}

function fetchFFuel() {
    return fetch(urlStringFFuel).then(function (res) {
        return res.json()
    }).then(function (dataFFuel) {
        // console.log("data Fuel here ", dataFFuel)
        ffuelArray = dataFFuel['series'][0]['data'];
        return ffuelArray;
    })
};

function fetchCoal() {
    return fetch(urlStringCoal).then(function (res) {
        return res.json()
    }).then(function (dataCoal) {
        // console.log("data Coal here ", dataCoal)
        coalArray = dataCoal['series'][0]['data'];
        // console.log("Coal array is heeeere", coalArray);
        return coalArray;
    });

};

function fetchAusCoal() {
    return fetch(urlStringAusCoal).then(function (res) {
        return res.json()
    }).then(function (dataAusCoal) {
        // console.log("data Coal here ", dataCoal)
        // console.log(dataAusCoal)
        AusCoalArray = dataAusCoal['series'][0]['data'];
        // console.log("Coal array is heeeere", coalArray);
        // console.log("Aus coal", AusCoalArray);
        return AusCoalArray;
    });

};
fetchAusCoal();


// console.log(countryCoalArray)



// console.log('function check ', fetchCoal());
// async function fetchAll() {
//     await fetchCoal();
//     await fetchElec();
//     await fetchFFuel();
//     await createWorld();
// };
// fetchAll();


Promise.all([fetchCoal(), fetchFFuel(), fetchElec()]).then(function (data) {
    // console.log(data);
    // console.log(electricArray);
    // console.log(coalArray);
    // console.log(ffuelArray);
   
    var chartData = electricArray.map(function(year, i){
        return [year[0], year[1], coalArray[i][1],
                                  ffuelArray[i][1]
    ]

    })
    // console.log(chartData)

    var worldAggArr = data[0].map(obj => {
        var newObjectIwant = {};
        newObjectIwant['year'] = obj[0];
        newObjectIwant['Elec_kw'] = obj[1];
        return newObjectIwant;

    });
    worldAggArr.forEach((yearObj, index) => {
        yearObj['coal_kw'] = data[1][index][1];
        yearObj['ffuel_kw'] = data[2][index][1];

    });
    chartData.unshift(["year", "electric", "coal", "ffuel"])
    // console.log(worldAggArr);
 
    function createworld() {
        // console.log(coalArray)
        var chartData = electricArray.map(function(year, i){
            return [year[0], year[1], coalArray[i][1],
                                      ffuelArray[i][1]
        ]})
        var finalData = []
        for(var i = chartData.length - 1; i>-1; i--){
            finalData.push(chartData[i])
        }
        finalData.unshift(["year", "electric", "coal", "ffuel"])
        // var worldAggArr = electricArray.map(obj => {
        //     var newObjectIwant = {};
        //     newObjectIwant['year'] = obj[0];
        //     newObjectIwant['Elec_kw'] = obj[1];
        //     return newObjectIwant;
        // });
    
        // worldAggArr.forEach((yearObj, index) => {
        //     yearObj['coal_kw'] = coalArray[index][1];
        //     yearObj['ffuel_kw'] = ffuelArray[index][1];
    
        // });
        // makeGraph(worldAggArr);
        // console.log("world agg object here ", worldAggArr)
        // console.log(finalData, "envoked")
        return finalData;
    };
    worldCreated = createworld();
    return worldCreated;
}).then(((worldCreated) => console.log(worldCreated)));
// .then(createworld());
//Create object for NA with each type of energy production method
var objectA = {
    countryname: "USA",
    Petroleum: 6,
    Hydroleum: 7,
    Year: 1999
};

// //Aggregate into an array
var MassiveArray = [];


//REformatting URL string array


function createWorld() {
    var worldAggArr = electricArray.map(obj => {
        var newObjectIwant = {};
        newObjectIwant['year'] = obj[0];
        newObjectIwant['Elec_kw'] = obj[1];
        return newObjectIwant;
    });

    worldAggArr.forEach((yearObj, index) => {
        yearObj['coal_kw'] = coalArray[index][1];
        yearObj['ffuel_kw'] = ffuelArray[index][1];

    });

    console.log("world agg object here ", worldAggArr)
};


// AFG
// ALA
// ALB
// DZA
// ASM
// AND
// AGO
// AIA
// ATA
// ATG
// ARG
// ARM
// ABW
// AUS
// AUT
// AZE
// BHS
// BHR
// BGD
// BRB
// BLR
// BEL
// BLZ
// BEN
// BMU
// BTN
// BOL
// BES
// BIH
// BWA
// BVT
// BRA
// IOT
// VGB
// BRN
// BGR
// BFA
// BDI
// CPV
// KHM
// CMR
// CAN
// CYM
// CAF
// TCD
// CHL
// CHN
// HKG
// MAC
// CXR
// CCK
// COL
// COM
// COG
// COK
// CRI
// CIV
// HRV
// CUB
// CUW
// CYP
// CZE
// PRK
// COD
// DNK
// DJI
// DMA
// DOM
// ECU
// EGY
// SLV
// GNQ
// ERI
// EST
// SWZ
// ETH
// FLK
// FRO
// FJI
// FIN
// FRA
// GUF
// PYF
// ATF
// GAB
// GMB
// GEO
// DEU
// GHA
// GIB
// GRC
// GRL
// GRD
// GLP
// GUM
// GTM
// GGY
// GIN
// GNB
// GUY
// HTI
// HMD
// VAT
// HND
// HUN
// ISL
// IND
// IDN
// IRN
// IRQ
// IRL
// IMN
// ISR
// ITA
// JAM
// JPN
// JEY
// JOR
// KAZ
// KEN
// KIR
// KWT
// KGZ
// LAO
// LVA
// LBN
// LSO
// LBR
// LBY
// LIE
// LTU
// LUX
// MDG
// MWI
// MYS
// MDV
// MLI
// MLT
// MHL
// MTQ
// MRT
// MUS
// MYT
// MEX
// FSM
// MCO
// MNG
// MNE
// MSR
// MAR
// MOZ
// MMR
// NAM
// NRU
// NPL
// NLD
// NCL
// NZL
// NIC
// NER
// NGA
// NIU
// NFK
// MNP
// NOR
// OMN
// PAK
// PLW
// PAN
// PNG
// PRY
// PER
// PHL
// PCN
// POL
// PRT
// PRI
// QAT
// KOR
// MDA
// REU
// ROU
// RUS
// RWA
// BLM
// SHN
// KNA
// LCA
// MAF
// SPM
// VCT
// WSM
// SMR
// STP
// SAU
// SEN
// SRB
// SYC
// SLE
// SGP
// SXM
// SVK
// SVN
// SLB
// SOM
// ZAF
// SGS
// SSD
// ESP
// LKA
// PSE
// SDN
// SUR
// SJM
// SWE
// CHE
// SYR
// TJK
// THA
// MKD
// TLS
// TGO
// TKL
// TON
// TTO
// TUN
// TUR
// TKM
// TCA
// TUV
// UGA
// UKR
// ARE
// GBR
// TZA
// UMI
// USA
// VIR
// URY
// UZB
// VUT
// VEN
// VNM
// WLF
// ESH
// YEM
// ZMB
// ZWE
