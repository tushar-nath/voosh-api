import mongoose, { ConnectOptions } from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const uri = process.env.MONGODB_URI as string
const options: ConnectOptions = {}

let client
let clientPromise: Promise<typeof mongoose>

declare global {
  /* eslint-disable no-var */
  var _mongoClientPromise: Promise<typeof mongoose>
}

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env')
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = mongoose
      .connect(uri, {
        ...options,
        serverSelectionTimeoutMS: 5000,
      })
      .then(() => mongoose)
    global._mongoClientPromise = client
  }
  clientPromise = global._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = mongoose
    .connect(uri, {
      ...options,
      serverSelectionTimeoutMS: 5000,
    })
    .then(() => mongoose)
  clientPromise = client
}

// Export a module-scoped Mongoose connection promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise
