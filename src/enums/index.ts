export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

export enum PathAdmin {
  ADMIN = "/admin",
  USER = "/user-management",
  LOCATION = "/location-data-information",
  ROOM = "/room-information",
  ROOM_RESERVATION = "/room-reservation-information",
  CREATE = "/add",
  UPDATE = "/update/",
}

export enum PathName {
  USER = "User",
  LOCATION = "Location",
  ROOM = "Room",
  ROOM_RESERVATION = "Booking",
}

export enum Request {
  GET = "GET",
  PUT = "PUT",
  POST = "POST",
  DELETE = "DELETE",
}
