import { Request, Response, Router } from 'express';
import { HttpStatus } from '../../core/types/http-statuses';
import { db } from '../../db/in-memory.db';
import { createErrorMessages } from '../../core/utils/error.utils';
import { VideoInputDto } from '../dto/video.input-dto';
import { videoInputDtoValidation } from '../validation/videoInputDtoValidation';
import { Resolution, Video } from '../validation/types/video';
import { videoInputUpdateDtoValidation } from '../validation/videoInputUpdateDtoValidation';

export const videosRouter = Router({});

videosRouter
  .get('', (req: Request, res: Response) => {
    res.status(200).send(db.videos);
  })

  .get('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const video = db.videos.find((d) => d.id === id);

    if (!video) {
      res
        .status(HttpStatus.NotFound)
        .send(
          createErrorMessages([{ field: 'id', message: 'video not found' }]),
        );
      return;
    }
    res.status(200).send(video);
  })

  .post('', (req: Request<{}, {}, VideoInputDto>, res: Response) => {
    const errors = videoInputDtoValidation(req.body);

    if (errors.length > 0) {
      res.status(HttpStatus.BadRequest).send(createErrorMessages(errors));
      return;
    }

    const newVideo: Video = {
      id: db.videos.length ? db.videos[db.videos.length - 1].id + 1 : 1,
      title: req.body.title,
      author: req.body.author,
      availableResolutions: req.body.availableResolutions || [Resolution.P1080],
      canBeDownloaded: false,
      minAgeRestriction: null,
      publicationDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
    };
    db.videos.push(newVideo);
    res.status(HttpStatus.Created).send(newVideo);
  })

  .put('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const index = db.videos.findIndex((v) => v.id === id);

    if (index === -1) {
      res
        .status(HttpStatus.NotFound)
        .send(
          createErrorMessages([{ field: 'id', message: 'video not found' }]),
        );
      return;
    }

    const errors = videoInputUpdateDtoValidation(req.body);

    if (errors.length > 0) {
      res.status(HttpStatus.BadRequest).send(createErrorMessages(errors));
      return;
    }

    const video = db.videos[index];

    video.title = req.body.title;
    video.author = req.body.author;
    video.availableResolutions = req.body.availableResolutions ;
    video.canBeDownloaded = req.body.canBeDownloaded;
    video.minAgeRestriction = req.body.minAgeRestriction;
    video.publicationDate = req.body.publicationDate;

    res.sendStatus(HttpStatus.NoContent);
  })

  .delete('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    //ищет первый элемент, у которого функция внутри возвращает true и возвращает индекс этого элемента в массиве, если id ни у кого не совпал, то findIndex вернёт -1.
    const index = db.videos.findIndex((v) => v.id === id);

    if (index === -1) {
      res
        .status(HttpStatus.NotFound)
        .send(
          createErrorMessages([{ field: 'id', message: 'Video not found' }]),
        );
      return;
    }

    db.videos.splice(index, 1);
    res.sendStatus(HttpStatus.NoContent);
  });
