import { observer } from 'mobx-react-lite';
import { useRootStore } from '../../../shared/stores';
import { WeatherWrapper } from './WeatherWrapper';

export const Weather = observer(() => {
  const { coreStore } = useRootStore();

  return (
    <div
      className={
        coreStore.isMobile
          ? 'flex flex-col gap-2 overflow-x-hidden p-5'
          : 'flex flex-wrap gap-5 p-5'
      }
    >
      {coreStore.savedLocations.map((item) => (
        <WeatherWrapper key={item.id} location={item} />
      ))}
    </div>
  );
});
