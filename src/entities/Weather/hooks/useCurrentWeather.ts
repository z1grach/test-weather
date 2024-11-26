import { useQuery } from '@tanstack/react-query';
import { WeatherService } from '../api';

export const useCurrentWeather = (name: string) => {
  const { data, isPending } = useQuery({
    queryKey: ['currentWeather', name],
    queryFn: async () => {
      const response = await WeatherService.getCurrentWeather(name).fetch();

      return response.data;
    },
    retry: false,
  });

  return { data, isPending };
};
