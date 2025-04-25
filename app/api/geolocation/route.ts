import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  // Try to get Vercel's Edge geodata first
  const geo = (request as any).geo;
  
  if (geo) {
    console.log('Using Vercel Edge geo data');
    return NextResponse.json({
      success: true,
      location: {
        ip:            geo.ip,
        city:          geo.city || 'Unknown',
        countryRegion: geo.region || 'Unknown',
        country:       geo.country || 'Unknown',
        latitude:      geo.latitude || null,
        longitude:     geo.longitude || null,
      }
    });
  }

  try {
    console.log('Falling back to public IP API');
    // Fallback to alternative API that works better with Edge runtime
    // Using ipapi.co which is more Edge-friendly
    const response = await fetch('https://ipapi.co/json/', { 
      cache: 'no-store',
      headers: { 'Accept': 'application/json' }
    });

    if (!response.ok) {
      throw new Error(`IP API responded with status: ${response.status}`);
    }

    const data = await response.json();
    console.log('IP API response:', data);

    // Map ipapi.co response to our expected format
    return NextResponse.json({
      success: true,
      location: {
        ip:            data.ip || null,
        city:          data.city || 'Unknown',
        countryRegion: data.region || 'Unknown',
        country:       data.country_name || 'Unknown',
        latitude:      data.latitude || null,
        longitude:     data.longitude || null,
      }
    });
  } catch (error) {
    // If first API fails, try another fallback
    try {
      console.log('First API failed, trying alternative API');
      const response = await fetch('https://geolocation-db.com/json/', {
        cache: 'no-store',
        headers: { 'Accept': 'application/json' }
      });
      
      if (!response.ok) {
        throw new Error(`Alternative API responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Alternative API response:', data);
      
      return NextResponse.json({
        success: true,
        location: {
          ip:            data.IPv4 || null,
          city:          data.city || 'Unknown',
          countryRegion: data.state || 'Unknown',
          country:       data.country_name || 'Unknown',
          latitude:      data.latitude || null,
          longitude:     data.longitude || null,
        }
      });
    } catch (fallbackError) {
      console.error('All fallback APIs failed:', error, fallbackError);
      
      // Return a fallback response instead of an error
      return NextResponse.json({
        success: false,
        location: {
          ip:            null,
          city:          'Unknown',
          countryRegion: 'Unknown',
          country:       'Unknown',
          latitude:      null,
          longitude:     null,
        },
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
} 