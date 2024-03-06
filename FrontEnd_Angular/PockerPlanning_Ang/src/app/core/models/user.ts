import { Project } from "./project";
import { Role } from "./role";

export class User {
    id!: number;
    firstname!: string;
    lastname!: string;
    email!: string;
    password!: string;
    picture!: string;
    role!: Role;
    projectSet!: Project[];
   // participationSet!: Participation[];
   // badge: !Badge;
  
  
  /*export enum Role {
    ADMINISTRATOR = 'ADMINISTRATOR',
    PROJECTMANAGER = 'PROJECTMANAGER',
    DEVELOPER = 'DEVELOPER'
  }*/
  
    verified!: boolean;
    active!: boolean;
}
