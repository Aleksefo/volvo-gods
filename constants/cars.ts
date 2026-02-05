export interface Car {
  id: string;
  modelName: string;
  bodyType: BodyType;
  modelType: 'plug-in hybrid' | 'pure electric';
  imageUrl: string;
}

export type BodyType = 'suv' | 'estate' | 'sedan';

const IMAGE_BASE_URL =
  'https://raw.githubusercontent.com/volvo-cars/god-frontend-code-test/master/public';

export const cars: Car[] = [
  {
    id: 'xc90-recharge',
    modelName: 'XC90 Recharge',
    bodyType: 'suv',
    modelType: 'plug-in hybrid',
    imageUrl: `${IMAGE_BASE_URL}/images/xc90_recharge.jpg`,
  },
  {
    id: 'xc60-recharge',
    modelName: 'XC60 Recharge',
    bodyType: 'suv',
    modelType: 'plug-in hybrid',
    imageUrl: `${IMAGE_BASE_URL}/images/xc60_recharge.jpg`,
  },
  {
    id: 'xc40-recharge',
    modelName: 'XC40 Recharge',
    bodyType: 'suv',
    modelType: 'plug-in hybrid',
    imageUrl: `${IMAGE_BASE_URL}/images/xc40_recharge.jpg`,
  },
  {
    id: 'xc40-bev',
    modelName: 'XC40 Recharge',
    bodyType: 'suv',
    modelType: 'pure electric',
    imageUrl: `${IMAGE_BASE_URL}/images/xc40_bev.jpg`,
  },
  {
    id: 'v90-recharge',
    modelName: 'V90 Recharge',
    bodyType: 'estate',
    modelType: 'plug-in hybrid',
    imageUrl: `${IMAGE_BASE_URL}/images/v90_recharge.jpg`,
  },
  {
    id: 'v60-recharge',
    modelName: 'V60 Recharge',
    bodyType: 'estate',
    modelType: 'plug-in hybrid',
    imageUrl: `${IMAGE_BASE_URL}/images/v60_recharge.jpg`,
  },
  {
    id: 's90-recharge',
    modelName: 'S90 Recharge',
    bodyType: 'sedan',
    modelType: 'plug-in hybrid',
    imageUrl: `${IMAGE_BASE_URL}/images/s90_recharge.jpg`,
  },
  {
    id: 's60-recharge',
    modelName: 'S60 Recharge',
    bodyType: 'sedan',
    modelType: 'plug-in hybrid',
    imageUrl: `${IMAGE_BASE_URL}/images/s60_recharge.jpg`,
  },
];

export const BODY_TYPES: BodyType[] = ['suv', 'estate', 'sedan'];
