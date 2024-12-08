import {EStatus} from "web/src/enums/invite-status.enum";

export interface IInvite {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  inviteDuration: number;
  status: EStatus;
  companyName: string;
  createdAt: Date;
  expiresIn: Date;
}
