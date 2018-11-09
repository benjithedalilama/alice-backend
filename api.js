import express from 'express'
import db from './db'
import bodyParser from 'body-parser'

import User from './models/User'
import Hub from './models/Hub'
import Sensor from './models/Sensor'
import SensorReading from './models/SensorReading'
import ControlCode from './models/ControlCode'
import ControlCommand from './models/ControlCommand'

import UserService from './services/UserService'
import HubService from './services/HubService'
import SensorService from './services/SensorService'

const PORT = 8080
const HOST = '0.0.0.0'

const app = express()

const base_path = '/api'

app.use(bodyParser.json())

// Create new user
app.post(base_path + '/users', async (req, res, next) => {
  try {
    const user = await UserService.create(req)
    res.send(user)
  }
  catch (err) {
    next(err)
  }
})

// Get user by id
app.get(base_path + '/users/:id', async (req, res, next) => {
  try {
    const user = await UserService.get(req)
    if (!user) return next({status: 404, message: "User not found"})
    res.send(user)
  }
  catch (err) {
    next(err)
  }
})

// Get users
app.get(base_path + '/users', async (req, res, next) => {
  try {
    const users = await UserService.getAll()
    res.send(users)
  }
  catch (err) {
    next(err)
  }
})

// Update user by id
app.put(base_path + '/users/:id', async (req, res, next) => {
  try {
    const user = await UserService.update(req)
    res.send(user)
  }
  catch (err) {
    next(err)
  }
})

// Delete user by id
app.delete(base_path + '/users/:id', async (req, res, next) => {
  try {
    await UserService.delete(req)
    res.status(204).send({})
  }
  catch (err) {
    next(err)
  }
})

// Create new hub
app.post(base_path + '/users/:userId/hubs', async (req, res, next) => {
  try {
    const hub = await HubService.create(req)
    res.send(hub)
  }
  catch (err) {
    next(err)
  }
})

// Get hubs
app.get(base_path + '/users/:userId/hubs', async (req, res, next) => {
  try {
    const hubs = await HubService.getAll(req)
    res.send(hubs)
  }
  catch (err) {
    next(err)
  }
})

// Get hub by id
app.get(base_path + '/users/:userId/hubs/:id', async (req, res, next) => {
  try {
    const hub = await HubService.get(req)
    res.send(hub)
  }
  catch (err) {
    next(err)
  }
})

// Update hub by id
app.put(base_path + '/users/:userId/hubs/:id', async (req, res, next) => {
  try {
    const hub = await HubService.update(req)
    res.send(hub)
  }
  catch (err) {
    next(err)
  }
})

// Delete hub by id
app.delete(base_path + '/users/:userId/hubs/:id', async (req, res, next) => {
  try {
    await HubService.delete(req)
    res.status(204).send({})
  }
  catch (err) {
    next(err)
  }
})

// Create new sensor
app.post(base_path + '/users/:userId/hubs/:hubId/sensors', async (req, res, next) => {
  try {
    const sensor = await SensorService.create(req)
    res.send(sensor)
  }
  catch (err) {
    next(err)
  }
})

// Get all sensors by hub
app.get(base_path + '/users/:userId/hubs/:hubId/sensors', async (req, res, next) => {
  try {
    const sensors = await SensorService.getAll(req)
    res.send(sensors)
  }
  catch (err) {
    next(err)
  }
})

// Get sensor by id
app.get(base_path + '/users/:userId/hubs/:hubId/sensors/:id', async (req, res, next) => {
  try {
    const sensor = await SensorService.get(req)
    res.send(sensor)
  }
  catch (err) {
    next(err)
  }
})

// Update sensor by id
app.put(base_path + '/users/:userId/hubs/:hubId/sensors/:id', async (req, res, next) => {
  try {
    const sensor = await SensorService.update(req)
    res.send(sensor)
  }
  catch (err) {
    next(err)
  }
})

// Delete sensor by id
app.delete(base_path + '/users/:userId/hubs/:hubId/sensors/:id', async (req, res, next) => {
  try {
    await SensorService.delete(req)
    res.status(204).send({})
  }
  catch (err) {
    next(err)
  }
})

app.use( (err, req, res, next) => {
  res.status(err.status || 500).send(err.message)
})

app.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)
