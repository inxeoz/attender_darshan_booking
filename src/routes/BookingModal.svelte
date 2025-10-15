<script lang="ts">
    import type { ATTENDER_APPOINTMENT } from "@src/store.js";
    import { Modal, Button } from "flowbite-svelte";
    import { createEventDispatcher } from "svelte";

    export let showModal = false;
    export let currentBooking: ATTENDER_APPOINTMENT;

    const dispatch = createEventDispatcher();

    const closeModal = () => {
        dispatch("close");
    };

    const markExit = (id) => {
        dispatch("markExit", id);
    };
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

    <!-- Footer -->
    <div
        class="px-4 sm:px-6 py-4 bg-slate-50 flex flex-col sm:flex-row sm:justify-end gap-2 sm:gap-3"
    >
        <Button color="light" on:click={closeModal} class="w-full sm:w-auto"
            >Close</Button
        >
        <Button
            color="green"
            on:click={() => markExit(currentBooking?.appointment)}
            class="w-full sm:w-auto"
        >
            Mark Exit
        </Button>
    </div>
</Modal>
