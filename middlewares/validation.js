const {
  celebrate, Joi, Segments,
} = require('celebrate');
const validator = require('validator');

const signup = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.empty': 'Поле name не может быть пустым',
        'any.required': 'Укажите Имя',
      }),
    email: Joi.string().required().custom((value, helper) => {
      if (!validator.isEmail(value)) {
        return helper.error('string.notEmail');
      }
      return value;
    }).messages({
      'any.required': 'Укажите Email',
      'string.notEmail': 'Неправильный формат Email',
      'string.empty': 'Поле Email не может быть пустым',
    }),
    password: Joi.string().required().messages({
      'any.required': 'Укажите пароль',
      'string.empty': 'Поле password не может быть пустым',
    }),
  }),
});

const signin = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().custom((value, helper) => {
      if (!validator.isEmail(value)) {
        return helper.error('string.notEmail');
      }
      return value;
    }).messages({
      'any.required': 'Укажите Email',
      'string.notEmail': 'Неправильный формат Email',
      'string.empty': 'Поле Email не может быть пустым',
    }),
    password: Joi.string().required().messages({
      'any.required': 'Укажите пароль',
      'string.empty': 'Поле password не может быть пустым',
    }),
  }),
});

const movie = celebrate({
  [Segments.BODY]: Joi.object().keys({
    country: Joi.string().required()
      .messages({
        'any.required': 'Укажите страну',
        'string.empty': 'Поле country не может быть пустым',
      }),
    director: Joi.string().required().messages({
      'any.required': 'Укажите режиссера',
      'string.empty': 'Поле director не может быть пустым',
    }),
    duration: Joi.number().required().messages({
      'number.base': 'Продолжительность должна быть числом',
      'any.required': 'Укажите длительность',
    }),
    year: Joi.string().required().messages({
      'any.required': 'Укажите год выпуска',
      'string.empty': 'Поле year не может быть пустым',

    }),
    description: Joi.string().required().messages({
      'any.required': 'Укажите описание фильма',
      'string.empty': 'Поле description не может быть пустым',
    }),
    image: Joi.string().required().custom((value, helper) => {
      if (!validator.isURL(value, { require_protocol: true })) {
        return helper.error('string.notURL');
      }
      return value;
    }).messages({
      'any.required': 'Укажите ссылку на постер к фильму',
      'string.notURL': 'Неправильный формат ссылки',
      'string.empty': 'Поле image не может быть пустым',
    }),
    trailerLink: Joi.string().required().custom((value, helper) => {
      if (!validator.isURL(value, { require_protocol: true })) {
        return helper.error('string.notURL');
      }
      return value;
    }).messages({
      'any.required': 'Укажите ссылку на трейлер',
      'string.notURL': 'Неправильный формат ссылки',
      'string.empty': 'Поле trailerLink не может быть пустым',
    }),
    thumbnail: Joi.string().required().custom((value, helper) => {
      if (!validator.isURL(value, { require_protocol: true })) {
        return helper.error('string.notURL');
      }
      return value;
    }).messages({
      'any.required': 'Укажите ссылку на миниатюрное изображение постера',
      'string.notURL': 'Неправильный формат ссылки',
      'string.empty': 'Поле thumbnail не может быть пустым',
    }),
    movieId: Joi.number().required().messages({
      'number.base': 'movieId должен быть числом',
      'any.required': 'Укажите movieId',
    }),
    nameRU: Joi.string().required().messages({
      'any.required': 'Укажите название фильма на русском языке',
      'string.empty': 'Поле nameRU не может быть пустым',
    }),
    nameEN: Joi.string().required().messages({
      'any.required': 'Укажите название фильма на английском языке',
      'string.empty': 'Поле nameEN не может быть пустым',
    }),
  }),
});

const movieId = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required()
      .messages({
        'string.length': 'Некорректный id',
        'string.hex': 'Некорректный id',
        'any.required': 'Некорректный id',
      }),
  }),
});

const updateInfo = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'any.required': 'Укажите имя',
        'string.min': 'Имя должно быть больше 2-х символов',
        'string.max': 'Имя не может быть больше 30 символов',
        'string.empty': 'Поле name не может быть пустым',
      }),
    email: Joi.string().required().custom((value, helper) => {
      if (!validator.isEmail(value)) {
        return helper.error('string.notEmail');
      }
      return value;
    }).messages({
      'any.required': 'Укажите Email',
      'string.notEmail': 'Неправильный формат Email',
      'string.empty': 'Поле Email не может быть пустым',
    }),
  }),
});

module.exports = {
  signup, signin, movie, updateInfo, movieId,
};
