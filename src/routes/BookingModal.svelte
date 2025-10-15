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

<Modal bind:open={showModal} size="2xl" autoclose>
    <div class="px-6 py-4 border-b flex items-start justify-between">
        <div>
            <h4 class="text-lg font-semibold text-slate-800">
                Booking #{currentBooking?.appointment}
            </h4>
            <p class="text-sm text-slate-600 mt-1">
                {currentBooking?.appointment_type} • {currentBooking?.appointment_date}
            </p>
        </div>
    </div>

    <div class="px-6 py-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <dt class="text-xs text-slate-500">Primary Devotee</dt>
                <dd class="font-semibold text-slate-800">
                    {currentBooking?.primary_devoteee_name}
                </dd>
            </div>

            <div>
                <dt class="text-xs text-slate-500">Group Size</dt>
                <dd class="font-semibold text-slate-800">
                    {currentBooking?.group_size} Devotee(s)
                </dd>
            </div>

            <div class="sm:col-span-2">
                <dt class="text-xs text-slate-500">Notes</dt>
                <dd class="text-slate-700 mt-1">{currentBooking?.notes}</dd>
            </div>
        </div>
    </div>

    <div class="px-6 py-4 bg-slate-50 flex items-center justify-end gap-3">
        <Button color="light" on:click={closeModal}>Close</Button>
        <Button
            color="green"
            on:click={() => markExit(currentBooking?.appointment)}
        >
            Mark Exit
        </Button>
    </div>
</Modal>
