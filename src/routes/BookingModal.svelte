<script lang="ts">
    import type { ATTENDER_APPOINTMENT } from "@src/store.js";
    import { Modal, Button } from "flowbite-svelte";
    import { createEventDispatcher, onMount } from "svelte";

    import {
        get_attender_appointment,
        get_attender_appointment_companion_list,
        mark_exit,
    } from "@src/helper_attender.js";
    import { json } from "@sveltejs/kit";

    export let appointmentId: string;

    export let showModal = false;
    export let currentBooking: ATTENDER_APPOINTMENT;
    let companionList = []; // To hold companions list

    async function fetchCompanionList() {
        const json_data =
            await get_attender_appointment_companion_list(appointmentId);
        if (json_data.message) {
            companionList = json_data.message; // Assuming message is an array of companions
        }
    }

    const dispatch = createEventDispatcher();

    const closeModal = () => {
        dispatch("close");
    };

    onMount(async () => {
        console.log(currentBooking);
        await fetchCompanionList();
        // window.addEventListener("keydown", onkeydown);
    });
</script>

<Modal bind:open={showModal} size="xl" autoclose>
    <!-- Header -->
    <div
        class="px-4 sm:px-6 py-4 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
    >
        <div>
            <h4
                class="text-base sm:text-lg font-semibold text-slate-800 break-all"
            >
                Booking #{currentBooking?.appointment}
            </h4>
            <p class="text-sm text-slate-600 mt-1">
                {currentBooking?.appointment_type} • {currentBooking?.appointment_date}
            </p>
        </div>
    </div>

    <!-- Modal Body -->
    <div class="px-4 sm:px-6 py-5">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
                <dt class="text-xs text-slate-500 uppercase tracking-wide">
                    Primary Devotee
                </dt>
                <dd class="font-semibold text-slate-800 truncate">
                    {currentBooking?.primary_devoteee_name}
                </dd>
            </div>

            <div>
                <dt class="text-xs text-slate-500 uppercase tracking-wide">
                    Group Size
                </dt>
                <dd class="font-semibold text-slate-800">
                    {currentBooking?.group_size} Devotee(s)
                </dd>
            </div>

            <div class="sm:col-span-2">
                <dt class="text-xs text-slate-500 uppercase tracking-wide">
                    Mark Exit
                </dt>
                <dd class="text-slate-700 mt-1 break-words">
                    {currentBooking?.mark_exit}
                </dd>
            </div>

            <div>
                <dt class="text-xs text-slate-500 uppercase tracking-wide">
                    Start Time
                </dt>
                <dd class="text-slate-700 mt-1">
                    {currentBooking?.slot_start_time}
                </dd>
            </div>

            <div>
                <dt class="text-xs text-slate-500 uppercase tracking-wide">
                    End Time
                </dt>
                <dd class="text-slate-700 mt-1">
                    {currentBooking?.slot_end_time}
                </dd>
            </div>

            <div class="sm:col-span-2">
                <dt class="text-xs text-slate-500 uppercase tracking-wide">
                    Notes
                </dt>
                <dd class="text-slate-700 mt-1 break-words">
                    {currentBooking?.notes}
                </dd>
            </div>
        </div>
    </div>

    <div class="sm:col-span-2">
        <dt class="text-xs text-slate-500 uppercase tracking-wide mb-2">
            Companions
        </dt>
        <dd class="text-slate-700 mt-1">
            {#if companionList.length > 0}
                <div class="grid gap-4 grid-cols-1 md:grid-cols-2">
                    {#each companionList as companion}
                        <div
                            class="border rounded-lg p-4 flex items-center gap-4 bg-slate-50 shadow-sm hover:shadow-md transition-shadow duration-200"
                        >
                            <!-- Badge for name -->
                            <div
                                class="bg-blue-100 text-blue-800 text-xs font-semibold rounded px-2 py-1"
                            >
                                {companion.companion_name}
                            </div>
                            <!-- Details -->
                            <div class="flex-1 space-y-1 text-sm">
                                <div class="flex items-center space-x-2">
                                    <span class="font-semibold">Gender:</span>
                                    <span class="badge"
                                        >{companion.companion_gender}</span
                                    >
                                </div>
                                <div class="flex items-center space-x-2">
                                    <span class="font-semibold">Age:</span>
                                    <span
                                        >{companion.companion_age ||
                                            "N/A"}</span
                                    >
                                </div>
                                {#if companion.companion_phone}
                                    <div class="flex items-center space-x-2">
                                        <span class="font-semibold">Phone:</span
                                        >
                                        <span>{companion.companion_phone}</span>
                                    </div>
                                {/if}
                            </div>
                        </div>
                    {/each}
                </div>
            {:else}
                <p class="text-sm text-slate-500 italic">
                    No companions found.
                </p>
            {/if}
        </dd>
    </div>

    <!-- Footer -->
    <div
        class="px-4 sm:px-6 py-4 bg-slate-50 flex flex-col sm:flex-row sm:justify-end gap-2 sm:gap-3"
    >
        <Button color="light" on:click={closeModal} class="w-full sm:w-auto"
            >Close</Button
        >
        <Button
            color="green"
            on:click={async () => await mark_exit(currentBooking?.appointment)}
            class="w-full sm:w-auto"
        >
            Mark Exit
        </Button>
    </div>
</Modal>
