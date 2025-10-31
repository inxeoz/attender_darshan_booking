import { API_BASE, isProd } from '$lib/env.js';
import { get } from 'svelte/store';
import { auth_token } from './store.js';

console.log(`Running in ${isProd ? 'production' : 'development'} mode with API_BASE=${API_BASE}`);
                         // use relative path in dev (Vite proxy)

const COMMON =
  `${API_BASE}/api/method/mahakaal.darshan_booking.doctype.darshan_attender_profile.darshan_attender_profile.`;

export async function get_self_profile() {
  try {
    const res = await fetch(COMMON + "get_self_profile", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
        "Authorization" : get(auth_token)
      },

    });

    const data = await res.json();

    return data?.message?.profile;
  } catch (err) {
    console.error("Error fetching profile details:", err);

    return null;
  }
}

export async function update_profile(info: {}) {
  try {
    const res = await fetch(COMMON + "update_profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : get(auth_token)
      },
      body: JSON.stringify({
        info: info,
      }),
    });

    const data = await res.json();
    return data;
  } catch (err: any) {
    console.error(err);

    return null;
  }
}

export async function create_attender(phone: number) {
  try {
    const res = await fetch(COMMON + "create_attender", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
        "Authorization" : get(auth_token)
      },
      body: JSON.stringify({
        phone: phone,
      }),
    });

    const data = await res.json();
    return data;
  } catch (err: any) {
    console.error(err);

    return null;
  }
}

export async function login_request_attender(phone: number) {
  try {
    const res = await fetch(COMMON + "login_request", {
      method: "POST",

      headers: {
         "Content-Type": "application/json",
        "Authorization" : get(auth_token)
      },
      body: JSON.stringify({
        phone: phone,
      }),
    });

    const data = await res.json();
    return data;
  } catch (err: any) {
    console.error(err);

    return null;
  }
}

export async function get_attender_appointments_list(
  appointment_date: string | null,
) {
  try {
    const res = await fetch(COMMON + "get_attender_appointments_list", {
      method: "POST",

      headers: {
         "Content-Type": "application/json",
        "Authorization" : get(auth_token)
      },
      body: JSON.stringify({
        appointment_date: appointment_date,
      }),
    });

    const data = await res.json();
    return data;
  } catch (err: any) {
    console.error(err);

    return null;
  }
}

export async function get_attender_appointment(appointment_id: string) {
  try {
    const res = await fetch(COMMON + "get_attender_appointment", {
      method: "POST",

      headers: {
         "Content-Type": "application/json",
        "Authorization" : get(auth_token)
      },
      body: JSON.stringify({
        appointment_id: appointment_id,
      }),
    });

    const data = await res.json();
    return data;
  } catch (err: any) {
    console.error(err);

    return null;
  }
}

export async function get_appointment_stats() {
  try {
    const res = await fetch(COMMON + "get_appointment_stats", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "Authorization" : get(auth_token)
      },
    });

    const data = await res.json();
    return data;
  } catch (err: any) {
    console.error(err);

    return null;
  }
}

export async function mark_exit(appointment_id: string) {
  try {
    const res = await fetch(COMMON + "mark_exit", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "Authorization" : get(auth_token)
      },

      body: JSON.stringify({
        appointment_id: appointment_id,
      }),
    });

    const data = await res.json();
    return data;
  } catch (err: any) {
    console.error(err);

    return null;
  }
}

export async function get_attender_appointment_companion_list(
  appointment_id: string,
) {
  try {
    const res = await fetch(
      COMMON + "get_attender_appointment_companion_list",
      {
        method: "POST",
  
        headers: {
        "Content-Type": "application/json",
        "Authorization" : get(auth_token)
        },

        body: JSON.stringify({
          appointment_id: appointment_id,
        }),
      },
    );

    const data = await res.json();
    return data;
  } catch (err: any) {
    console.error(err);

    return null;
  }
}
