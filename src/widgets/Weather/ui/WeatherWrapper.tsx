import { observer } from 'mobx-react-lite';
import { ISavedLocation } from '../../../shared/stores/CoreStore';
import { useRootStore } from '../../../shared/stores';
import { useCurrentWeather } from '../../../entities/Weather/hooks';
import { WeatherCard } from './WeatherCard';
import { WeatherMobileCard } from './WeatherMobileCard';

interface WeatherWrapperProps {
  location: ISavedLocation;
}

export const WeatherWrapper = observer(({ location }: WeatherWrapperProps) => {
  const { coreStore } = useRootStore();
  const { data, isPending } = useCurrentWeather(location.name);

  if (coreStore.isMobile) {
    return (
      <WeatherMobileCard
        location={location}
        data={data}
        isPending={isPending}
      />
    );
  }

  return <WeatherCard location={location} data={data} isPending={isPending} />;
});
