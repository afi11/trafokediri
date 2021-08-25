import {colorPrimary, colorThird, colorSecond} from '../../util/color';

const mapStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#ebe3cd',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#523735',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#f5f1e6',
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#c9b2a6',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#dcd2be',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#ae9e90',
      },
    ],
  },
  {
    featureType: 'landscape.natural',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dfd2ae',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dfd2ae',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#93817c',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#a5b076',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#447530',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#f5f1e6',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [
      {
        color: '#fdfcf8',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#f8c967',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#e9bc62',
      },
    ],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry',
    stylers: [
      {
        color: '#e98d58',
      },
    ],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#db8555',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#806b63',
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dfd2ae',
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#8f7d77',
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#ebe3cd',
      },
    ],
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dfd2ae',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#b9d3c2',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#92998d',
      },
    ],
  },
];

const styles = {
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  search: {
    position: 'absolute',
    right: 5,
    left: 5,
    top: 5,
    flexDirection: 'row',
  },
  navsearch: {
    width: 40,
    padding: 7.5,
    position: 'absolute',
    backgroundColor: '#fff',
  },
  inputSearch: {
    borderWidth: 0,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  autocompleteContainer: {
    flex: 1,
    left: 40,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 2,
  },
  infoText: {
    textAlign: 'center',
    fontSize: 16,
  },
  tipemap: {
    width: 180,
    height: 50,
    position: 'absolute',
    top: 50,
    right: 10,
    backgroundColor: '#fff',
    text: {
      marginLeft: 8,
      marginBottom: -8,
      color: colorPrimary,
      fontWeight: 'bold',
    },
  },
  statistik: {
    width: 120,
    height: 50,
    position: 'absolute',
    top: 110,
    right: 10,
    btn: {
      padding: 5,
      borderRadius: 5,
      alignItems: 'center',
      backgroundColor: colorSecond,
    },
    text: {
      color: '#fff',
      fontWeight: 'bold',
    },
  },
  infosheet: {
    btnGoto: {
      width: 120,
      borderRadius: 5,
      position: 'relative',
      backgroundColor: '#1988ff',
      padding: 5,
      btnItem: {
        color: '#fff',
        textAlign: 'center',
      },
    },
    header: {
      flexDirection: 'row',
    },
    judulHeader: {
      flex: 2,
      justifyContent: 'center',
    },
    vcratioHeader: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
    },
    hdbiasa: {
      fontSize: 16,
      marginBottom: 4,
      textAlign: 'center',
    },
    skor: {
      fontSize: 30,
    },
    container: {
      flex: 1,
      padding: 15,
      flexDirection: 'column',
    },
    moredetail: {
      flex: 1,
      marginTop: 0,
    },
    text: {
      nama_jalan: {
        fontSize: 25,
        fontWeight: 'bold'
      },
      moredetail: {
        fontSize: 18,
      },
    },
  },
  gridLayout: {
    padding: 5,
    marginBottom: 5,
    flexDirection: 'row',
    text: {
      fontSize: 20,
      marginBottom: 5,
      fontWeight: 'bold',
    },
    judul: {
      flex: 1,
    },
    item: {
      flex: 1,
      alignItems: 'flex-end',
    },
  },
  line: {
    backgroundColor: '#b7b7b7',
    height: 1,
  },
  gap: {
    height: 20,
  }
};

export {mapStyle, styles};
