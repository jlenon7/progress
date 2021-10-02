import { memoryStorage } from 'multer'
import { BadRequestException } from '@nestjs/common'

// diskStorage({
//   destination: './tmp',
//   filename: function(request, file, callback) {
//     const customFileName = `type-(${
//       file.fieldname
//     })-${Date.now()}-${new Token().generate()}${path.extname(
//       file.originalname,
//     )}`

//     callback(null, customFileName)
//   },
// }

export default {
  /*
  |--------------------------------------------------------------------------
  | File Storage options
  |--------------------------------------------------------------------------
  |
  | File destination and filename of upload.
  |
  */

  storage: memoryStorage(),

  /*
  |--------------------------------------------------------------------------
  | File filter
  |--------------------------------------------------------------------------
  |
  | Filter the extensions and name of the file using a callback function.
  |
  */
  fileFilter: function(request, file, callback) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|pdf)$/)) {
      callback(
        new BadRequestException(
          'Only jpg,jpeg,png,gif,pdf are alowed to upload',
        ),
        false,
      )
    }

    callback(null, true)
  },
}
