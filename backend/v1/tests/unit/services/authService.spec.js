const authService = require('../../../src/business/services/auth');
const authRepository = require('../../../src/data/repositories/auth');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const sendVerificationEmail = require('../../../src/scripts/utils/mail/sendVerificationEmail');
const { generateJWT } = require('../../../src/scripts/utils/jwt/jwt');
const nodemailer = require('nodemailer');

jest.mock('/home/emrebaran/Desktop/software/your-diary-mood-app/backend/v1/src/data/repositories/auth.js');
jest.mock('bcrypt');
jest.mock('crypto');
jest.mock('/home/emrebaran/Desktop/software/your-diary-mood-app/backend/v1/src/scripts/utils/mail/sendVerificationEmail.js');
jest.mock('/home/emrebaran/Desktop/software/your-diary-mood-app/backend/v1/src/scripts/utils/jwt/jwt.js');
jest.mock('nodemailer');


describe('Auth Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // describe('registerUser', () => {
    //     it('should register a user and send a verification email', async () => {
    //         const userData = {
    //             email: 'test@example.com',
    //             password: 'password123'
    //         };
    //         const emailToken = '1234567890abcdef';
    //         const hashedPassword = 'hashedpassword123';
    //         const mockSendMail = jest.fn().mockResolvedValue(true);

    //         crypto.randomBytes.mockImplementation((size, callback) => callback(null, Buffer.from(emailToken, 'hex')));
    //         bcrypt.genSalt.mockResolvedValue('salt');
    //         bcrypt.hash.mockResolvedValue(hashedPassword);
    //         authRepository.createUser.mockResolvedValue();

    //         // Mock nodemailer
    //         nodemailer.createTransport.mockReturnValue({
    //             sendMail: mockSendMail
    //         });

    //         await authService.registerUser(userData);

    //         expect(crypto.randomBytes).toHaveBeenCalledWith(12, expect.any(Function));
    //         expect(mockSendMail).toHaveBeenCalledWith({
    //             from: process.env.SMTP_USER,
    //             to: userData.email,
    //             subject: 'Email Verification',
    //             text: `Please verify your email by clicking on the following link: http://localhost:3000/api/v1/verify-email/${emailToken}`,
    //             html: `<p>Please verify your email by clicking on the following link: <a href="http://localhost:3000/api/v1/verify-email/${emailToken}">http://localhost:3000/api/v1/verify-email/${emailToken}</a></p>`
    //         });
    //         expect(bcrypt.genSalt).toHaveBeenCalled();
    //         expect(bcrypt.hash).toHaveBeenCalledWith(userData.password, 'salt');
    //         expect(authRepository.createUser).toHaveBeenCalledWith({ ...userData, emailToken, password: hashedPassword });
    //     });

    // });

    describe('verifyEmail', () => {
        it('should verify a user\'s email', async () => {
            const emailToken = '1234567890abcdef';
            authRepository.verifyEmail.mockResolvedValue();

            await authService.verifyEmail(emailToken);

            expect(authRepository.verifyEmail).toHaveBeenCalledWith(emailToken);
        });

        it('should throw an error if email token is null', async () => {
            await expect(authService.verifyEmail(null)).rejects.toThrow('email token is null');
        });

        it('should throw an error if email verification fails', async () => {
            const emailToken = '1234567890abcdef';
            const errorMessage = 'Verification failed';

            authRepository.verifyEmail.mockRejectedValue(new Error(errorMessage));

            await expect(authService.verifyEmail(emailToken)).rejects.toThrow(errorMessage);
        });
    });

    describe('loginUser', () => {
        it('should login a user and return a JWT token', async () => {
            const userData = {
                email: 'test@example.com',
                password: 'password123'
            };
            const user = {
                isVerified: true,
                password: 'hashedpassword123'
            };
            const token = 'jwt_token';

            authRepository.loginUser.mockResolvedValue(user);
            bcrypt.compare.mockResolvedValue(true);
            generateJWT.mockReturnValue(token);

            const result = await authService.loginUser(userData);

            expect(authRepository.loginUser).toHaveBeenCalledWith(userData);
            expect(bcrypt.compare).toHaveBeenCalledWith(userData.password, user.password);
            expect(generateJWT).toHaveBeenCalledWith(user);
            expect(result).toBe(token);
        });

        it('should throw an error if user does not exist', async () => {
            const userData = {
                email: 'test@example.com',
                password: 'password123'
            };

            authRepository.loginUser.mockResolvedValue(null);

            await expect(authService.loginUser(userData)).rejects.toThrow('User Does Not Exists');
        });

        it('should throw an error if user is not verified', async () => {
            const userData = {
                email: 'test@example.com',
                password: 'password123'
            };
            const user = {
                isVerified: false
            };

            authRepository.loginUser.mockResolvedValue(user);

            await expect(authService.loginUser(userData)).rejects.toThrow('Please Verify Your Account');
        });

        it('should throw an error if password is invalid', async () => {
            const userData = {
                email: 'test@example.com',
                password: 'password123'
            };
            const user = {
                isVerified: true,
                password: 'hashedpassword123'
            };

            authRepository.loginUser.mockResolvedValue(user);
            bcrypt.compare.mockResolvedValue(false);

            await expect(authService.loginUser(userData)).rejects.toThrow('Invalid Credentials');
        });

        it('should throw an error if login fails', async () => {
            const userData = {
                email: 'test@example.com',
                password: 'password123'
            };
            const errorMessage = 'Login failed';

            authRepository.loginUser.mockRejectedValue(new Error(errorMessage));

            await expect(authService.loginUser(userData)).rejects.toThrow(errorMessage);
        });
    });
})

