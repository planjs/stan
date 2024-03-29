[npm]: https://img.shields.io/npm/v/oss-upload-tool
[npm-url]: https://www.npmjs.com/package/oss-upload-tool
[download]: http://img.shields.io/npm/dm/oss-upload-tool.svg?style=flat
[test]: https://github.com/planjs/stan/actions/workflows/test.yml/badge.svg
[size]: https://packagephobia.now.sh/badge?p=oss-upload-tool
[size-url]: https://packagephobia.now.sh/result?p=oss-upload-tool

[![npm][npm]][npm-url]
[![size][size]][size-url]
[![test][test]][test]
[![NPM downloads][download]][npm-url]

# `oss-upload-tool`

> Integrated oss upload   
> Complete integration [COS-OSS](https://cloud.tencent.com/document/product/436/6474) / [ALI-OSS](https://help.aliyun.com/document_detail/32068.htm?spm=a2c4g.11186623.0.0.3e8ff2eeVjYbKz#concept-32068-zh) / [S3-OSS](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/index.html), Welcome to improve together.

## Install

Using npm:

```console
npm install oss-upload-tool --save-dev
```

Using yarn:

```console
yarn add oss-upload-tool -D
```


## Usage

The tool will prioritize the identification of environment variables for easy invocation.   
Before use, please register environment variables in advance to facilitate use. In CI/Action, you can set environment variables to prevent exposure of OSS parameters.   
```shell
# General parameters
npm config --global set oss_upload_tool_secret_id "your secret_id"
npm config --global get oss_upload_tool_secret_key "your secret_key"
npm config --global get oss_upload_tool_bucket "your bucket"
npm config --global get oss_upload_tool_region "your region"
```
There are the following environment variables.   
It is recommended to set the environment variable corresponding to oss first, then you do not need to specify the type of oss service provider.
```shell
# General parameters
npm config get oss_upload_tool_secret_id
npm config get oss_upload_tool_secret_key
npm config get oss_upload_tool_bucket
npm config get oss_upload_tool_region
# cos-oss
npm config get oss_upload_tool_cos_secret_id
npm config get oss_upload_tool_cos_secret_key
npm config get oss_upload_tool_cos_bucket
npm config get oss_upload_tool_cos_region
# ali-oss
npm config get oss_upload_tool_alioss_secret_id
npm config get oss_upload_tool_alioss_secret_key
npm config get oss_upload_tool_alioss_bucket
npm config get oss_upload_tool_alioss_region
npm config get oss_upload_tool_alioss_endpoint
# s3-oss
npm config get oss_upload_tool_s3_secret_id
npm config get oss_upload_tool_s3_secret_key
npm config get oss_upload_tool_s3_bucket
npm config get oss_upload_tool_s3_region
```
Get parameter priority `parameters` > `process.env.[key]` > `npm config get [key]`.

### Usage in CLI

```shell
oss-upload-tool -t "./lib/**" -d "./__xxx","__xxx1/" --bucket "***" --region "***" --oss "S3"
```

### Usage in Node
```ts
const ossUpload = require('oss-upload-tool');

// upload cos-oss
await ossUpload({
  targets: {
    src: './lib/**/*',
    dest: ['__xxx/', '__xxx1/'],
  },
  uploadParams: {
    Bucket: '***',
    Region: '***',
  },
  COSOptions: {
    SecretId: '***',
    SecretKey: '***',
  },
});

// upload ali-oss
await ossUpload({
  targets: {
    src: './lib/**/*',
    dest: ['__xxx/', '__xxx1/'],
  },
  ALIOptions: {
    accessKeyId: '***',
    accessKeySecret: '***',
    bucket: '***',
    region: '***',
    endpoint: '***',
  },
});

// upload s3-oss
ossUpload({
  targets: {
    src: './lib/**/*',
    dest: ['__xxx/', '__xxx1/'],
  },
  uploadParams: {
    Bucket: '***',
  },
  S3Options: {
    credentials: {
      accessKeyId: '***',
      secretAccessKey: '***',
    },
    region: '***',
  },
})
```

## Options

#### targets

Upload configuration

* Type: `array | object`
  * src: `string | string[]` [globby](https://www.npmjs.com/package/globby) patterns.
  * dest: `string | string[]` Upload path, If it is an array, it will upload to multiple directories.
  * flatten: `bool` Delete the directory structure of uploaded files.
  * rename: `string | (path: string, ext: string) => string` Uploaded file name.
  * transform: `(Buffer) => Buffer | string` Upload file content.

#### type
* Type: `COS | ALI | S3` default `COS`

### uploadParams
* COS `import('cos-nodejs-sdk-v5').SliceUploadFileParams`
* ALI `import('ali-oss').PutObjectOptions`
* S3 `import('aws-sdk').S3.Types.PutObjectRequest`

#### COSOptions
* Type: `object` https://github.com/tencentyun/cos-nodejs-sdk-v5

#### ALIOptions
* Type: `object` https://github.com/ali-sdk/ali-oss#node-usage 

#### S3Options
* Type: `object` https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/index.html 

#### parallelLimit
* Type: `number` default `5`   
Number of parallel uploads.

#### origin
* Type: `string`   
The current CDN externally accesses the domain name, which needs to have an agreement.   
> `existCheck` check, if the default cdn domain name cannot be accessed, use the open access cdn domain name to check   

#### timeout
* Type: `number` default `1000 * 60 * 30`     
Single file upload timeout

#### existCheck
* Type: `boolean | patterns` default `false`     
Specify the file. If the file exists, skip the upload. 
The judgment is to use `etag` first. 
If there is no `etag`, as long as the request returns 200, it will be skipped.   
By default, the official domain name of oss is used to access. If it cannot be accessed, please specify origin to set a custom domain name.   

#### maxAttempts
* Type: `number` default `0`     
Maximum number of failed retries.   

#### cwd
* Type: `string` default `process.cwd()`
