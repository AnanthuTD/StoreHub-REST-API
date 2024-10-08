import redisClient from '../redis/redisClient';

interface GetNearbyDeliveryPartnersProps {
  latitude: number | string;
  longitude: number | string;
  radius: number;
  unit?: 'm' | 'km' | 'mi' | 'ft';
  limit?: number;
}

interface Partner {
  partnerId: string;
  distance: string;
}

interface GetNearbyDeliveryPartnersResult {
  success: boolean;
  partners?: Partner[];
  message?: string;
}

/**
 * Retrieves nearby delivery partners based on the provided geographical coordinates and radius.
 *
 * @param latitude - The latitude of the location to search from.
 * @param longitude - The longitude of the location to search from.
 * @param radius - The radius within which to search for delivery partners.
 * @param unit - The unit of measurement for the radius (default is 'm').
 *
 * @returns An object containing the success status, an array of nearby delivery partners (if any),
 * and an appropriate message.
 */
export async function getNearbyDeliveryPartners({
  latitude,
  longitude,
  radius,
  unit = 'm',
  limit = 0,
}: GetNearbyDeliveryPartnersProps): Promise<GetNearbyDeliveryPartnersResult> {
  if (!latitude || !longitude || !radius || radius <= 0) {
    return {
      success: false,
      message: 'Latitude, longitude, and a positive radius are required!',
    };
  }

  const lat = parseFloat(latitude as string);
  const long = parseFloat(longitude as string);

  if (isNaN(lat) || isNaN(long)) {
    return { success: false, message: 'Invalid latitude or longitude values!' };
  }

  try {
    const countParam = limit ? [`COUNT ${limit}`] : [];

    // Retrieve nearby delivery partners using Redis GEORADIUS
    const nearbyPartners = (await redisClient.georadius(
      'delivery-partner:location',
      long,
      lat,
      radius,
      unit,
      'WITHDIST',
      'ASC',
      ...countParam
    )) as string[][]; // Redis returns a 2D array of partnerId and distance

    // Log the raw response
    console.log('nearbyPartners: ' + nearbyPartners);

    // Check if any partners were found
    if (nearbyPartners.length === 0) {
      return {
        success: true,
        partners: [],
        message: 'No delivery partners found nearby.',
      };
    }

    let availableDeliveredPartners = await Promise.all(
      nearbyPartners.map(async ([partnerId, distance]) => {
        const isUnavailable = await redisClient.sismember(
          'unavailable-partners',
          partnerId
        );
        return isUnavailable
          ? null
          : {
              partnerId,
              distance,
            };
      })
    );

    availableDeliveredPartners = availableDeliveredPartners.filter(
      (partner) => !!partner
    );

    return {
      success: true,
      partners: availableDeliveredPartners,
    };
  } catch (error) {
    console.error('Error retrieving nearby delivery partners:', error);
    return {
      success: false,
      message:
        'Failed to retrieve nearby delivery partners due to internal error.',
    };
  }
}
