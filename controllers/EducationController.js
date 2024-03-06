const { Education } = require('../models/models')
const ApiError = require('../errors/ApiError')

class EducationController {
  async getAll(req, res, next) {
    Education.findAll({
      order: [['begdat', 'DESC']],
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

    Education.findByPk(id)
      .then((data) =>
        data ? res.status(200).json(data) : res.status(200).json([])
      )
      .catch((err) => {
        console.log(err)
        next(ApiError.badRequest('Не удалось получить данные из БД'), req, res)
      })
  }

  async create(req, res, next) {
    const { begdat, enddat, company, position, description } = req.body

    Education.create({
      begdat,
      enddat,
      company,
      position,
      description,
    })
      .then((data) => res.json(data))
      .catch((err) => {
        console.log(err)
        next(
          ApiError.badRequest('Ошибка при создании данных об образовании'),
          req,
          res
        )
      })
  }

  async update(req, res, next) {
    const { id, begdat, enddat, company, position, description } = req.body

    Education.findByPk(id)
      .then((data) => {
        data.begdat = begdat
        data.enddat = enddat
        data.company = company
        data.position = position
        data.description = description

        data.save().then((data) => data.reload().then((data) => res.json(data)))
      })
      .catch((err) => {
        console.log(err)
        next(
          ApiError.badRequest('Ошибка при обновлении данных об образовании'),
          req,
          res
        )
      })
  }

  async delete(req, res, next) {
    const { id } = req.params

    Education.findByPk(id)
      .then((data) => {
        data.destroy().then(() => res.json({ success: true }))
      })
      .catch((err) => {
        console.log(err)
        next(
          ApiError.badRequest('Ошибка при удалении данных об образовании'),
          req,
          res
        )
      })
  }
}

module.exports = new EducationController()
