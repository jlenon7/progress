import path from 'path'
import express, { Handler } from 'express'

class FilesController {
  public show(): Handler {
    return express.static(path.resolve(__dirname, '..', '..', 'tmp'))
  }
}

export default FilesController