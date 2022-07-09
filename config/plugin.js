module.exports = ({ env }) => {
    if(env('NODE_ENV') === 'production') {
        return {
            upload: {
                provider: 'aws-s3',
                providerOptions: {
                    accessKeyId: env('AWS_ACCESS_KEY_ID'),
                    secretAccessKey: env('AWS_SECRET_ACCESS_KEY'),
                    region: env('AWS_REGION'),
                    bucket: env('AWS_BUCKET'),
                    params: {
                        Bucket: env('AWS_BUCKET')
                    }
                }
            }
        }
    }

    return {

    }
}