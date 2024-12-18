import { observer } from 'mobx-react-lite';
import { SearchLocation } from '../../../features/SearchLocation';

export const Header = observer(() => {
  return (
    <header className="flex h-[120px] flex-col justify-center gap-3 border-b border-gray-200 bg-white px-[28px]">
      <div className="text-2xl font-semibold">Simple Weather App</div>
      <SearchLocation />
    </header>
  );
});
