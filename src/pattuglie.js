const ptg = {
    A1: {begin: 0, selection: 'left'},
    A2: {begin: 0, selection: 'left'},
    B1: {begin: 0, selection: 'left'},
    B3: {begin: 0, selection: 'left'},
    C1: {begin: 1, selection: 'left'},
    C3: {begin: 1, selection: 'left'},
    D1: {begin: 1, selection: 'left'},
    D2: {begin: 1, selection: 'left'},
    D4: {begin: 2, selection: 'left'},
    E1: {begin: 2, selection: 'left'},
    E2: {begin: 2, selection: 'left'},
    F1: {begin: 2, selection: 'left'},
    F2: {begin: 3, selection: 'left'},
    G1: {begin: 3, selection: 'left'},
    G2: {begin: 3, selection: 'left'},
    H1: {begin: 3, selection: 'left'},
    H2: {begin: 4, selection: 'left'},
    I1: {begin: 4, selection: 'left'},
    I2: {begin: 4, selection: 'left'},
    J1: {begin: 4, selection: 'left'},
    J2: {begin: 5, selection: 'left'},
    K1: {begin: 5, selection: 'left'},
    K2: {begin: 5, selection: 'left'},
    K4: {begin: 5, selection: 'left'},
    L1: {begin: 6, selection: 'left'},
    L2: {begin: 6, selection: 'left'},
    M1: {begin: 6, selection: 'left'},
    M2: {begin: 6, selection: 'left'},
    N1: {begin: 0, selection: 'right'},
    N2: {begin: 0, selection: 'right'},
    O1: {begin: 0, selection: 'right'},
    O2: {begin: 1, selection: 'right'},
    P1: {begin: 1, selection: 'right'},
    P2: {begin: 1, selection: 'right'},
    Q3: {begin: 1, selection: 'right'},
    R1: {begin: 2, selection: 'right'},
    R2: {begin: 2, selection: 'right'},
    S1: {begin: 2, selection: 'right'},
    S2: {begin: 3, selection: 'right'},
    S3: {begin: 3, selection: 'right'},
    T1: {begin: 3, selection: 'right'},
    T2: {begin: 3, selection: 'right'},
    U1: {begin: 4, selection: 'right'},
    U2: {begin: 4, selection: 'right'},
    U3: {begin: 4, selection: 'right'},
    V1: {begin: 5, selection: 'right'},
    V2: {begin: 5, selection: 'right'},
    V3: {begin: 5, selection: 'right'},
    X3: {begin: 6, selection: 'right'},
    Y1: {begin: 6, selection: 'right'},
    Y5: {begin: 6, selection: 'right'},
    Z1: {begin: 6, selection: 'right'},
    Z4: {begin: 6, selection: 'right'},
}

const locations = {
    left: [
        {id: 0, name: 'Parco Pubblico Naturalistico Sensoriale Mombellino', position: [45.61885192879112, 9.129838679649454]},
        {id: 1, name: 'Sede CNGEI Cesano -Limbiate', position: [45.61695187867524, 9.122162184616935]},
        {id: 2, name: 'Prato davanti lo chalet dell’ Oasi Lipu', position: [45.62272826162125, 9.132262349403554]},
        {id: 3, name: 'Parchetto Via Pietro Toselli, Limbiate', position: [45.6137369990694, 9.134075118599268]},
        {id: 4, name: 'Anfiteatro nel parchetto di  Via Marche', position: [45.63442126570225, 9.12524180819206]},
        {id: 5, name: 'Chiesa di San Giuseppe Artigiano - Limbiate', position: [45.61829685281947, 9.125741721955105]},
        {id: 6, name: 'Prato Via Cristoforo Colombo - Cesano Maderno', position: [45.625168822310826, 9.135068429768191]},
    ],
    right: [
        {id: 0, name: 'Bosco Agostino Andermark - Bovisio Masciago ', position: [45.61617888068013, 9.140715560051513]},
        {id: 1, name: 'Parco Collodi - Cesano Maderno', position: [45.62263078416864, 9.138353882765]},
        {id: 2, name: 'Parco Via Trento e Trieste - Bovisio Masciago', position: [45.61479995751475, 9.149152569492099]},
        {id: 3, name: 'Parco di Via Roma - Bovisio Masciago', position: [45.61170094258773, 9.146517710410361]},
        {id: 4, name: 'Parco giochi Melgacciata - Bovisio Masciago', position: [45.615082455561335, 9.151070943125422]},
        {id: 5, name: 'Parrocchia della Sacra Famiglia - Cesano Maderno', position: [45.61931386899201, 9.139369975596376]},
        {id: 6, name: 'Giardino comunale Angelo Gays -  Cesano Maderno', position: [45.6235166814503, 9.143568169080789]},
    ]
}

export const getMarkers = (code) => {
    const data = ptg[code.trim().toUpperCase()];
    if(!data) return null;
    return [...locations[data.selection].slice(data.begin),...locations[data.selection].slice(0, data.begin)].map(x => ({...x, id: (x.id + 7 - data.begin) % 7}))
}