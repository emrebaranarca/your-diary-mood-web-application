const moodCardService = require('../../../src/business/services/moodCard');
const moodCardRepository = require('../../../src/data/repositories/moodCard');
const GetMoodCardDto = require('../../../src/business/DTOs/GetMoodCardDto');

jest.mock('../../../src/data/repositories/moodCard');

describe('MoodCard Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('createMoodCard', () => {
        it('should create a new mood card', async () => {
            const moodCardData = { feel: 'happy', note: 'Great day!' };
            const userID = 'user123';
            const createdMoodCard = { id: '1', ...moodCardData };

            moodCardRepository.createMoodCard.mockResolvedValue(createdMoodCard);

            const result = await moodCardService.createMoodCard(moodCardData, userID);

            expect(moodCardRepository.createMoodCard).toHaveBeenCalledWith(moodCardData, userID);
            expect(result).toEqual(createdMoodCard);
        });

        it('should throw an error if creation fails', async () => {
            const moodCardData = { feel: 'happy', note: 'Great day!' };
            const userID = 'user123';

            moodCardRepository.createMoodCard.mockRejectedValue(new Error('Creation failed'));

            await expect(moodCardService.createMoodCard(moodCardData, userID)).rejects.toThrow('Creation failed');
        });
    });

    describe('findMoodCards', () => {
        it('should return an array of mood cards', async () => {
            const userID = 'user123';
            const moodCards = [
                { feel: 'happy', note: 'Great day!', _id: '1' },
                { feel: 'sad', note: 'Bad day', _id: '2' }
            ];
            const expectedDto = moodCards.map(card => new GetMoodCardDto(card.feel, card.note, card._id));

            moodCardRepository.readMoodCards.mockResolvedValue(moodCards);

            const result = await moodCardService.findMoodCards(userID);

            expect(moodCardRepository.readMoodCards).toHaveBeenCalledWith(userID);
            expect(result).toEqual(expectedDto);
        });

        it('should throw an error if retrieval fails', async () => {
            const userID = 'user123';

            moodCardRepository.readMoodCards.mockRejectedValue(new Error('Retrieval failed'));

            await expect(moodCardService.findMoodCards(userID)).rejects.toThrow('Retrieval failed');
        });
    });

    describe('deleteMoodCard', () => {
        it('should delete a mood card by id', async () => {
            const id = '1';

            moodCardRepository.deleteMoodCard.mockResolvedValue();

            await moodCardService.deleteMoodCard(id);

            expect(moodCardRepository.deleteMoodCard).toHaveBeenCalledWith(id);
        });

        it('should throw an error if deletion fails', async () => {
            const id = '1';

            moodCardRepository.deleteMoodCard.mockRejectedValue(new Error('Deletion failed'));

            await expect(moodCardService.deleteMoodCard(id)).rejects.toThrow('Deletion failed');
        });
    });
});
