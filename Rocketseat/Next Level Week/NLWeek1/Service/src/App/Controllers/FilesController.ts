import path from 'path'
import express, { Handler } from 'express'

export default class FilesController {
  public show(): Handler {
    return express.static(path.resolve(__dirname, '..', '..', 'tmp'))
  }
}
