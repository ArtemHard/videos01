import request from 'supertest';
import express from 'express';
import { setupApp } from '../setup-app';
import { HttpStatus } from '../core/types/http-statuses';
import { DriverInputDto } from '../drivers/validation/dto/driver.input-dto';
import { VideoInputDto } from '../drivers/dto/video.input-dto';
import { Resolution, Video } from '../drivers/validation/types/video';

describe('Video API', () => {
  const app = express();
  setupApp(app);

  const testVideoData = {
    title: 'test Tiltle',
    author: 'valid author',
    availableResolutions: ['P144', 'P240', 'P720'] as Resolution[],
  };

  beforeAll(async () => {
    await request(app).delete('/testing/all-data').expect(HttpStatus.NoContent);
  });

  it('should return error after put; POST/PUT /videos', async () => {
    const newDriver: VideoInputDto = {
      title: 'null',
      author: 'valid author',
      availableResolutions: ['P144', 'P240', 'P720'] as Resolution[],
    };

    const videoResponse1 = await request(app)
      .post('/videos')
      .send(newDriver)
      .expect(201);
    const videoResponse2 = await request(app)
      .post('/videos')
      .send(newDriver)
      .expect(201);
    const videoResponse3 = await request(app)
      .post('/videos')
      .send(newDriver)
      .expect(201);
    const videoResponse4 = await request(app)
      .post('/videos')
      .send(newDriver)
      .expect(201);
    const videoResponse5 = await request(app)
      .post('/videos')
      .send(newDriver)
      .expect(201);

    const updatedVideo = {
      title: 'length_41-oGuSMzyRUxdnN7ClQA7QbIEk5eMianm',
      author: 'valid author',
      availableResolutions: ['P720'],
      canBeDownloaded: true,
      minAgeRestriction: 25,
      publicationDate: '2026-02-01T09:20:58.090Z',
    };

    const videoResponsePut = await request(app)
      .put('/videos/5')
      .send(updatedVideo)
      .expect(400);

    // Проверяем структуру и содержание ошибок
    expect(videoResponsePut.body).toHaveProperty('errorsMessages');
    expect(Array.isArray(videoResponsePut.body.errorsMessages)).toBe(true);
    expect(videoResponsePut.body.errorsMessages).toHaveLength(2);

    // Проверяем первую ошибку — поле "title"
    expect(videoResponsePut.body.errorsMessages[0]).toEqual(
      expect.objectContaining({
        message: expect.any(String),
        field: 'title',
      }),
    );

    // Проверяем вторую ошибку — поле "canBeDownloaded"
    expect(videoResponsePut.body.errorsMessages[1]).toEqual(
      expect.objectContaining({
        message: expect.any(String),
        field: 'canBeDownloaded',
      }),
    );

    // Дополнительно: можно проверить, что хотя бы часть сообщения содержит ожидаемый текст
    expect([
      'Title is required',
      'title should not be empty',
      'must be a string',
    ]).toContain(videoResponsePut.body.errorsMessages[0].message);
    expect(videoResponsePut.body.errorsMessages[1].message).toContain(
      'boolean',
    );
  });

  it('should return 400 with validation error for null title; POST /videos', async () => {
    const invalidVideoData = {
      title: null,
      author: 'valid author',
      availableResolutions: ['P144', 'P240', 'P720'],
    };

    const response = await request(app)
      .post('/videos')
      .send(invalidVideoData)
      .expect(400);

    // Проверяем, что тело ответа содержит errorMessage как массив
    expect(response.body).toHaveProperty('errorsMessages');
    expect(Array.isArray(response.body.errorsMessages)).toBe(true);
    expect(response.body.errorsMessages).toHaveLength(1);

    // Проверяем структуру первой ошибки
    expect(response.body.errorsMessages[0]).toEqual(
      expect.objectContaining({
        message: 'Title is required',
        field: 'title',
      }),
    );
  });

  it.skip('should return driver by id; GET /drivers/:id', async () => {
    // const createResponse = await request(app)
    //   .post('/drivers')
    //   .send({ ...testDriverData, name: 'Another Driver' })
    //   .expect(201);
    // const getResponse = await request(app)
    //   .get(`/drivers/${createResponse.body.id}`)
    //   .expect(200);
    // expect(getResponse.body).toEqual({
    //   ...createResponse.body,
    //   id: expect.any(Number),
    //   createdAt: expect.any(String),
    // });
  });
});
