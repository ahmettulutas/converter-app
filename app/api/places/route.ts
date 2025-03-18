import { NextResponse } from 'next/server';

// Enhanced response type with coordinates
export interface PlaceResult {
  id: string;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  fullAddress: string;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    if (!query) {
      return NextResponse.json({ cities: [] });
    }

    // Get API key from environment variables
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;

    if (!apiKey) {
      console.error('Google Places API key is missing');
      return NextResponse.json({ error: 'Configuration error' }, { status: 500 });
    }

    // Step 1: Call Google Places Autocomplete API
    const autocompleteResponse = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
        query
      )}&types=(cities)&key=${apiKey}`
    );

    if (!autocompleteResponse.ok) {
      throw new Error(`Google API error: ${autocompleteResponse.status}`);
    }

    const autocompleteData = await autocompleteResponse.json();

    if (autocompleteData.status !== 'OK' && autocompleteData.status !== 'ZERO_RESULTS') {
      throw new Error(`Google API returned status: ${autocompleteData.status}`);
    }

    // If no results, return empty array
    if (autocompleteData.predictions.length === 0) {
      return NextResponse.json({ cities: [] });
    }

    // Step 2: Get details for each place to fetch coordinates
    const cities: PlaceResult[] = await Promise.all(
      autocompleteData.predictions.slice(0, 5).map(async (prediction: any) => {
        try {
          // Call Place Details API to get coordinates
          const detailsResponse = await fetch(
            `https://maps.googleapis.com/maps/api/place/details/json?place_id=${prediction.place_id}&fields=geometry,formatted_address&key=${apiKey}`
          );

          if (!detailsResponse.ok) {
            throw new Error(`Place details API error: ${detailsResponse.status}`);
          }

          const detailsData = await detailsResponse.json();

          if (detailsData.status !== 'OK') {
            throw new Error(`Place details API returned status: ${detailsData.status}`);
          }

          // Extract city and country from the description
          const parts = prediction.description.split(', ');
          const name = parts[0];
          const country = parts[parts.length - 1];

          return {
            id: prediction.place_id,
            name,
            country,
            latitude: detailsData.result.geometry.location.lat,
            longitude: detailsData.result.geometry.location.lng,
            fullAddress: detailsData.result.formatted_address,
          };
        } catch (error) {
          console.error(`Error fetching details for place ${prediction.place_id}:`, error);
          // Return partial data if details fetch fails
          const parts = prediction.description.split(', ');
          return {
            id: prediction.place_id,
            name: parts[0],
            country: parts[parts.length - 1],
            latitude: 0,
            longitude: 0,
            fullAddress: prediction.description,
          };
        }
      })
    );

    return NextResponse.json({ cities });
  } catch (error) {
    console.error('Error fetching places:', error);
    return NextResponse.json({ error: 'Failed to fetch places' }, { status: 500 });
  }
}
