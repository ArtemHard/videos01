import { VideoInputDto } from '../dto/video.input-dto';
import { ValidationError } from './types/validationErrors';
import { Resolution } from './types/video';

export const videoInputDtoValidation = (
  data: VideoInputDto,
): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (
    !data.title ||
    typeof data.title !== 'string' ||
    // data.title.trim().length < 2 ||
    data.title.trim().length > 40
  ) {
    errors.push({
      message: 'Title is required',
      field: 'title',
    });
  }

  if (
    !data.author ||
    typeof data.author !== 'string' ||
    // data.author.trim().length < 8 ||
    data.author.trim().length > 20
  ) {
    errors.push({ field: 'author', message: 'author' });
  }

  if (!Array.isArray(data.availableResolutions)) {
    errors.push({
      field: 'availableResolutions',
      message: 'availableResolutions must be enum',
    });
  } else if (data.availableResolutions.length) {
    const existingFeatures = Object.values(Resolution);
    if (
      data.availableResolutions.length > existingFeatures.length ||
      data.availableResolutions.length < 1
    ) {
      errors.push({
        field: 'availableResolutions',
        message: 'availableResolutions',
      });
    }
    for (const feature of data.availableResolutions) {
      if (!existingFeatures.includes(feature)) {
        errors.push({
          field: 'availableResolutions',
          message: 'availableResolutions' + feature,
        });
        break;
      }
    }
  }

  return errors;
};
