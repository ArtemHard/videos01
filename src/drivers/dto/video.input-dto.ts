import { Resolution } from '../validation/types/video';

export type VideoInputDto = {
  title: 'string';
  author: 'string';
  availableResolutions: Resolution[];
};
