const COMMON =
  "/api/method/mahakaal.darshan_booking.doctype.darshan_attender_profile.darshan_attender_profile.";

export async function get_self_profile() {
  try {
    const res = await fetch(COMMON + "get_self_profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
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
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
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
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
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

export async function get_appointment_stats() {
  try {
    const res = await fetch(COMMON + "get_appointment_stats", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    return data;
  } catch (err: any) {
    console.error(err);

    return null;
  }
}
