import { UserEntity } from "../users.entity";

export type IUser= Omit<UserEntity, 'hashedPassword'>;