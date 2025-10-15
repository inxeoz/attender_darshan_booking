import { writable } from "svelte/store";

export interface Action {
  id: string;
  label: string;
}

export type ATTENDER_APPOINTMENT = {
  appointment: string;
  appointment_date: string;
  appointment_type: string;
  mark_exit: string;
  name: string;
  slot_end_time: string;
  slot_start_time: string;
  group_size: string;
  primary_devoteee_name: string;
};

const defaultActions: Action[] = [
  { id: "viewBookings", label: "View Bookings" },
  { id: "bookShigra", label: "Book - Shigra Darshan" },
  { id: "bookVip", label: "Book - VIP Darshan" },
  { id: "bookLocalide", label: "Book - Localide Darshan" },
  { id: "bookBhasm", label: "Book - Bhasm Arti" },
];

export const actionsStore = writable<Action[]>(defaultActions);
export const user_logged_in = writable(false);
export const user_phone_number = writable(0);
