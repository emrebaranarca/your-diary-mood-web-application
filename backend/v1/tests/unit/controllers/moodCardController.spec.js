const request = require('supertest');
const express = require('express');
const httpStatus = require('http-status');
const moodCardController = require('../../../src/presentation/controllers/moodCard');
const moodCardService = require('../../../src/business/services/moodCard');

jest.mock('/home/emrebaran/Desktop/software/your-diary-mood-app/backend/v1/src/business/services/moodCard.js');

const app = express();
app.use(express.json());

// Mock route handlers
app.post('/mood-cards', moodCardController.createMoodCard);
app.get('/mood-cards', moodCardController.getMoodCards);
app.delete('/mood-cards/:id', moodCardController.deleteMoodCard);

describe('MoodCard Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });


    describe('GET /mood-cards', () => {
        it('should return 400 if retrieval fails', async () => {
            const userID = 'user123';

            moodCardService.findMoodCards.mockRejectedValue(new Error('Retrieval failed'));

            const response = await request(app)
                .get('/mood-cards')
                .set('Authorization', 'Bearer token');

            expect(response.status).toBe(httpStatus.BAD_REQUEST);
        });
    });

    describe('DELETE /mood-cards/:id', () => {
        it('should delete a mood card and return 200 status', async () => {
            const cardID = '1';

            moodCardService.deleteMoodCard.mockResolvedValue();

            const response = await request(app)
                .delete(`/mood-cards/${cardID}`)
                .set('Authorization', 'Bearer token');

            expect(response.status).toBe(httpStatus.OK);
            expect(response.body.message).toBe('deleting mood card');
        });

        it('should return 400 if deletion fails', async () => {
            const cardID = '1';

            moodCardService.deleteMoodCard.mockRejectedValue(new Error('Deletion failed'));

            const response = await request(app)
                .delete(`/mood-cards/${cardID}`)
                .set('Authorization', 'Bearer token');

            expect(response.status).toBe(httpStatus.BAD_REQUEST);
            expect(response.body.message).toBe('Deletion failed');
        });
    });
});
