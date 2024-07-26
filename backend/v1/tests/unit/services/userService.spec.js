const path = require('path')
const mockFs = require('mock-fs')

const userService=require('../../../src/business/services/user')
const userRepository=require('../../../src/data/repositories/user')

jest.mock('/home/emrebaran/Desktop/software/your-diary-mood-app/backend/v1/src/data/repositories/user.js')

describe('User Service', () => {
    beforeAll(() => {
        mockFs({
            'uploads/userProfileImages': {}
        });
    });

    afterAll(() => {
        mockFs.restore();
    });

    it('should upload a profile picture successfully', async () => {
        const userID = '123';
        const file = {
            name: 'test.png',
            mv: jest.fn((dest, cb) => cb(null))
        };

        userRepository.uploadProfilePicture.mockResolvedValue();

        await userService.uploadProfilePicture(userID, file);

        expect(file.mv).toHaveBeenCalledTimes(1);
        expect(userRepository.uploadProfilePicture).toHaveBeenCalledWith(userID, `${userID}.png`);
    });

    it('should throw an error when no file is uploaded', async () => {
        const userID = '123';
        await expect(userService.uploadProfilePicture(userID, null)).rejects.toThrow('No file uploaded');
    });

    it('should throw an error when no userID is provided', async () => {
        const file = {
            name: 'test.png',
            mv: jest.fn((dest, cb) => cb(null))
        };
        await expect(userService.uploadProfilePicture(null, file)).rejects.toThrow('User ID is required');
    });
});