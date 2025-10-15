<script lang="ts">
    import { onMount } from "svelte";
    import type { ATTENDER_APPOINTMENT } from "@src/store.js";
    import BookingModal from "@src/routes/BookingModal.svelte";
    import {
        get_attender_appointments_list,
        get_appointment_stats,
    } from "@src/helper_attender.js";

    let marked_exit_schedules = 0;
    let total_schedules = 0;

    let user = { name: "Suresh Kumar", id: 101 };
    let stats = { assigned: 0, exit: 0, attended: 0 };
    let devotees: ATTENDER_APPOINTMENT[] = [];

    let showModal = false;
    let currentBooking: ATTENDER_APPOINTMENT;

    function openModal(booking: ATTENDER_APPOINTMENT) {
        currentBooking = booking;

        showModal = true;
    }

    function closeModal() {
        showModal = false;
    }

    function handleMarkExit(id: string) {
        console.log("Exit marked for booking", id);
        stats.exit += 1;
        stats.assigned = Math.max(0, stats.assigned - 1);
        devotees = devotees.filter((d) => d.appointment !== id);
        closeModal();
    }

    const todayLabel = new Date().toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    onMount(async () => {
        const json_data = await get_attender_appointments_list(null);
        const stats_json_data = await get_appointment_stats();

        if (json_data?.message) {
            devotees = json_data.message;
            stats.assigned = devotees.length;
        }

        if (stats_json_data?.message) {
            total_schedules = stats_json_data.message.total_schedules;
            marked_exit_schedules =
                stats_json_data.message.marked_exit_schedules;
        }
    });
</script>

<div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl mx-auto">
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
            <header class="px-8 py-6 border-b">
                <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-800">
                    Darshan Attender Console
                </h1>
                <p class="mt-2 text-sm text-slate-600">
                    Welcome back,
                    <span class="text-blue-600 font-semibold">
                        {user.name} (ID: {user.id})
                    </span>.
                </p>
            </header>

            <main class="bg-amber-50 p-8">
                <h2 class="text-lg font-semibold text-slate-800 mb-6">
                    My Duties - {todayLabel}
                </h2>

                <!-- Stats -->
                <div class="grid gap-4 grid-cols-1 sm:grid-cols-3 mb-8">
                    <div class="relative bg-white rounded-xl p-5 shadow-md">
                        <div class="text-sm text-slate-500">
                            Assigned Today (Active)
                        </div>
                        <div class="mt-3 flex items-center justify-between">
                            <div class="text-3xl font-extrabold text-blue-600">
                                {total_schedules - marked_exit_schedules}
                            </div>
                        </div>
                    </div>

                    <div class="relative bg-white rounded-xl p-5 shadow-md">
                        <div class="text-sm text-slate-500">Exit Today</div>
                        <div class="mt-3 flex items-center justify-between">
                            <div class="text-3xl font-extrabold text-green-600">
                                {marked_exit_schedules}
                            </div>
                        </div>
                    </div>

                    <div class="relative bg-white rounded-xl p-5 shadow-md">
                        <div class="text-sm text-slate-500">
                            Total Devotees Attended
                        </div>
                        <div class="mt-3 flex items-center justify-between">
                            <div class="text-3xl font-extrabold text-slate-800">
                                {total_schedules}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Devotees -->
                <section>
                    <h3 class="text-slate-800 font-semibold mb-3">
                        Active Assigned Devotees
                    </h3>

                    <div class="bg-white rounded-lg shadow overflow-hidden">
                        <div
                            class="hidden md:grid grid-cols-6 gap-0 bg-slate-100 text-slate-700 text-sm font-semibold px-4 py-3 border-b"
                        >
                            <div>Booking ID</div>
                            <div>Darshan Type</div>
                            <div class="col-span-2">Primary Devotee</div>
                            <div>Date</div>
                            <div>Group Size</div>
                        </div>

                        <div class="divide-y">
                            {#if devotees.length === 0}
                                <div
                                    class="px-6 py-8 text-center text-slate-500"
                                >
                                    No assigned devotees for today.
                                </div>
                            {/if}

                            {#each devotees as d}
                                <div
                                    class="grid grid-cols-1 md:grid-cols-6 items-center gap-3 px-4 py-4 md:px-6"
                                >
                                    <div class="text-blue-600 font-semibold">
                                        {d.appointment}
                                    </div>
                                    <div>{d.appointment_type}</div>
                                    <div class="font-semibold">
                                        {d.primary_devoteee_name}
                                    </div>
                                    <div>{d.appointment_date}</div>
                                    <div>{d.group_size} Devotee(s)</div>
                                    <div class="flex justify-end">
                                        <button
                                            class="px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 shadow-sm text-sm font-medium"
                                            on:click={() => openModal(d)}
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            {/each}
                        </div>
                    </div>

                    <div class="mt-6">
                        <button
                            class="px-4 py-2 rounded-lg bg-slate-400 text-white hover:bg-slate-500 shadow"
                        >
                            Logout
                        </button>
                    </div>
                </section>
            </main>
        </div>
    </div>
</div>

{#if showModal}<BookingModal
        bind:showModal
        on:markExit={(e) => handleMarkExit(e.detail)}
        on:close={closeModal}
        {currentBooking}
        appointmentId={currentBooking.appointment}
    />
{/if}
