import { HostelRequest } from "./hostel-request";

export interface hostelRequestQuery {
    hostelRequests: HostelRequest[],
    current: number,
    pages: number
}
