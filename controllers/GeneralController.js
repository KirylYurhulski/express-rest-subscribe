const ApiError = require('../errors/ApiError')
const { General } = require('../models/models')
const uuid = require('uuid')
const path = require('path')

class GeneralController {
  async getAll(req, res, next) {
    const { publish } = req.query

    const condition = publish
      ? { active: publish === 'true' ? true : false }
      : null

    General.findAll({
      where: condition,
      order: [['id']],
    })
      .then((data) =>
        data ? res.status(200).json(data) : res.status(200).json([])
      )
      .catch((err) => {
        console.log(err)
        next(ApiError.badRequest('Не удалось получить данные из БД'), req, res)
      })
  }

  async getOne(req, res, next) {
    const { id } = req.params

    General.findByPk(id)
      .then((data) =>
        data ? res.status(200).json(data) : res.status(200).json([])
      )
      .catch((err) => {
        console.log(err)
        next(ApiError.badRequest('Не удалось получить данные из БД'), req, res)
      })
  }

  async create(req, res, next) {
    const {
      firstName,
      secondName,
      position,
      skills,
      projects,
      experiances,
      email,
      about,
      active,
    } = req.body

    const fileName = GeneralController.loadAvatar(req, next)

    General.create({
      firstName,
      secondName,
      position,
      skills,
      projects,
      experiances,
      email,
      about,
      avatar: fileName,
      active,
    })
      .then((data) => res.json(data))
      .catch((err) => {
        console.log(err)
        next(
          ApiError.badRequest(
            'Ошибка при создании основной записи пользователя'
          ),
          req,
          res
        )
      })
  }

  async update(req, res, next) {
    const {
      id,
      firstName,
      secondName,
      position,
      skills,
      projects,
      experiances,
      email,
      about,
      active,
    } = req.body

    const fileName = GeneralController.loadAvatar(req, next)

    General.findByPk(id)
      .then((data) => {
        data.firstName = firstName
        data.secondName = secondName
        data.position = position
        data.skills = skills
        data.projects = projects
        data.experiances = experiances
        data.email = email
        data.about = about
        data.avatar = fileName
        data.active = active

        data.save().then((data) => data.reload().then((data) => res.json(data)))
      })
      .catch((err) =>
        next(
          ApiError.badRequest(
            'Ошибка при обновлении основной записи пользователя'
          ),
          req,
          res
        )
      )
  }

  async delete(req, res, next) {
    const { id } = req.params

    General.findByPk(id)
      .then((data) => {
        data.destroy().then(() => res.json({ success: true }))
      })
      .catch((err) => {
        console.log(err)
        next(
          ApiError.badRequest(
            'Ошибка при удалении основной записи пользователя'
          ),
          req,
          res
        )
      })
  }

  static loadAvatar(req, next) {
    const { avatar } = req.files

    const fileName = uuid.v4() + '.png'
    avatar.mv(path.resolve(__dirname, '..', 'static', fileName))
    return fileName
  }
}

module.exports = new GeneralController()
