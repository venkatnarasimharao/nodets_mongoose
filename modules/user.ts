import { model, Schema, Model } from 'mongoose';

import IUser from '../interfaces/user';

const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    // socialMediaHandler: { type: Map, of: String}  -->  socialMediaHandles: { github: 'vkarpov15', twitter: '@code_barbarian' }
  },
  {
    timestamps: true // auto - creates (updated_at and created_at in mongoos)
  });

const User: Model<IUser> = model('User', UserSchema);

export default User