import React, { useState } from 'react';
import Map, {Marker} from 'react-map-gl';
import '../styles/Address.css'

function Address({ formData, setFormData, handleChange }) {
  const [viewport, setViewport] = useState({
    width: 400,
    height: 250,
    latitude: 50.450001,
    longitude: 30.523333,
    zoom: 14
  });

  const [position, setPosition] = useState({
    longitude: 0,
    latitude: 0
  });

  const [retrievedAddress, setRetrievedAddress] = useState('');

  const onMapClick = async (event) => {
    const { lngLat } = event; // Extract coordinates from the event
    setPosition({ longitude: lngLat.lng, latitude: lngLat.lat });
  
    try {
      const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lngLat.lng},${lngLat.lat}.json?access_token=${process.env.REACT_APP_MAPBOX}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const placeName = data.features[0].place_name;
        setRetrievedAddress(placeName); // Update retrievedAddress state
        setFormData({ ...formData, address: placeName }); // Update formData with the retrieved address
      } else {
        console.log('No place found for the given coordinates.');
      }
    } catch (error) {
      console.error('Error fetching geocoding data:', error);
    }
  };
  
  const onMarkerClick = (event) => {
    alert('You clicked on marker');
    event.stopPropagation();
  };

  const onDragEnd = (lngLat) => {
    setPosition({ longitude: lngLat.lng, latitude: lngLat.lat });
  };

  return (
    <div className="delivery-form ">
      <h3 className='text-[#302f2d] text-3xl text-center my-2'>Fill out the order registration form</h3>
      <div id='map' className='relative mb-2'>
        <div className='flex absolute w-full justify-center map-btn-group'>
          <p className='flex items-center absolute z-10 translate-y-1 bg-zinc-100 border border-gray-300 rounded-md p-1 text-zinc-600'>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1 text-emerald-700"
            fill="currentColor"
            viewBox="0 0 24 24"
            stroke="currentColor"
          ><path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              clipRule="evenodd"
              fillRule="evenodd"
              d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6"
            />
          </svg>
          Pinpoint your location
          </p>
        </div>
        <Map
        {...viewport}
        onMove={evt => setViewport(evt.viewport)}
        mapboxAccessToken="pk.eyJ1IjoieGludGVlIiwiYSI6ImNsc3JlM3dseTE5bnIyaXFtNmFjOTNmcmwifQ._ztJDUOcyzth1GcHHmIggg"
        style={{width: 400, height: 250}}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onClick={onMapClick}
        >

        <Marker
          latitude= {position.latitude}
          longitude={position.longitude}
          offsetLeft={-20}
          offsetTop={-10}
          
        >
          <div className='flex flex-col items-center justify-center'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-red-600"><path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" /></svg>
          </div>
        </Marker>
        

        </Map>

      </div>
      <form className='grid grid-cols-2 gap-8'>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder='Full Name'
            value={formData.name}
            onChange={handleChange}
            className='bg-'
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder='example@gmail.com'
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder='000-000-0000'
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address:</label>
          <input
            id="address"
            name="address"
            value={retrievedAddress} // formData.address
            onChange={handleChange}
          ></input>
        </div>
      </form>
    </div>
  );
}

export default Address;
