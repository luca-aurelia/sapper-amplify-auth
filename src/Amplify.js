import Amplify, { Auth as AmplifyAuth } from 'aws-amplify'
import awsConfig from './aws-exports'

Amplify.configure(awsConfig)

export const Auth = AmplifyAuth
export default Amplify
