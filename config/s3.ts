import Env from '@secjs/env/build'

export default {
  region: Env('AWS_REGION', ''),
  endpoint: Env('AWS_ENDPOINT', ''),
  Bucket: Env('AWS_PUBLIC_BUCKET_NAME', 'do'),
  accessKeyId: Env('AWS_ACCESS_KEY_ID', '12345'),
  secretAccessKey: Env('AWS_SECRET_ACCESS_KEY', '12345'),
}
