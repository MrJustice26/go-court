type Court = {
  name: string;
  description: string;
  location: {
    lat: number;
    lng: number;
  };
  readable_address: string;
  court_type: string;
  [key: string]: any;
};

export { Court };
