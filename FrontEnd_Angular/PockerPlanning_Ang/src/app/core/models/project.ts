import { User } from "./user";

export enum Domain { FINANCE,
    HEALTH ,
    EDUCATION,
    E_COMMERCE,
    MARKETING,
    TOURISM,
    INDUSTRY,
     ENTERTAINMENT,
     TRANSPORTATION,
     ENVIRONMENT,
     PUBLICADMINISTRATOR,
      PROFESSIONALSERVICES
}
export enum StatusProject { INPROGRESS,
    PANDING,
    COMPLETED
}
export class Project {
    id!: number;
    name!: string;
    startDate!: string;
    endDate!: string;
    nbDeveloper!: number;
    objective!: string;
    technology!: string;
    badget!: number;
    domain!: Domain; // Utilisez l'énumération Domain
    statusProject!: StatusProject; // Utilisez l'énumération StatusProject
    userSet!: User[];
  
  }