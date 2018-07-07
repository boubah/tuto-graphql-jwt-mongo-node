import * as Service from '../services/service';

export default {
  Query: {
    hello: () => "hi",
    login: (parent, { user }) => {
      return Service.login(user.email, user.password)
    }
  },
  Mutation: {
    uploadFile: (parent, { file }) => {
      Service.fileUploadProcess(file.path);
      return true;
    },
    createUser: (parent, { user }) => {
      Service.register(user.fullName, user.email, user.password);
      return `User ${user.fullName} is saved in mongodb`;
    }
  }
};
