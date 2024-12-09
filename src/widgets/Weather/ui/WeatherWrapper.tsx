import React from 'react';
import { useCurrentWeather } from '../../../entities/Weather/hooks';
import { WeatherCard } from './WeatherCard';
import { WeatherMobileCard } from './WeatherMobileCard';
import { useAppSelector } from '../../../shared/hooks';
import { ISavedLocation } from '../../../shared/stores/locationSlice';

interface WeatherWrapperProps {
  location: ISavedLocation;
}

export const WeatherWrapper = React.memo(
  ({ location }: WeatherWrapperProps) => {
    const { isMobile } = useAppSelector((state) => state.mobile);
    const { data, isPending } = useCurrentWeather(location.name);

    if (isMobile) {
      return (
        <WeatherMobileCard
          location={location}
          data={data}
          isPending={isPending}
        />
      );
    }

    return (
      <WeatherCard location={location} data={data} isPending={isPending} />
    );
  },
);
