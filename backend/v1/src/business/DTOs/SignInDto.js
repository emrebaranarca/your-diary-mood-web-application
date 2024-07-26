const Joi = require('joi');

class SignInDTO {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    static schema() {
        return Joi.object({
            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
                .required(),
            password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
                .min(8)
                .required(),
        });
    }

    static validate(data) {
        const schema = SignInDTO.schema();
        return schema.validate(data, { abortEarly: false });
    }
}

module.exports = SignInDTO;
