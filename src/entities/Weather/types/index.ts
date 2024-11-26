export interface ICurrentWeather {
  current: {
    condition: {
      text: string;
      icon: string;
    };
    temp_c: number;
  };
  location: {
    name: string;
    region: string;
    country: string;
  };
}
